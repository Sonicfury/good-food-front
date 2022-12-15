<script lang="ts">
  import RestaurantCard from './../components/RestaurantCard.svelte'
  import Search from '../components/Search.svelte'
  import { onMount } from 'svelte'
  import Alert from '../../lib/components'

  let searchTerm = ''
  let restaurants = ''
  let messageError = 'test' as string
  let isMessageError = false as boolean
  let isSucess = false as boolean

  onMount(async () => {
    await getRestaurant()
  })

  async function getRestaurant() {
    const res = await fetch(`api/restaurant`)
    let response = await res.json()
    if (response.data) {
      restaurants = response.data
    } else {
      isMessageError = true
      messageError = response.message
      isSucess = false
    }
  }

  const searchBooks = () => {
    console.log(searchTerm, 'searchTerm')
  }
</script>

<Search bind:searchTerm="{searchTerm}" on:input="{searchBooks}" />
<Alert isSucess="{isSucess}" isError="{isMessageError}" message="{messageError}" />

{#each restaurants as restaurant}
  <RestaurantCard restaurantsList="{restaurant}" />
{/each}

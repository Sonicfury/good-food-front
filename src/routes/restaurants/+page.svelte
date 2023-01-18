<script lang="ts">
  import RestaurantCard from '../../lib/components/RestaurantCard.svelte'
  import Search from '../../lib/components/Search.svelte'
  import { onMount } from 'svelte'
  import Alert from '../../lib/components/Alert.svelte'
  import LeafletMap from '../../lib/components/LeafletMap.svelte'
  let searchTerm = ''
  let restaurants = null
  let messageError = 'test' as string
  let isMessageError = false as boolean
  let isSucess = false as boolean
  let adresseList = null as Array<any> | null
  let dropdownOpen = true as boolean
  let fetchRestaurantUrl
  onMount(async () => {
    await getRestaurant()
  })

  async function getRestaurant(coordinates: Array<string>) {
    if (coordinates) {
      fetchRestaurantUrl = `api/restaurant?coords=${coordinates}`
    } else {
      fetchRestaurantUrl = `api/restaurant`
    }

    const res = await fetch(fetchRestaurantUrl)
    let response = await res.json()
    if (response.data) {
      restaurants = response.data
    } else {
      isMessageError = true
      messageError = response.message
      isSucess = false
    }
  }

  async function searchBooks() {
    dropdownOpen = true
    const response: Response = await fetch('api/adresse', {
      method: 'POST',
      body: JSON.stringify(searchTerm),
    })

    const adresse = await response.json()
    adresseList = adresse.data
  }

  async function selectAdresse(value: Array<any>) {
    await getRestaurant(value.geometry.coordinates)
    searchTerm = value.properties.label
    dropdownOpen = false
  }
</script>

<div class="dropdown flex justify-center dropdown-open">
  <Search bind:searchTerm="{searchTerm}" on:input="{searchBooks}" />
  {#if adresseList && dropdownOpen}
    <ul class="dropdown-content mt-14 menu p-2 shadow bg-base-100 rounded-box w-68">
      {#each adresseList as adresse}
        <li on:click="{() => selectAdresse(adresse)}"><a>{adresse.properties.label}</a></li>
      {/each}
    </ul>
  {/if}
</div>
{#if restaurants}
  {#each restaurants as restaurant}
    <RestaurantCard bind:restaurantItem="{restaurant}" />
  {/each}
{/if}
<!-- <LeafletMap /> -->

<script lang="ts">
  import RestaurantCard from '$lib/components/RestaurantCard.svelte'
  import Search from '$lib/components/Search.svelte'
  import { onMount } from 'svelte'
  let searchTerm = ''
  let restaurants = null
  let messageError = 'test' as string
  let isMessageError = false as boolean
  let isSucess = false as boolean
  let adresseList = null as Array<any> | null
  let dropdownOpen = true as boolean
  let fetchRestaurantUrl

  onMount(async () => {
   
    const successCallback = async (position) => {
      const coords = [position.coords.latitude, position.coords.longitude]
      await getRestaurant(coords)
    }

    const errorCallback = async (error) => {
      // await getRestaurant()
    }

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback)
  })

  async function getRestaurant(coordinates: Array<string>) {
    if (coordinates) {
      fetchRestaurantUrl = `/api/restaurant?coords=${coordinates}`
    } else {
      fetchRestaurantUrl = `/api/restaurant`
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
    const response: Response = await fetch('/api/coordinate', {
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

<div class="flex justify-center z-index">
  <img class="m-4 object-contain  w-24" alt="good-food-logo" src="/images/Good-Food-logo.png" />
</div>
<div class="dropdown flex justify-center dropdown-open z-index mb-5">
  <Search bind:searchTerm="{searchTerm}" placeholder="{'Adresse ...'}" on:input="{searchBooks}" />
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
{:else}
          <div class="flex w-full mt-24 justify-center">
              <span class="loading loading-infinity loading-lg text-primary"></span>
          </div>
{/if}

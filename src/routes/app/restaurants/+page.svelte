<script lang="ts">
  import RestaurantCard from '$lib/components/RestaurantCard.svelte'
  import Search from '$lib/components/Search.svelte'
  import { onMount } from 'svelte'
  import Alert from '$lib/components/Alert.svelte'
  import LeafletMap from '$lib/components/LeafletMap.svelte'
  let searchTerm = ''
  let restaurants = null
  let messageError = 'test' as string
  let isMessageError = false as boolean
  let isSucess = false as boolean
  let adresseList = null as Array<any> | null
  let dropdownOpen = true as boolean
  let fetchRestaurantUrl
  import { cart } from '$lib/stores/cart'
  import { get } from 'svelte/store'
  import type { Cart } from '$lib/models/cart'

  let cartStore: Cart

  onMount(() => {
    cartStore = get(cart)
  })

  onMount(async () => {
    const successCallback = async (position) => {
      const coords = [position.coords.latitude, position.coords.longitude]
      await getRestaurant(coords)
    }

    const errorCallback = async (error) => {
      await getRestaurant()
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
    const response: Response = await fetch('/api/adresse', {
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
  <LeafletMap restaurantsList="{restaurants}" />
{/if}

<style>
  .z-index {
    z-index: 9999;
  }
</style>

<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import type { Restaurant } from '$lib/models/restaurant'
  import L from 'leaflet'

  let mapElement
  let map
  let selectedRestaurant: Restaurant
  let displayModal = false
  import { cart } from '$lib/stores/cart'
  import { get } from 'svelte/store'
  import type { Cart, CartItem } from '$lib/models/cart'
  import { page } from '$app/stores'
  import { goto } from '$app/navigation'

  async function choseRestaurant(isTakeaway: boolean) {
    cart.update(c => ({
        ...c, 
        restaurentId: `${selectedRestaurant.id}`, 
        restaurantName: selectedRestaurant.name,
        items: [] as CartItem[]
    }))

    await goto(`carte?isTakeaway=${isTakeaway}`)
  }

  export let restaurantsList: Array<Restaurant>

  onMount(async () => {
    map = L.map(mapElement).setView([50.63167668045036, 3.0520353211535323], 5)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map)

    restaurantsList.forEach((restaurant) => {
      L.marker([restaurant.lat, restaurant.long])
        .addTo(map)
        .on('click', function (e) {
          selectedRestaurant = restaurant
          displayModal = true
        })
    })

    map.on('click', function (e) {
      displayModal = false
    })
  })

  onDestroy(async () => {
    if (map) {
      map.remove()
    }
  })
</script>

<main>
  <div bind:this="{mapElement}" class="h-[80vh] z-0"></div>
  {#if displayModal}
    <div class="fixed bottom-0 z-40 w-full lg:h-72 card lg:card-side shadow-lg rounded-t-lg bg-base-100 mb-12">
      <figure class="h-36 lg:h-full">
        <img
          class="object-cover w-full"
          alt="restaurant-picture"
          src="https://media.istockphoto.com/id/931308812/fr/photo/s%C3%A9lection-de-la-nourriture-am%C3%A9ricaine.jpg?s=612x612&w=0&k=20&c=dg395z__O5wl6bitmkvychwTH4d7bsRa57qf2a2L_HE="
        />
      </figure>
      <div id="restaurant-info " class="card-body">
        <h4 class="card-title">{selectedRestaurant.name}</h4>
        <h5>{selectedRestaurant.city}</h5>
        <p>{selectedRestaurant.primaryPhone}</p>
        <div class="card-actions justify-center lg:flex-col">
          <button on:click="{() => choseRestaurant(true)}" class="btn w-48 btn-primary text-white"
            >Click and collect</button
          >
          <button
            on:click="{() => choseRestaurant(false)}"
            class="btn w-48 btn-ghost border border-primary text-primary">Livraison</button
          >
        </div>
      </div>
    </div>
  {/if}
</main>

<style>
  @import 'leaflet/dist/leaflet.css';
</style>

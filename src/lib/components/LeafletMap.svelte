<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import type { Restaurant } from '$lib/models/restaurant'
  import L from 'leaflet'

  let mapElement
  let map
  let selectedRestaurant
  let displayModal = false
  import { cart } from '$lib/stores/cart'
  import { get } from 'svelte/store'
  import type { Cart } from '$lib/models/cart'
  import { page } from '$app/stores'

  function choseRestaurant(id: string) {
    const cartStore = get(cart)
    cartStore.restaurentId = id
  }

  export let restaurantsList: Array<Restaurant>

  onMount(async () => {
    map = L.map(mapElement).setView([50.63167668045036, 3.0520353211535323], 5)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map)

    leaflet
      .tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      })
      .addTo(map)

    restaurantsList.forEach((restaurant) => {
      leaflet
        .marker([restaurant.lat, restaurant.long])
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
    <div class="fixed bottom-0 h-72 z-40 p-8 w-full rounded-t-lg bg-base-100">
      <div class="w-full grid grid-cols-2 md:grid-cols-3 gap-4">
        <img
          class="h-20 md:h-32 md:w-full rounded-lg object-cover"
          alt="restaurant-picture"
          src="https://media.istockphoto.com/id/931308812/fr/photo/s%C3%A9lection-de-la-nourriture-am%C3%A9ricaine.jpg?s=612x612&w=0&k=20&c=dg395z__O5wl6bitmkvychwTH4d7bsRa57qf2a2L_HE="
        />
        <div id="restaurant-info " class="">
          <h4 class="card-title">{selectedRestaurant.name}</h4>
          <h5>{selectedRestaurant.city}</h5>
          <p>{selectedRestaurant.primaryPhone}</p>
        </div>
      </div>
      <div class="card-actions justify-center m-6">
        <a href="carte?isTakeaway=true"
          ><button onclick="{choseRestaurant(restaurantItem.id)}" class="btn w-48 btn-primary text-white"
            >Click and collect</button
          ></a
        >
        <a href="carte?isTakeaway=false"
          ><button
            onclick="{choseRestaurant(restaurantItem.id)}"
            class="btn w-48 btn-ghost border border-primary text-primary">Livraison</button
          ></a
        >
      </div>
    </div>
  {/if}
</main>

<style>
  @import 'leaflet/dist/leaflet.css';
</style>

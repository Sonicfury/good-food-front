<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import type { Restaurant } from '$lib/models/restaurant';

  let mapElement
  let map
  let selectedRestaurant 
  let displayModal = false

  export let restaurantsList: Array<Restaurant>

  onMount(async () => {
    
    
    const leaflet = await import('leaflet')

    map = leaflet.map(mapElement).setView([50.63167668045036, 3.0520353211535323], 5)

    leaflet
      .tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      })
      .addTo(map)

      restaurantsList.forEach(restaurant => {
        console.log(restaurant, 'restaurant')
        leaflet.marker([restaurant.lat, restaurant.long]).addTo(map).on('click', function(e) {    
          selectedRestaurant = restaurant
          displayModal = true
           
        });
      })
    
      map.on('click', function(e) {  
        displayModal = false      
    });

    
  })

  onDestroy(async () => {
    if (map) {
      map.remove()
    }
  })
</script>

<main>
  <div bind:this="{mapElement}" class="map"></div>
  {#if displayModal}
  <div class="map-modal">
    <div class="card w-120 border-slate-300 border text-neutral-content bg-white">
      <div class="card-body p-6 flex-row">
        <img
          class="w-1/6 rounded-lg object-cover"
          alt="restaurant-picture"
          src="https://media.istockphoto.com/id/931308812/fr/photo/s%C3%A9lection-de-la-nourriture-am%C3%A9ricaine.jpg?s=612x612&w=0&k=20&c=dg395z__O5wl6bitmkvychwTH4d7bsRa57qf2a2L_HE="
        />
        <div class="ml-10">
          <h4 class="card-title">{selectedRestaurant.name}</h4>
          <h5>{selectedRestaurant.city}</h5>
          <p>{selectedRestaurant.primaryPhone}</p>
        </div>
      </div>
      <div class="card-actions justify-center m-6">
        <a href="carte"><button class="btn w-48 btn-primary text-white">Click and collect</button></a>
        <a href="carte"><button class="btn w-48 btn-ghost border border-primary text-primary">Livraison</button></a>
      </div>
    </div>
  </div>
  {/if}
</main>

<style>
  @import 'leaflet/dist/leaflet.css';
  .map {
    height: 600px;
  }
  .map-modal{    
    height: 250px;
    z-index: 9999;
    bottom: 0;
    position: absolute;
    width: 100%;
  }
</style>

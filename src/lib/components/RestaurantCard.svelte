<script lang="ts">
  import type { Restaurant } from '../models/restaurant'
  export let restaurantItem: Restaurant
</script>

<div class="flex justify-center m-10">
  <div class="card w-120 border-slate-300 border text-neutral-content">
    <div class="card-body p-6 flex-row">
      <img
        class="w-1/4 rounded-lg"
        alt="restaurant-picture"
        src="https://media.istockphoto.com/id/931308812/fr/photo/s%C3%A9lection-de-la-nourriture-am%C3%A9ricaine.jpg?s=612x612&w=0&k=20&c=dg395z__O5wl6bitmkvychwTH4d7bsRa57qf2a2L_HE="
      />
      <div class="ml-10">
        <h3 class="card-title">{restaurantItem.name}</h3>
        <h4>{restaurantItem.city}</h4>
        <p>{restaurantItem.address1}</p>
        <p>{restaurantItem.primaryPhone}</p>
      </div>
    </div>
    <div class="card-actions justify-center m-6">
      <button class="btn w-48 btn-primary text-white">Click and collect</button>
      <button class="btn w-48 btn-ghost border border-primary text-primary">Livraison</button>
    </div>
  </div>
</div>

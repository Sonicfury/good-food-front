<script lang="ts">
  import type { Restaurant } from '../models/restaurant'
  export let restaurantItem: Restaurant

  import { cart } from '$lib/stores/cart'
  import { goto } from '$app/navigation'

  async function choseRestaurant(id: number, isTakeaway: boolean) {
    cart.update(c => ({...c, restaurentId: `${id}`}))
    await goto(`carte?isTakeaway=${isTakeaway}`)
  }
</script>

<div class="flex justify-center p-4">
  <div class="card lg:card-side bg-white shadow-lg text-neutral-content">
      <figure>
      <img
        alt="restaurant-picture"
        src="https://media.istockphoto.com/id/931308812/fr/photo/s%C3%A9lection-de-la-nourriture-am%C3%A9ricaine.jpg?s=612x612&w=0&k=20&c=dg395z__O5wl6bitmkvychwTH4d7bsRa57qf2a2L_HE="
      /></figure>
    <div class="card-body p-4 flex flex-col">
        <h3 class="card-title">{restaurantItem.name}</h3>
        <h4>{restaurantItem.city}</h4>
        <p>{restaurantItem.address1}</p>
        <p>{restaurantItem.primaryPhone}</p>
    </div>
    <div class="card-actions p-4 justify-center items-center">
        <button 
        on:click="{choseRestaurant(restaurantItem.id, true)}" 
        class="btn btn-block lg:w-48 btn-primary text-white">
        Click and collect
        </button>
        <button
          on:click="{choseRestaurant(restaurantItem.id, false)}"
          class="btn lg:w-48 btn-block btn-ghost border border-primary text-primary">
          Livraison
          </button>
        </div>
  </div>
</div>

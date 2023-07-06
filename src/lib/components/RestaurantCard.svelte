<script lang="ts">
  import type { Restaurant } from '../models/restaurant'
  import { cart } from '$lib/stores/cart'
  import { goto } from '$app/navigation'
  import { toasts } from '$lib/stores/toasts'

  export let restaurantItem: Restaurant

  async function choseRestaurant(isTakeaway: boolean) {
    cart.update(c => ({
        ...c, 
        restaurentId: `${restaurantItem.id}`, 
        restaurantName: restaurantItem.name,
        items: []
    }))

    await goto(`carte`)
    toasts.success(`<p>Bienvenue chez Good Food</p><p>${restaurantItem.name} !</p>`)
  }
</script>

<div class="flex justify-center p-4">
  <div class="card lg:card-side w-full lg:max-h-[16rem] bg-white shadow-lg text-neutral-content">
      <figure class="lg:max-w-[40%] max-h-[16rem]">
      <img
        alt="restaurant-picture"
        class=""
        src={`${import.meta.env.VITE_BACK_URL}${restaurantItem.image.url}`}
        />
      </figure>
    <div class="card-body p-4 flex flex-col">
        <h3 class="card-title">{restaurantItem.name}</h3>
        <h4>{restaurantItem.city}</h4>
        <p>{restaurantItem.address1}</p>
        <p>{restaurantItem.phone}</p>
    </div>
    <div class="card-actions p-4 justify-center items-center">
        <button 
        on:click="{() => choseRestaurant(true)}"
        class="btn btn-block lg:w-48 btn-primary text-white">
        Click and collect
        </button>
        <button
          on:click="{() => choseRestaurant(false)}"
          class="btn lg:w-48 btn-block btn-ghost border border-primary text-primary">
          Livraison
          </button>
        </div>
  </div>
</div>

<style>
  .picture{
    width: 500px;
    height: 200px;
  }
</style>

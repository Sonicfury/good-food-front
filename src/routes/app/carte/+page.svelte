<script lang="ts">
  import MobileHeader from '$lib/components/MobileHeader.svelte'
  let pageName: string = 'Nom restaurant'
  let urlBack: string = 'restaurants'
  import { onMount } from 'svelte'
  let selectedCategorie: string
  let categories = [] as Array<object>
  let products = [] as Array<object>
  let messageError = 'test' as string
  let isMessageError = false as boolean
  let isSucess = false as boolean
  import { cart } from '$lib/stores/cart'
  import { get } from 'svelte/store'
  import type { Cart } from '$lib/models/cart'
  import { page } from '$app/stores'

  let cartStore: Cart
  $: if (selectedCategorie) {
    getProduct(selectedCategorie)
  }

  onMount(async () => {
    cartStore = get(cart)

    const urlParams = new URLSearchParams(window.location.search)
    const isTakeaway = urlParams.get('isTakeaway')
    cartStore.isTakeaway = isTakeaway
    cart.update((cartStore) => cartStore)
    const successCallback = async (position) => {
      const coords = [position.coords.latitude, position.coords.longitude]
      await getRestaurant(coords)
    }

    const errorCallback = async (error) => {
      await getRestaurant()
    }

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback)
  })

  async function getProduct(selectedCategorie: string) {
    const res = await fetch(`/api/${selectedCategorie}`)

    let response = await res.json()
    if (response.data) {
      products = response.data
    } else {
      isMessageError = true
      messageError = response.message
      isSucess = false
    }
  }

  onMount(async () => {
    const res = await fetch('/api/categories')

    let response = await res.json()
    categories = response.data
  })
</script>

<MobileHeader bind:goBack="{urlBack}" bind:pageName="{pageName}" />
{#if categories.length > 0}
  <div class="flex justify-center mt-10 ">
    <select class="select w-full max-w-xs bg-neutral" bind:value="{selectedCategorie}">
      <option value="menus" selected>Menus</option>
      <option value="offers" selected>Promotions</option>

      {#each categories as category}
        <option value="{category.name}" selected>{category.name}</option>
      {/each}
    </select>
  </div>
{/if}

<div class="flex flex-wrap justify-center">
  {#if products}
    {#each products as product}
      <a href="{'carte/' + product.id}">
        <div class="card w-40 h-40 m-10 bg-neutral ">
          <div class="flex justify-center flex-col items-center text-center p-0">
            <figure class="px-5 pt-5">
              <img src="/images/buger.png" alt="Shoes" class="rounded-xl" />
            </figure>
            <p class="m-3 h-2">{product.name}</p>
            <h4 class="card-title bottom-5	 absolute">{product.price} €</h4>
          </div>
        </div>
      </a>
    {/each}
  {:else}
    <div class="flex justify-center loaderBar">
      <progress class="progress color-neutral w-6/12 progress-warning"></progress>
    </div>
  {/if}
</div>

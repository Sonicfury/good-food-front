<script lang="ts">
  import MobileHeader from '$lib/components/MobileHeader.svelte'
  import { onMount } from 'svelte'
  import { cart } from '$lib/stores/cart'
  import { get } from 'svelte/store'
  import type { Cart } from '$lib/models/cart'
  import { goto } from '$app/navigation'
  import type { Product } from '$lib/models/product'
  import { browser } from '$app/environment'

  let urlBack: string = 'restaurants'
  let selectedCategorie = 'menus'
  let categories = [] as Array<object>
  let products = [] as Array<object>
  let otherProducts: Product[] = []
  let messageError = 'test' as string
  let isMessageError = false 
  let isSucess = false 
  let isLoading = false;
  let cartStore: Cart

  $: if (selectedCategorie && browser) {
    getProduct(selectedCategorie)
  }

  onMount(async () => {
    cartStore = get(cart)

    const urlParams = new URLSearchParams(window.location.search)
    const isTakeaway = urlParams.get('isTakeaway')
    if (cartStore as Cart) {
      cartStore.isTakeaway = isTakeaway
    } else {
      cartStore = {
        isTakeaway: isTakeaway,
      }
    }

    cart.update((cartStore) => cartStore)
    const successCallback = async (position) => {
    }

    const errorCallback = async (error) => {
    }
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback)
    const res = await fetch('/api/categories')

    let response = await res.json()
    categories = response.data
    getProduct('menus')

    const otherProductsResp = await fetch('/api/products')
    const otherProductsJsonResp = await otherProductsResp.json()
    otherProducts = otherProductsJsonResp.data ?? []
  })

  async function getProduct(selectedCategorie: string) {
    
    isLoading = true;
    
    if (['menus', 'offers'].includes(selectedCategorie)) {
        const res = await fetch(`/api/${selectedCategorie}`)
        let response = await res.json()
        if (response.data) {
          products = response.data
        } else {
          isMessageError = true
          messageError = response.message
          isSucess = false
        }
    } else {
        products = otherProducts.filter(op => op.category.name === selectedCategorie)
    }

    isLoading = false;
  }
</script>

<MobileHeader bind:goBack="{urlBack}" bind:pageName="{$cart.restaurantName}" />
{#if categories.length > 0}
    <div class="flex h-fit gap-4 overflow-x-scroll my-4 p-4">
        <button class="btn" class:btn-primary={selectedCategorie === 'menus'} on:click={() => (selectedCategorie = 'menus')}>Menus</button>
        <button class="btn" class:btn-primary={selectedCategorie === 'offers'} on:click={() => (selectedCategorie = 'offers')}>Promotions</button>
      {#each categories as category}
        <button class="btn" class:btn-primary={selectedCategorie === category.name} on:click={() => (selectedCategorie = category.name)}>{category.name}</button>
      {/each}
    </div>
{/if}

<div class="flex flex-wrap gap-8 p-4 justify-center w-full">
  {#if products && !isLoading}
    {#each products as product}
        <div on:click={async () => await goto(`carte/${product.id}`)} class="card w-full cursor-pointer max-w-md min-w-max bg-neutral shadow-lg">
          <div class="card-body">
            <figure class="">
              <img src="/images/buger.png" alt="Shoes" class="" />
            </figure>
            <span class="card-title">{product.name}</span>
            <div class="card-actions justify-end">{product.price} €</div>
          </div>
        </div>
    {/each}
  {:else}
    <div class="flex justify-center loaderBar">
      <progress class="progress color-neutral w-6/12 progress-warning"></progress>
    </div>
  {/if}
  {#if !products.length}
    <span class="text-slate-500">
        Aucun produit disponible dans cette catégorie !
    </span>
  {/if}
</div>

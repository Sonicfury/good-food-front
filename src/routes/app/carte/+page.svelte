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
  let isLoading = false
  let cartStore: Cart

  $: if (selectedCategorie && browser) {
    getProduct(selectedCategorie)
  }

  onMount(async () => {
    cartStore = get(cart)

    cart.update((cartStore) => cartStore)
    const successCallback = async (position) => {}

    const errorCallback = async (error) => {}
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
    isLoading = true

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
      products = otherProducts.filter((op) => op.category.name === selectedCategorie)
    }

    isLoading = false
  }
</script>

<MobileHeader bind:goBack="{urlBack}" bind:pageName="{$cart.restaurantName}" />
{#if categories.length > 0}
  <div class="flex h-fit gap-4 overflow-x-scroll my-4 p-4">
    <button
      class="btn"
      class:btn-primary="{selectedCategorie === 'menus'}"
      on:click="{() => (selectedCategorie = 'menus')}">Menus</button
    >
    <button
      class="btn"
      class:btn-primary="{selectedCategorie === 'offers'}"
      on:click="{() => (selectedCategorie = 'offers')}">Promotions</button
    >
    {#each categories as category}
      <button
        class="btn"
        class:btn-primary="{selectedCategorie === category.name}"
        on:click="{() => (selectedCategorie = category.name)}">{category.name}</button
      >
    {/each}
  </div>
{/if}

<div class="card flex flex-wrap items-center gap-8 p-4 w-full">
  {#if products && !isLoading}
    {#each products as product}
        <div
          on:click="{async () =>
            await goto(`carte/${product.id}${selectedCategorie === 'menus' ? '?menus=true' : '?menus=false'}`)}"
          class="card cursor-pointer max-w-[20rem] min-w-max bg-neutral shadow-lg"
        >
          <figure class="max-h-[12rem] max-w-[20rem]">
            <img class=" object-cover " src="{`${import.meta.env.VITE_BACK_URL}${product.image.url}`}" />
          </figure>

          <div class="card-body">
            <span class="card-title">{product.name}</span>
            <div class="card-actions justify-end">{product.price} €</div>
          </div>
      </div>
    {/each}
  {:else}
    <div class="flex justify-center loaderBar">
      <span class="loading loading-infinity loading-lg text-primary"></span>
    </div>
  {/if}
  {#if !products.length && !isLoading}
    <span class="text-slate-500"> Aucun produit disponible dans cette catégorie ! </span>
  {/if}
</div>

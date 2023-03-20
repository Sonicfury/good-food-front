<script lang="ts">
  import { onMount } from 'svelte'
  import Icon from './Icon.svelte'
  import { mdiChevronRight, mdiCheck } from '@mdi/js'
  import { cart } from '$lib/stores/cart'
  import { get } from 'svelte/store'
  import type { Cart } from '../models/cart'

  let addToCart = false
  let cartStore: Cart

  onMount(() => {
    cartStore = get(cart)
    const searchParams = new URLSearchParams(window.location.search)
    addToCart = searchParams.get('addToCart') === 'true'
    if (addToCart) {
      setTimeout(() => {
        addToCart = false
      }, 10000)
    }
  })
</script>

{#if addToCart}
  <nav
    aria-label="Nav"
    class="mb-14 fixed bottom-4 transform inline-flex  mx-auto bg-white w-full bottom-0 h-14 flex justify-center	 items-center p-5 bg-success text-white"
  >
    <Icon path="{mdiCheck}" clazz="fill-white m-5" />
    Un produit a été ajouté au panier
  </nav>
{/if}
{#if cartStore}
  <nav
    aria-label="Nav"
    class="fixed bottom-4 transform inline-flex  mx-auto justify-between bg-white w-full bottom-0 h-14 flex items-center p-5 "
  >
    <span class="text-success text-xl"> {cartStore.totalPrice} $</span>
    <a href="/app/checkout">
      <div class="flex items-center flex-row	">
        Valider mon panier
        <Icon path="{mdiChevronRight}" clazz="fill-black" />
      </div>
    </a>
  </nav>
{/if}

<script lang="ts">
  import { onMount } from 'svelte'
  import MobileHeader from '$lib/components/MobileHeader.svelte'
  let urlBack = '/app/carte'
  let pageName = 'Panier'
  let quantity = 0 as number
  import { cart } from '$lib/stores/cart'
  import { get } from 'svelte/store'
  import type { Cart } from '../models/cart'
  import Icon from '$lib/components/Icon.svelte'
  import { mdiDeleteOutline } from '@mdi/js'

  let cartStore: Cart

  onMount(() => {
    cartStore = get(cart)
  })

  function addQuantity(id: string): void {
    const objWithIdIndex = cartStore.items.findIndex((obj) => obj.id === id)
    cartStore.items[objWithIdIndex].quantity = cartStore.items[objWithIdIndex].quantity + 1
  }

  function removeQuantity(id: string): void {
    const objWithIdIndex = cartStore.items.findIndex((obj) => obj.id === id)
    cartStore.items[objWithIdIndex].quantity = cartStore.items[objWithIdIndex].quantity - 1
  }

  function deleteItem(id: string): void {
    const objWithIdIndex = cartStore.items.findIndex((obj) => obj.id === id)
    cartStore.items.splice(objWithIdIndex, 1)
    cart.update((cart) => cartStore)
    cartStore = get(cart)
  }
</script>

<MobileHeader bind:goBack="{urlBack}" bind:pageName="{pageName}" />

<div>
  <ul class="steps w-full">
    <li class="step step-primary">Panier</li>
    <li class="step step-primary">Paiement</li>
    <li class="step">Comfirmation</li>
  </ul>
</div>
{#if cartStore}
  {#each cartStore.items as item}
    <div class=" border	border-grey  h-full w-20 rounded-l cursor-pointer flex flex-row cartCard">
      <img src="/images/buger.png" />
      <div>
        <p>{item.name}</p>
        <span> {item.price} $</span>
      </div>
      <div class="custom-number-input h-10 w-32">
        <div class="flex flex-row h-10 w-full rounded-lg relative border-primary">
          <button
            on:click="{removeQuantity(item.id)}"
            data-action="decrement"
            class=" border-y border-l	border-primary  h-full w-20 rounded-l cursor-pointer"
          >
            <span class="m-auto text-2xl font-thin text-primary">−</span>
          </button>
          <input
            type="number"
            class=" border-y	border-primary outline-none focus:outline-none text-center w-full font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none"
            name="custom-input-number"
            value="{item.quantity}"
          />
          <button
            on:click="{addQuantity(item.id)}"
            data-action="increment"
            class=" border-y border-r		border-primary h-full w-20 rounded-r cursor-pointer"
          >
            <span class="m-auto text-2xl font-thin text-primary">+</span>
          </button>
        </div>
      </div>
      <a on:click="{deleteItem(item.id)}">
        <Icon path="{mdiDeleteOutline}" clazz="fill-primary" />
      </a>
    </div>
  {/each}
{/if}

<style>
  .cartCard {
    width: 80%;
    padding: 25px;
    margin: 40px;
    border-radius: 15px;
    align-items: center;
    justify-content: space-between;
  }
</style>

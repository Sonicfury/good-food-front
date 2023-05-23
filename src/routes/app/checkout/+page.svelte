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
  let userSession = null

  onMount(() => {
    cartStore = get(cart)
    userSession = get(session)
  })

  function updateCart(operation: string, price: number, id: string) {
    const objWithIdIndex = cartStore.items.findIndex((obj) => obj.id === id)
    switch (operation) {
      case 'remove':
        if (cartStore.items[objWithIdIndex].quantity - 1 === 0) {
          updateCart('delete', price, id)
        } else {
          cartStore.items[objWithIdIndex].quantity = cartStore.items[objWithIdIndex].quantity - 1
          cartStore.totalPrice = Number(cartStore.totalPrice) - Number(price)
        }
        break
      case 'add':
        cartStore.items[objWithIdIndex].quantity = cartStore.items[objWithIdIndex].quantity + 1
        cartStore.totalPrice = Number(cartStore.totalPrice) + Number(price)
        break
      case 'delete':
        cartStore.items.splice(objWithIdIndex, 1)
        cartStore.totalPrice = Number(cartStore.totalPrice) - Number(price)
        break
      default:
    }
    cart.update((cart) => cartStore)
    cartStore = get(cart)
  }
</script>

<MobileHeader bind:goBack="{urlBack}" bind:pageName="{pageName}" />

<div class="stepper">
  <ul class="steps w-full">
    <li class="step step-primary">Panier</li>
    <li class="step">Adresse</li>
    <li class="step">Paiement</li>
    <li class="step">Comfirmation</li>
  </ul>
</div>
{#if cartStore}
  {#each cartStore.items as item}
    <div class=" border	border-grey h-full w-20 rounded-l cursor-pointer flex flex-row cartCard">
      <img src="/images/buger.png" />
      <div>
        <p>{item.name}</p>
        <span> {item.price} $</span>
      </div>
      <div class="custom-number-input h-10 w-32">
        <div class="flex flex-row h-10 w-full rounded-lg relative border-primary">
          <button
            on:click="{updateCart('remove', item.price, item.id)}"
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
            on:click="{updateCart('add', item.price, item.id)}"
            data-action="increment"
            class=" border-y border-r		border-primary h-full w-20 rounded-r cursor-pointer"
          >
            <span class="m-auto text-2xl font-thin text-primary">+</span>
          </button>
        </div>
      </div>
      <a on:click="{updateCart('delete', item.price, item.id)}">
        <Icon path="{mdiDeleteOutline}" clazz="fill-primary" />
      </a>
    </div>
  {/each}

  <template>
    <div class="container mx-auto px-4">
      <div class="flex justify-between mb-4">
        <h3 class="text-gray-700 font-medium">Sous total</h3>
        <p class="text-gray-700 font-medium">{cartStore.totalPrice} $</p>
      </div>
      <hr class="my-2 border-gray-400" />
      <div class="flex justify-between mt-4">
        <h3 class="text-gray-700 font-medium">Total</h3>
        <p class="text-gray-700 font-medium">{cartStore.totalPrice} $</p>
      </div>
    </div>
  </template>
{/if}
<div class="flex justify-center m-20">
  <a href="{userSession ? './checkout/adresse' : '/login?order=true'}" >
    <button class="btn btn-primary text-white"> Valider mon panier </button>
  </a>
</div>

<style>
  .cartCard {
    width: 90%;
    padding: 25px;
    margin: 40px;
    border-radius: 15px;
    align-items: center;
    justify-content: space-between;
  }
  .stepper {
    margin: 60px;
  }
</style>

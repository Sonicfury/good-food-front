<script lang="ts">
  import MobileHeader from '$lib/components/MobileHeader.svelte'
  let urlBack = '/app/carte'
  let pageName = 'Panier'
  import { cart } from '$lib/stores/cart'
  import { session } from '$lib/stores/session'
  import Icon from '$lib/components/Icon.svelte'
  import { mdiDeleteOutline } from '@mdi/js'
  import { toasts } from '$lib/stores/toasts'
  import type { CartItem } from '$lib/models/cart'

  const remove = (product: CartItem) => {
    cart.update(cart => ({
        ...cart,
        items: cart.items.filter(i => i.id !== product.id)
    }))

    toasts.info(`${product?.name} retiré du panier`)
  }

  const decrement = (product: CartItem, index: number) => {
    if (product.quantity === 1) {
        remove(product)
        return
    }
    $cart.items[index].quantity--
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
{#if $cart}
  <div class="flex items-center flex-col gap-2 p-4 mb-12">
    {#each $cart.items as item, index}
      {#if item.quantity > 0}
        <div class="shadow-lg h-full w-full rounded-lg flex p-4 gap-2 items-center">
          <button class="btn btn-circle btn-ghost" on:click={()=>remove(item)}>
            <Icon path="{mdiDeleteOutline}" clazz="fill-secondary" />
          </button>
          <div>
            <p>{item.name}</p>
            <span> {Number(item.price).toFixed(2)} €</span>
          </div>
          <div class="custom-number-input h-10 w-32">
            <div class="flex flex-row h-10 w-full rounded-lg relative border-primary">
              <button
                on:click="{() => decrement(item, index)}"
                data-action="decrement"
                class=" border-y border-l	border-primary  h-full w-20 rounded-l cursor-pointer"
              >
                <span class="m-auto text-2xl font-thin text-primary">−</span>
              </button>
              <input
                class=" border-y border-primary outline-none focus:outline-none text-center w-10 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none"
                name="custom-input-number"
                value="{item.quantity}"
              />
              <button
                on:click="{() => $cart.items[index].quantity++}"
                data-action="increment"
                class=" border-y border-r border-primary h-full w-20 rounded-r cursor-pointer"
              >
                <span class="m-auto text-2xl font-thin text-primary">+</span>
              </button>
            </div>
          </div>
        </div>
      {/if}
    {/each}
  </div>
  <template>
    <div class="container mx-auto px-4">
      <div class="flex justify-between mb-4">
        <h3 class="text-gray-700 font-medium">Sous total</h3>
        <p class="text-gray-700 font-medium">{$cart.totalPrice ? Number($cart.totalPrice).toFixed(2) : 0} €</p>
      </div>
      <hr class="my-2 border-gray-400" />

      {#if !$cart.isTakeaway}
        <div class="flex justify-between mt-4">
          <h3 class="text-gray-400 ">Livraison</h3>
          <p class="text-gray-400 ">3.99 €</p>
        </div>
      {/if}
      <div class="flex justify-between mt-4">
        <h3 class="text-gray-700 font-medium">Total</h3>
        <p class="text-gray-700 font-medium">
          {!$cart.isTakeaway ? (($cart.totalPrice ?? 0) + 3.99).toFixed(2) : Number($cart.totalPrice).toFixed(2) ?? 0} €
        </p>
      </div>
    </div>
  </template>
{/if}
<div class="flex justify-center m-20">
  <a href="{$session ? './checkout/adresse' : '/login?order=true'}">
    <button class="btn btn-primary text-white"> Valider mon panier </button>
  </a>
</div>

<style>
  .stepper {
    display: block;
    margin: 10px;
  }
  @media screen and (max-width: 780px) {
    .stepper {
      display: none;
      margin: 10px;
    }
  }
</style>

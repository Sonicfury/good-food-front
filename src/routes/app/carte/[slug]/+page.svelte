<script lang="ts">
  import { goto } from '$app/navigation'
  import MobileHeader from '$lib/components/MobileHeader.svelte'
  import { cart } from '$lib/stores/cart'
  import { toasts } from '$lib/stores/toasts'

  export let data
  const { product } = data
  let quantity = 0 as number
  let pageName: string = 'Nom restaurant'
  let urlBack: string = '/app/carte'

  function addQuantity() {
    quantity = quantity + 1
  }

  function removeQuantity() {
    quantity = quantity - 1
  }

  async function addToCart() {
    if (cart && quantity > 0) {
      cart.update((cart) => ({
        ...cart,
        items: [...cart.items, { id: product.id, name: product.name, price: product.price, quantity: quantity }],
      }))
      await goto('/app/carte')
      quantity > 0 && toasts.success(`${quantity} ${product.name} ajouté.e(s) au panier`)
      return
    }

    toasts.info('Il en faut au moins 1 !')
  }
</script>

<MobileHeader bind:goBack="{urlBack}" bind:pageName="{$cart.restaurantName}" />

<div class="flex justify-center flex-col items-center	">
  <figure class="px-20 pt-20 w-50">
    <img src={`${import.meta.env.VITE_BACK_URL}${product.image.url}`} class="w-60" />
  </figure>
  <p class="m-5 h-2">{product.name}</p>
  <h4>{Number(product.price).toFixed(2)} €</h4>
  <div class="custom-number-input h-10 w-32 mt-10">
    <div class="flex flex-row h-10 w-full rounded-lg relative mt-1 border-primary">
      <button
        on:click="{() => removeQuantity()}"
        data-action="decrement"
        class=" border-y border-l	border-primary  h-full w-20 rounded-l cursor-pointer"
      >
        <span class="m-auto text-2xl font-thin text-primary">−</span>
      </button>
      <input
        class=" border-y	border-primary outline-none focus:outline-none text-center w-full font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none"
        name="custom-input-number"
        value="{quantity}"
      />
      <button
        on:click="{() => addQuantity()}"
        data-action="increment"
        class=" border-y border-r		border-primary h-full w-20 rounded-r cursor-pointer"
      >
        <span class="m-auto text-2xl font-thin text-primary">+</span>
      </button>
    </div>
  </div>
  <button on:click="{() => addToCart()}" class="btn w-48 btn-primary text-white mt-20">Ajouter au panier</button>
</div>

<style>
  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .custom-number-input input:focus {
    outline: none !important;
  }

  .custom-number-input button:focus {
    outline: none !important;
  }
</style>

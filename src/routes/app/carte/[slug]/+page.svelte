<script lang="ts">
  import MobileHeader from '$lib/components/MobileHeader.svelte'

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
</script>

<MobileHeader bind:goBack="{urlBack}" bind:pageName="{pageName}" />

<div class="flex justify-center flex-col items-center	">
  <figure class="px-20 pt-20 w-50">
    <img src="/images/buger.png" class="w-60" />
  </figure>
  <p class="m-3 h-2">{product.name}</p>
  <h4>{product.price} €</h4>
  <div class="custom-number-input h-10 w-32">
    <div class="flex flex-row h-10 w-full rounded-lg relative mt-1 border-primary">
      <button
        on:click="{removeQuantity}"
        data-action="decrement"
        class=" border-y border-l	border-primary  h-full w-20 rounded-l cursor-pointer"
      >
        <span class="m-auto text-2xl font-thin text-primary">−</span>
      </button>
      <input
        type="number"
        class=" border-y	border-primary outline-none focus:outline-none text-center w-full font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none"
        name="custom-input-number"
        value="{quantity}"
      />
      <button
        on:click="{addQuantity}"
        data-action="increment"
        class=" border-y border-r		border-primary h-full w-20 rounded-r cursor-pointer"
      >
        <span class="m-auto text-2xl font-thin text-primary">+</span>
      </button>
    </div>
  </div>
  <button class="btn w-48 btn-primary text-white mt-20">Ajouter au panier</button>
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

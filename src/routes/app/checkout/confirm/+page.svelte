<script lang="ts">
  import MobileHeader from '$lib/components/MobileHeader.svelte'
  import Icon from '$lib/components/Icon.svelte'
  import { mdiCheckCircle } from '@mdi/js'
  import { onMount } from 'svelte'
  import { cart } from '$lib/stores/cart'
  let urlBack = 'payment'
  let pageName = 'Checkout'
  import { get } from 'svelte/store'
  import { toasts } from '$lib/stores/toasts'
  import { goto } from '$app/navigation'

  onMount(async () => {
    const storeCart = get(cart)
    const order = {
      state: '0',
      customer_id: '',
      restaurant_id: storeCart.restaurentId,
      isTakeaway: Boolean(storeCart.isTakeaway),
      total: storeCart.totalPrice,
    }
    const res = await fetch(`/api/orders`, {
      method: 'POST',
      body: JSON.stringify(order),
    })
    let response = await res.json()
    storeCart.items.forEach(async (item) => {
      const productOrder = {
        comment: 'test',
        quantity: item.quantity,
        menu_id: '',
        product_id: item.id,
        order_id: response.data.id,
      }
      await fetch(`/api/ordereds`, {
        method: 'POST',
        body: JSON.stringify(productOrder),
      })
    })

    toasts.success("<p>Merci pour votre commande,</p><p>c'est en cuisine !</p>")

    cart.update((cart) => ({
      items: [],
      totalPrice: 0,
      isTakeaway: cart.isTakeaway,
      restaurentId: cart.restaurentId,
      restaurantName: cart.restaurantName,
    }))
    await timeout(5000)
    await goto('/app/dashboard')
  })

  function timeout(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
</script>

<MobileHeader bind:goBack="{urlBack}" bind:pageName="{pageName}" />

<div class="stepper hidden lg:block mb-12">
  <ul class="steps w-full">
    <li class="step step-primary">Panier</li>
    <li class="step step-primary">Adresse</li>
    <li class="step step-primary">Paiement</li>
    <li class="step step-primary">Comfirmation</li>
  </ul>
</div>

<div class="flex justify-center flex-col items-center">
  <h3 class="text-3xl mb-20 center mt-20">Commande comfirmée</h3>
  <img src="../../images/checkIcon.png" class="w-36" alt="icon" />
  <button on:click="{() => toasts.info("Bientôt, c'est promis !")}">
    <button class=" btn btn-outline  btn-primary text-white"> Suivre ma livraison </button>
  </button>
</div>

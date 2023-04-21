<script lang="ts">
    import MobileHeader from '$lib/components/MobileHeader.svelte'
    import Icon from '$lib/components/Icon.svelte';
    import { mdiCheckCircle } from '@mdi/js'
    import { onMount } from 'svelte'
    import { cart } from '$lib/stores/cart'
    let urlBack = 'payment'
    let pageName = 'Checkout'
    import { get } from 'svelte/store'

    onMount( async()  => {
      const storeCart = get(cart)
      const order = {
        "state":"0",
        "customer_id":"",
        "restaurant_id": storeCart.restaurentId,
        "isTakeaway": Boolean(storeCart.isTakeaway),
        "total": storeCart.totalPrice
      }
      const res = await fetch(`/api/orders`, {
        method: 'POST',
        body: JSON.stringify(order),
      })
      let response = await res.json()
      storeCart.items.forEach(async item => {
        const productOrder = {
          "comment":"test",
          "quantity": item.quantity,
          "menu_id":"",
          "product_id": item.id,
          "order_id": response.data.id
        }
        await fetch(`/api/ordereds`, {
          method: 'POST',
          body: JSON.stringify(productOrder),
        })
      })
    })  
  </script>
  
  <MobileHeader bind:goBack="{urlBack}" bind:pageName="{pageName}" />
  
  <div class="stepper">
    <ul class="steps w-full">
      <li class="step step-primary">Panier</li>
      <li class="step step-primary">Adresse</li>
      <li class="step step-primary">Paiement</li>
      <li class="step step-primary">Comfirmation</li>
    </ul>
  </div>

  <div class="flex justify-center flex-col items-center">
    <h3 class="text-4xl mb-20 center mt-20">Commande comfirmée</h3>
    <img src="../../images/checkIcon.png"  class="w-44" alt="icon">    
    <a href="delivery">
      <button class=" btn btn-outline  btn-primary text-white"> Suivre ma livraison </button>
    </a>
  </div>

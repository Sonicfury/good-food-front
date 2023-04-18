<script lang="ts">
    import MobileHeader from '$lib/components/MobileHeader.svelte'
    import Icon from '$lib/components/Icon.svelte';
    import { mdiCheckCircle } from '@mdi/js'

    let urlBack = 'payment'
    let pageName = 'Checkout'
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

  <div class="flex justify-center m-20 flex-col items-center">
    <h3 class="text-4xl mb-20">Commande comfirmée</h3>
    <img src="../../images/checkIcon.png"  class="w-44" alt="icon">    
    <a href="delivery">
      <button class=" btn btn-outline  btn-primary text-white"> Suivre ma livraison </button>
    </a>
  </div>
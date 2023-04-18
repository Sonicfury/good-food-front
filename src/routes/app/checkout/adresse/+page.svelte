<script lang="ts">
  import MobileHeader from '$lib/components/MobileHeader.svelte'
  let urlBack = '/app/checkout'
  let pageName = 'Checkout'
  import Adress from '$lib/components/Adress.svelte';
  let canUpdate = false
</script>

<MobileHeader bind:goBack="{urlBack}" bind:pageName="{pageName}" />
<div class="stepper">
  <ul class="steps w-full">
    <li class="step step-primary">Panier</li>
    <li class="step step-primary">Adresse</li>
    <li class="step">Paiement</li>
    <li class="step">Comfirmation</li>
  </ul>
</div>
<Adress bind:canUpdate="{canUpdate}"/>




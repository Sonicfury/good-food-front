<script lang="ts">
  import MobileHeader from '$lib/components/MobileHeader.svelte'
  let urlBack = '/app/checkout'
  let pageName = 'Checkout'
  let isAdressForm = true

  let adressForm = {
    name:'' as string, 
    city: '' as string,
    address1: '' as string,
    zipCode: '' as string
  }

  let adress = [{
    name:'John Doe',
    city: ' Montréal',
    address1: '1234 Rue de la Victoire Montréal QC H4L 2C4',
    zipCode: '2C4'
  }, {
    name:'Bob Smith',
    city: ' Montréal',
    address1: '1234 Rue de la Victoire Montréal QC H4L 2C4',
    zipCode: '2C4'
  },{
    name:'Jane Smith',
    city: ' Montréal',
    address1: '1234 Rue de la Victoire Montréal QC H4L 2C4',
    zipCode: '2C4'
  },{
    name:'John Doe',
    city: ' Montréal',
    address1: '1234 Rue de la Victoire Montréal QC H4L 2C4',
    zipCode: '2C4'
  }]

  function showAdressForm(){
    isAdressForm = false
  }

  async function saveAdress(){
    const response: Response = await fetch('/api/adresse', {
      method: 'POST',
      body: JSON.stringify(adressForm),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    console.log(response, 'response')
    adress.push(adressForm)
    isAdressForm = true
  }
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
<div class="flex flex-col m-10">
  {#if isAdressForm}
  <div class="flex flex-col">
    <label class="text-gray-700 font-semibold mb-2">Adresse de livraison :</label>
    {#if adress}
    {#each adress as item}
    <div class="space-y-4 m-2">
      <!-- Première adresse -->
      <div class="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div class="px-4 py-3 flex items-center justify-between">
          <div class="font-semibold text-gray-800">{item.name}</div>
          <input
            type="radio"
            name="address"
            id="address1"
            class="h-4 w-4 text-red-600 rounded-full border border-gray-300"
          />
        </div>
        <div class="px-4 py-3 border-b border-gray-200">
          {item.city}
          {item.zipCode}
          {item.address1}
        </div>
      </div>
      </div>
      {/each}
    {/if}
  </div>
  <button on:click="{showAdressForm}" class=" btn btn-outline  btn-primary text-white mt-10"> Ajouter une adresse </button>
  {:else}
  <div class="flex flex-col">
    <label class="text-gray-700 font-semibold mb-2" for="new-address">Nouvelle adresse :</label>
    <input
    class="w-full bg-white border border-gray-300 rounded-lg shadow-sm py-2 px-3 mb-3"
    type="text"
    id="new-address"
    placeholder="Adresse"
    bind:value="{adressForm.name}"
  />
    <input
      class="w-full bg-white border border-gray-300 rounded-lg shadow-sm py-2 px-3 mb-3"
      type="text"
      id="new-address"
      placeholder="Adresse"
      bind:value="{adressForm.address1}"
    />

    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="text-gray-700 font-semibold mb-2" for="new-address-city">Ville :</label>
        <input
          class="w-full bg-white border border-gray-300 rounded-lg shadow-sm py-2 px-3 mb-3"
          type="text"
          id="new-address-city"
          placeholder="Ville"
          bind:value="{adressForm.city}"
        />
      </div>
      <div>
        <label class="text-gray-700 font-semibold mb-2" for="new-address-zip">Code postal :</label>
        <input
          class="w-full bg-white border border-gray-300 rounded-lg shadow-sm py-2 px-3 mb-3"
          type="text"
          id="new-address-zip"
          placeholder="Code postal"
          bind:value="{adressForm.zipCode}"
        />
      </div>
      <!-- <div class="form-control w-40	">
        <label class="label cursor-pointer">
        
          <input type="checkbox" checked="{adressForm.isDefault}" class="checkbox checkbox-primary" />
          <span class="label-text">Adresse principal</span> 
        </label>
      </div> -->
    </div>
      <button on:click="{saveAdress}" class="color-primary btn btn-outline font-semibold py-2 px-4 rounded-lg mt-4"> Enregistrer </button>
  </div>
  {/if}
  <a href="payment">
    <button class=" w-full btn btn-primary text-white mt-10"> Valider mon adresse </button>
  </a>
</div>



<style>
  select option {
    color: #666;
  }

  select:focus {
    outline: none;
    border-color: #df6562;
    box-shadow: 0 0 0 2px rgba(223, 101, 98, 0.5);
  }

  input:focus {
    outline: none;
    border-color: #df6562;
    box-shadow: 0 0 0 2px rgba(223, 101, 98, 0.5);
  }
</style>

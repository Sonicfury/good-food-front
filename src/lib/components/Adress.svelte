<script lang="ts">

let isAdressForm = true
import { onMount } from 'svelte';
import Alert from '$lib/components/Alert.svelte'
let alertMessage = ''
let alertLevel: 'error' | 'success' | 'warning' | 'info' = 'error'
let showAlert = false
import type { Adress } from '$lib/models/adress';


let adressForm: Adress = {
  name:'' as string, 
  city: '' as string,
  address1: '' as string,
  zipCode: '' as string
}

let adress = [] as Array<Adress>

 onMount( async()  => {
  getAdress()
})

async function getAdress(){
  const res = await fetch(`/api/adresse`)
  let response = await res.json()
  if (response.data) {
    adress = response.data
  } else {
    alertLevel = 'error'
    alertMessage = response.message
    showAlert = true
  }
}

function showAdressForm(){
  isAdressForm = false
}

async function saveAdress(){
    if(adressForm.id){
        await fetch('/api/adresse', {
            method: 'PUT',
            body: JSON.stringify(adressForm),
            headers: {
            'Content-Type': 'application/json',
            },
        })
    }else{
        await fetch('/api/adresse', {
            method: 'POST',
            body: JSON.stringify(adressForm),
            headers: {
            'Content-Type': 'application/json',
            },
        })
    }
  
  await getAdress()
  isAdressForm = true
}

async function deleteAdress(id: number){
    await fetch('/api/adresse', {
        method: 'DELETE',
        body: JSON.stringify(id),
        headers: {
        'Content-Type': 'application/json',
        },
    })
    getAdress()
}

async function updateAdress(item: Adress){
    isAdressForm = false
    adressForm = item
    // await fetch('/api/adresse', {
    //     method: 'PUT',
    //     body: JSON.stringify(item),
    //     headers: {
    //     'Content-Type': 'application/json',
    //     },
    // })
    // getAdress()
}

</script>

<Alert level="{alertLevel}" message="{alertMessage}" />
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
        <button on:click="{deleteAdress(item.id)}" class=" btn btn-outline  btn-primary text-white m-2"> Supprimer </button>
        <button on:click="{updateAdress(item)}" class=" btn btn-outline  btn-success text-white m-2"> Modifier </button>
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
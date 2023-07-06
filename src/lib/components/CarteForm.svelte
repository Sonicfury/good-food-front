<script lang="ts">
  import type { Menu } from './../models/menu.ts'
  import type { Product } from '$lib/models/product'
  import type { Category } from '$lib/models/category'
  export let carteItemName: string
  export let item: Product | Category
  import FileInput from './FileInput.svelte';
  import { browser } from '$app/environment'


  let categories: Array<Category> = []
  let menus: Array<Menu> = []
  let products: Array<Product> = []
  $: offersEntity = 0
  let searchTerm = ''
  let adresseList = null as Array<any> | null
  let dropdownOpen = true as boolean

  let base64;

  const handleFileSelected = (event) => {
    item.image = event.detail
  };

  async function getCategories() {
    const res = await fetch(`/api/categories`)
    let response = await res.json()
    if (response.data) {
      categories = response.data
    }
  }

  async function getMenus() {
    const res = await fetch(`/api/menus`)
    let response = await res.json()
    if (response.data) {
      menus = response.data
    }
  }

  async function getProducts() {
    const res = await fetch(`/api/products`)
    let response = await res.json()
    if (response.data) {
      products = response.data
    }
  }

  $: if (carteItemName === 'products' && browser) {
    getCategories()
  }

  $: if (carteItemName === 'offers' && browser || carteItemName === 'menus') {
    getProducts()
    getMenus()
  }

  $: if (offersEntity !== 0) {
    item.offersEntity = offersEntity
  }

  async function searchBooks() {
    dropdownOpen = true
    const response: Response = await fetch('/api/coordinate', {
      method: 'POST',
      body: JSON.stringify(item.address1),
    })

    const adresse = await response.json()
    adresseList = adresse.data
  }

  async function selectAdresse(value: Array<any>) {
    item.lat = value.geometry.coordinates[0]
    item.long =value.geometry.coordinates[1]
    item.address1 = value.properties.label
    dropdownOpen = false
  }
</script>

<h3 class="font-bold text-lg m-6">Ajouter ou modifier {carteItemName}</h3>
<div class="flex content-row flex-col items-center	 justify-center">
  <input
    type="text"
    placeholder="Nom"
    bind:value="{item.name}"
    class="input text-black m-6  bg-neutral mb-3  w-80 max-w-xs mt-10  "
  />
  {#if carteItemName === 'products' || carteItemName === 'categories'}
  <FileInput on:fileSelected={handleFileSelected} />
  {/if}
  {#if carteItemName === 'products' || carteItemName === 'menus'}
    <input
      type="number"
      placeholder="Prix"
      bind:value="{item.price}"
      class="input text-black m-6  bg-neutral mb-3  w-80 max-w-xs mt-10  "
    />
  {/if}
  {#if carteItemName === 'restaurants'}
  <input
    type="text"
    placeholder="Adresse"
    bind:value="{item.address1}"
    class="input text-black m-6  bg-neutral w-80 max-w-xs mt-10 "
    on:input="{searchBooks}"
  />
  {#if adresseList && dropdownOpen}
    <ul class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-68">
      {#each adresseList as adresse}
        <li on:click="{() => selectAdresse(adresse)}"><a>{adresse.properties.label}</a></li>
      {/each}
    </ul>
  {/if}
  <input
    type="text"
    placeholder="Code postal"
    bind:value="{item.zipCode}"
    class="input text-black m-6  bg-neutral mb-3  w-80 max-w-xs mt-10  "
  />
  <input
    type="text"
    placeholder="Ville"
    bind:value="{item.city}"
    class="input text-black m-6  bg-neutral mb-3  w-80 max-w-xs mt-10  "
  />
  <input
    type="number"
    placeholder="Téléphone"
    bind:value="{item.phone}"
    class="input text-black m-6  bg-neutral mb-3  w-80 max-w-xs mt-10  "
  />
  {/if}
  {#if carteItemName === 'products'}
    <label class="label">
      <span class="label-text">Catégorie</span>
    </label>
    <select class="select w-full max-w-xs" bind:value="{item.category}">
      {#if item.category}
        <option value="{item.category}" selected>{item.category.name}</option>
      {/if}
      {#each categories as category}
        <option value="{category}">{category.name}</option>
      {/each}
    </select>
  {/if}
  {#if carteItemName === 'offers'}
    <input
      type="number"
      placeholder="Pourcentage"
      bind:value="{item.percent}"
      min="1"
      max="100"
      class="input text-black m-6  bg-neutral mb-3  w-80 max-w-xs mt-10  "
    />
  {/if}
  {#if carteItemName === 'offers' && !item.id}
    <span class="m-6">Créer une offre sur un produit ou un menu : </span>
    <div class="flex direction-collumn">
      <label class="label cursor-pointer">
        <span class="label-text m-2">Produit</span>
        <input
          bind:group="{offersEntity}"
          type="radio"
          name="{offersEntity}"
          class="radio checked:bg-primary"
          checked
          value="{1}"
        />
      </label>

      <label class="label cursor-pointer ">
        <span class="label-text m-2">Menu</span>
        <input
          bind:group="{offersEntity}"
          type="radio"
          name="{offersEntity}"
          class="radio checked:bg-primary"
          checked
          value="{2}"
        />
      </label>
    </div>
    {/if}
    {#if carteItemName === 'offers' && !item.id && offersEntity === 1 || carteItemName === 'menus'}
      <label class="label">
        <span class="label-text">Produits</span>
      </label>
      <select class="select w-full max-w-xs" bind:value="{item.products}">
        {#each products as product}
          <option value="{product}">{product.name}</option>
        {/each}
      </select>
    {/if}
    {#if  carteItemName === 'offers' && !item.id && offersEntity === 2}
      <label class="label">
        <span class="label-text">Menus</span>
      </label>
      <select class="select w-full max-w-xs" bind:value="{item.menus}">
        {#each menus as menu}
          <option value="{menu}">{menu.name}</option>
        {/each}
      </select>
    {/if}
 
</div>

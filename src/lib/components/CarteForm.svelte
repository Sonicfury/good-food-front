<script lang="ts">
  import type { Menu } from './../models/menu.ts'
  import type { Product } from '$lib/models/product'
  import type { Category } from '$lib/models/category'
  export let carteItemName: string
  export let item: Product | Category

  let categories: Array<Category> = []
  let menus: Array<Menu> = []
  let products: Array<Product> = []
  $: offersEntity = 0

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

  $: if (carteItemName === 'products') {
    getCategories()
  }

  $: if (carteItemName === 'offers') {
    getProducts()
    getMenus()
  }

  $: if (offersEntity !== 0) {
    item.offersEntity = offersEntity
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

  {#if carteItemName === 'products' || carteItemName === 'menus'}
    <input
      type="number"
      placeholder="Prix"
      bind:value="{item.price}"
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
    {#if offersEntity === 1}
      <label class="label">
        <span class="label-text">Produits</span>
      </label>
      <select class="select w-full max-w-xs" bind:value="{item.products}">
        {#each products as product}
          <option value="{product}">{product.name}</option>
        {/each}
      </select>
    {/if}
    {#if offersEntity === 2}
      <label class="label">
        <span class="label-text">Menus</span>
      </label>
      <select class="select w-full max-w-xs" bind:value="{item.menus}">
        {#each menus as menu}
          <option value="{menu}">{menu.name}</option>
        {/each}
      </select>
    {/if}
  {/if}
</div>

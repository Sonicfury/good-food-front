<script lang="ts">
  import type { Product } from '$lib/models/product'
  import type { Category } from '$lib/models/category'

  export let carteItemName: string
  export let item: Product | Category

  let categories: Array<Category> = []

  async function getCategories() {
    const res = await fetch(`/api/categories`)
    let response = await res.json()
    if (response.data) {
      categories = response.data
    }
  }

  $: if (carteItemName === 'products') {
    getCategories()
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

  {#if carteItemName === 'products'}
    <input
      type="number"
      placeholder="Prix"
      bind:value="{item.price}"
      class="input text-black m-6  bg-neutral mb-3  w-80 max-w-xs mt-10  "
    />
    <select class="select w-full max-w-xs" bind:value="{item.category}">
      {#if item.category}
        <option value="{item.category}" selected>{item.category.name}</option>
      {/if}
      {#each categories as category}
        <option value="{category}">{category.name}</option>
      {/each}
    </select>
  {/if}
</div>

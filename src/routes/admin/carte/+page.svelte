<script lang="ts">
  import AdminTable from '$lib/components/AdminTable.svelte'
  import type { Category } from '$lib/models/category'
  import { onMount } from 'svelte'
  let carteItemName: string = 'categories'
  $: cartefetchItem = [] as Array<Category>

  onMount(async () => {
    getCarteItem(carteItemName)
  })

  async function getCarteItem(carteItemType: string) {
    carteItemName = carteItemType
    const res = await fetch(`/api/${carteItemType}`)
    let response = await res.json()
    if (response.data) {
      cartefetchItem = response.data
    }
  }
</script>

<div class="flex justify-center mt-12">
  <div class="tabs color-primary ">
    <button
      on:click="{() => getCarteItem('categories')}"
      class="{carteItemName === 'categories'
        ? 'tab-active tab tab-bordered text-xl text-black'
        : 'tab tab-bordered text-xl text-black'}	">Catégories</button
    >
    <button
      on:click="{() => getCarteItem('menu')}"
      class="{carteItemName === 'menu'
        ? 'tab-active tab tab-bordered text-xl text-black'
        : 'tab tab-bordered text-xl text-black'}	">Menus</button
    >
    <button
      on:click="{() => getCarteItem('products')}"
      class="{carteItemName === 'products'
        ? 'tab-active tab tab-bordered text-xl text-black'
        : 'tab tab-bordered text-xl text-black'}	">Produits</button
    >
    <button
      on:click="{() => getCarteItem('sales')}"
      class="{carteItemName === 'sales'
        ? 'tab-active tab tab-bordered text-xl text-black'
        : 'tab tab-bordered text-xl text-black'}	">Promotions</button
    >
  </div>
</div>
<AdminTable carteItemName="{carteItemName}" cartefetchItem="{cartefetchItem}" />

<style>
  .tab.tab-active {
    border-color: #df6562;
    color: #df6562;
  }
</style>

<script lang="ts">
  import AdminTable from '$lib/components/AdminTable.svelte'
  import TableHeader from '$lib/components/TableHeader.svelte'
  import { CarteItem } from '$lib/enums/carte'
  let carteItemName = 'categories' as CarteItem | string
  let cartefetchItem = null

  function getCarteItem(carteItemType: CarteItem) {
    // fetch item type
    // cartefetchItem = result
    carteItemName = carteItemType
  }
</script>

<div class="flex justify-center mt-24">
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
<TableHeader carteItemName="{carteItemName}" />
<AdminTable carteItemName="{carteItemName}" cartefetchItem="{cartefetchItem}" />

<style>
  .tab.tab-active {
    border-color: #df6562;
    color: #df6562;
  }
</style>

<script lang="ts">
  import AdminTable from '$lib/components/AdminTable.svelte'
  import TableHeader from '$lib/components/TableHeader.svelte'
  import { CarteItem } from '$lib/enums/carte'
  let carteItemName = '' as CarteItem | string
  let cartefetchItem = null

  function getCarteItem(carteItemType: CarteItem) {
    // fetch item type
    // cartefetchItem = result
    carteItemName = carteItemType
  }
</script>

<div class="flex justify-center mt-24">
  <div class="tabs color-primary ">
    <button on:click="{() => getCarteItem('categories')}" class="tab tab-bordered text-xl">Catégories</button>
    <button on:click="{() => getCarteItem('menu')}" class="tab tab-bordered tab-active border-primary text-xl	"
      >Menus</button
    >
    <button on:click="{() => getCarteItem('products')}" class="tab tab-bordered text-xl	">Produits</button>
    <button on:click="{() => getCarteItem('sales')}" class="tab tab-bordered text-xl">Promotions</button>
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

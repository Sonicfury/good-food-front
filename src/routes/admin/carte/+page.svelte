<script lang="ts">
  import AdminTable from '$lib/components/AdminTable.svelte'
  import TableHeader from '$lib/components/TableHeader.svelte'
</script>

<div class="flex justify-center mt-24">
  <div class="tabs color-primary ">
    <a class="tab tab-bordered text-xl	">Catégories </a>
    <a class="tab tab-bordered tab-active border-primary text-xl	">Menus</a>
    <a class="tab tab-bordered text-xl	">Produits</a>
    <a class="tab tab-bordered text-xl">Promotions</a>
  </div>
</div>
<TableHeader />
<AdminTable />

<style>
  .tab.tab-active {
    border-color: #df6562;
    color: #df6562;
  }
</style>

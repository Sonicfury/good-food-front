<script lang="ts">
  import Icon from './Icon.svelte'
  import { mdiCircleEditOutline } from '@mdi/js'
  import { mdiDeleteOutline } from '@mdi/js'
  import { page } from '$app/stores'
  import CarteForm from './CarteForm.svelte'
  import type { Category } from '$lib/models/category'
  import { paginate, LightPaginationNav } from 'svelte-paginate'
  import Search from './Search.svelte'

  export let carteItemName: string
  export let cartefetchItem: Array<Category>
  const isActive = (path: string) => $page.route.id === path

  let items: Array<Category> = []
  let currentPage: number = 1
  let pageSize: number = 5
  let paginatedItems: Array<Category> = []
  let searchTerm = ''

  $: if (cartefetchItem.length > 0) {
    items = cartefetchItem
    paginatedItems = paginate({ items, pageSize, currentPage })
  }

  const search = () => {
    let items = cartefetchItem.filter((item) => {
      let itemTitle = item.name.toLowerCase()
      return itemTitle.includes(searchTerm.toLowerCase())
    })
    paginatedItems = paginate({ items, pageSize, currentPage })
  }
</script>

<div class=" flex justify-around mt-24 mb-4">
  <label for="my-modal-5" class="btn btn-accent text-white"> + Ajouter un/une {carteItemName} </label>
  <Search bind:searchTerm="{searchTerm}" on:input="{search}" placeholder="Recherche ..." />

  <CarteForm carteItemName="{carteItemName}" />
</div>
<div class="overflow-x-auto flex justify-center">
  <table class="table w-3/4">
    <thead>
      <tr>
        <th>id </th>
        <th>Nom </th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody class="bg-white">
      {#each paginatedItems as carteItem}
        <tr>
          <th>{carteItem.id}</th>
          <td>{carteItem.name}</td>
          <td class="flex content-row">
            <label class="mr-8" for="my-modal-5"
              ><Icon
                path="{mdiCircleEditOutline}"
                clazz="{isActive('/admin/carte') ? 'fill-success' : 'fill-secondary'}"
              /></label
            >
            <button>
              <Icon path="{mdiDeleteOutline}" clazz="{isActive('/admin/carte') ? 'fill-error' : 'fill-secondary'}" />
            </button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>

  <CarteForm carteItemName="{carteItemName}" />
</div>
<div class="pagination-nav">
  <LightPaginationNav
    totalItems="{items.length}"
    pageSize="{pageSize}"
    currentPage="{currentPage}"
    limit="{1}"
    showStepOptions="{true}"
    on:setPage="{(e) => (currentPage = e.detail.page)}"
  />
</div>

<style>
  .pagination-nav :global(.pagination-nav) {
    background: none !important;
    box-shadow: none !important;
  }
</style>

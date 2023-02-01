<script lang="ts">
  import type { Product } from '$lib/models/product.ts'
  import Icon from './Icon.svelte'
  import { mdiCircleEditOutline } from '@mdi/js'
  import { mdiDeleteOutline } from '@mdi/js'
  import { page } from '$app/stores'
  import CarteForm from './CarteForm.svelte'
  import type { Category } from '$lib/models/category'

  import { paginate, LightPaginationNav } from 'svelte-paginate'
  import Search from './Search.svelte'
  import { createEventDispatcher } from 'svelte'
  import Modal from './Modal.svelte'
  const dispatch = createEventDispatcher()

  export let carteItemName: string
  export let cartefetchItem: Array<Category | Product>
  const isActive = (path: string) => $page.route.id === path

  let items: Array<Category | Product> = []
  let currentPage: number = 1
  let pageSize: number = 5
  let paginatedItems: Array<Category | Product> = []
  let searchTerm: string = ''
  let itemToPut = null
  let showModal: boolean = false
  let editItem = {}

  $: if (cartefetchItem.length > 0) {
    paginatedItems = []
    items = cartefetchItem
    paginatedItems = paginate({ items, pageSize, currentPage })
  } else {
    paginatedItems = []
  }

  const search = () => {
    let items = cartefetchItem.filter((item) => {
      let itemTitle = item.name.toLowerCase()
      return itemTitle.includes(searchTerm.toLowerCase())
    })
    paginatedItems = paginate({ items, pageSize, currentPage })
  }

  const deleteItem = async (id: Number) => {
    dispatch('deleteItem', {
      id: id,
    })
  }

  function putItem(carteItem: Category | Product) {
    if (carteItem.id) {
      dispatch('editItem', {
        item: carteItem,
      })
    } else {
      dispatch('postItem', {
        item: carteItem,
      })
    }
    showModal = false
    editItem = {}
  }

  function openModalWithItem(item: Category | Product) {
    editItem = item
    showModal = true
  }

  function closeModal() {
    showModal = false
    editItem = {}
  }
</script>

<div class=" flex justify-around mt-24 mb-4">
  <button on:click="{() => (showModal = true)}" class="btn btn-accent text-white">
    + Ajouter un/une {carteItemName}
  </button>
  <Search bind:searchTerm="{searchTerm}" on:input="{search}" placeholder="Recherche ..." />
</div>
<div class="overflow-x-auto flex justify-center">
  <table class="table w-3/4">
    <thead>
      <tr>
        <th>id </th>
        <th>Nom </th>
        {#if carteItemName === 'products' || carteItemName === 'menus'}
          <th>Prix </th>
        {/if}
        {#if carteItemName === 'products'}
          <td>Catégorie</td>
        {/if}
        {#if carteItemName === 'offers'}
          <td>Pourcentage</td>
        {/if}
        <th>Actions</th>
      </tr>
    </thead>
    <tbody class="bg-white">
      {#each paginatedItems as carteItem}
        <tr>
          <th>{carteItem.id}</th>
          <td>{carteItem.name}</td>
          {#if carteItemName === 'products' || carteItemName === 'menus'}
            <th>{carteItem.price} €</th>
          {/if}
          {#if carteItemName === 'products'}
            <td>{carteItem.category.name}</td>
          {/if}
          {#if carteItemName === 'offers'}
            <td>{carteItem.percent}</td>
          {/if}
          <td class="flex content-row">
            <button on:click="{() => openModalWithItem(carteItem)}">
              <Icon
                path="{mdiCircleEditOutline}"
                clazz="{isActive('/admin/carte') ? 'fill-success' : 'fill-secondary'}"
              />
            </button>
            <button on:click="{() => deleteItem(carteItem.id)}">
              <Icon path="{mdiDeleteOutline}" clazz="{isActive('/admin/carte') ? 'fill-error' : 'fill-secondary'}" />
            </button>
          </td>
        </tr>
        {#if showModal}
          <Modal>
            <CarteForm carteItemName="{carteItemName}" item="{editItem}" />
            <div class=" flex content-row justify-center m-6">
              <button on:click="{() => closeModal()}" class="btn btn-error text-white m-2">Annuler</button>
              <button on:click="{() => putItem(editItem)}" class="btn btn-success text-white m-2"> Valider</button>
            </div>
          </Modal>
        {/if}
      {/each}
    </tbody>
  </table>
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
  .table th:first-child {
    position: static;
  }
</style>

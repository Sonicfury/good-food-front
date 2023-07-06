<script lang="ts">
    import type { Product } from '$lib/models/product.ts'
    import Icon from '$lib/components/Icon.svelte'
    import { mdiCircleEditOutline } from '@mdi/js'
    import { mdiDeleteOutline } from '@mdi/js'
    import { page } from '$app/stores'
    import CarteForm from '$lib/components/CarteForm.svelte'
    import type { Category } from '$lib/models/category'
    import { onMount } from 'svelte'
    import { paginate, LightPaginationNav } from 'svelte-paginate'
    import Search from '$lib/components/Search.svelte'
    import { createEventDispatcher } from 'svelte'
    import Modal from '$lib/components/Modal.svelte'
   
    let items: Array<Category | Product> = []
    let currentPage: number = 1
    let pageSize: number = 5
    let paginatedItems: Array<Category | Product> = []
    let searchTerm: string = ''
    let itemToPut = null
    let showModal: boolean = false
    let editItem = {}
    let employes = []
    let employe = {
        firstname: null,
        lastname: null,
        email: null,
        password: 'Test67test' as string,
        roles: [
            { 
                "name": "deliveryman",
                "id": "2"
            }
        ]
    }
    onMount(async () => {
        getEmployer()
    })

    async function getEmployer(){
        const res = await fetch('/api/deliveryMen')
        employes = await res.json()
        console.log(employes, 'employes')
        employes = employes.data.filter(employe => employe.roles[0].name === "deliveryman");
    }
  
    const search = () => {
      let items = employes.filter((item) => {
        let itemTitle = item.email.toLowerCase()
        return itemTitle.includes(searchTerm.toLowerCase())
      })
      paginatedItems = paginate({ items, pageSize, currentPage })
    }
  
    const deleteItem = async (id: Number) => {
        const res = await fetch(`/api/user`, {
            method: 'DELETE',
            body: JSON.stringify(id),
        })
        let response = await res.json()
        getEmployer()
    }

    async function addEmploye(){
        const res = await fetch(`/api/deliveryMen`, {
            method: 'POST',
            body: JSON.stringify(employe),
        })
        let response = await res.json()
        getEmployer()
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
      + Ajouter un/une livreur
    </button>
    <Search bind:searchTerm="{searchTerm}" on:input="{search}" placeholder="Recherche ..." />
  </div>
  <div class="overflow-x-auto flex justify-center">
    <table class="table w-3/4">
      <thead>
        <tr>
          <th>id </th>
          <th>Nom </th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody class="bg-white">
        {#if employes.length > 0}
        {#each employes as employe}
        <tr>
            <th>{employe.id}</th>
            <td>{employe.firstname}</td>
            <th>{employe.email}</th>
            <td class="flex content-row">
              <button>
                <Icon on:click="{() => deleteItem(employe.id)}" clazz="fill-primary" path="{mdiDeleteOutline}" />
              </button>
            </td>
          </tr>
          {/each}
          {/if}
          {#if showModal}
            <Modal>
                <div class="flex content-row flex-col items-center justify-center">
                    <input
                      type="text"
                      placeholder="Prénom"
                      bind:value="{employe.firstname}"
                      class="input text-black m-6  bg-neutral mb-3  w-80 max-w-xs mt-10"
                    />
                    <input
                        type="text"
                        placeholder="Nom"
                        bind:value="{employe.lastname}"
                        class="input text-black m-6  bg-neutral mb-3  w-80 max-w-xs mt-10"
                    />
                    <input
                        type="text"
                        placeholder="Email"
                        bind:value="{employe.email}"
                        class="input text-black m-6  bg-neutral mb-3  w-80 max-w-xs mt-10"
                    />
                </div>
              <div class=" flex content-row justify-center m-6">
                <button on:click="{() => closeModal()}" class="btn btn-error text-white m-2">Annuler</button>
                <button on:click="{() => addEmploye()}"  class="btn btn-success text-white m-2"> Valider</button>
              </div>
            </Modal>
          {/if}
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
  
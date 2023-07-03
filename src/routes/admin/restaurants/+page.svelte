<script lang="ts">
    import AdminTable from '$lib/components/AdminTable.svelte'
    import type { Category } from '$lib/models/category'
    import type { Product } from '$lib/models/product.ts'
    import { onMount } from 'svelte'
    let carteItemName: string = 'categories'
    $: cartefetchItem = [{}] as Array<Category | Product>
    import Alert from '$lib/components/Alert.svelte'
    import { isAuthenticatedAdmin } from '$lib/helpers/guard'
    import { goto } from '$app/navigation'
  
    let messageError: string = ''
    let isMessageError: boolean = false
  
    onMount(async () => {
      isAuthenticatedAdmin() && goto('/app/dashboard')
      getCarteItem(carteItemName)
    })
  
    async function getCarteItem() {
      cartefetchItem = []
      const res = await fetch(`/api/restaurant`)
      let response = await res.json()
      if (response.data) {
        cartefetchItem = response.data
        cartefetchItem.sort((a, b) => b.id - a.id)
      } else {
        cartefetchItem = []
      }
    }
    const deleteItem = async (event) => {
      const res = await fetch(`/api/restaurant`, {
        method: 'DELETE',
        body: JSON.stringify(event.detail.id),
      })
      let response = await res.json()
      if (response.data) {
        isMessageError = true
        messageError = 'Supprimé avec suuccès'
      } else {
        isMessageError = true
        messageError = 'Une erreur est survenue'
      }
      getCarteItem()
    }
  
    const editItem = async (event) => {
      const res = await fetch(`/api/restaurant`, {
        method: 'PUT',
        body: JSON.stringify(event.detail.item),
      })
      let response = await res.json()
      if (response.data) {
        isMessageError = true
        messageError = 'Modifié avec suuccès'
      } else {
        isMessageError = true
        messageError = 'Une erreur est survenue'
      }
      getCarteItem()
    }
  
    const postItem = async (event) => {
      const res = await fetch(`/api/restaurant`, {
        method: 'POST',
        body: JSON.stringify(event.detail.item),
      })
      let response = await res.json()
      if (response.data) {
        isMessageError = true
        messageError = 'Ajouté avec suuccès'
      } else {
        isMessageError = true
        messageError = 'Une erreur est survenue'
      }
      getCarteItem()
    }
  </script>
  
  <Alert isError="{isMessageError}" message="{messageError}" />
  <AdminTable
    on:deleteItem="{deleteItem}"
    on:editItem="{editItem}"
    on:postItem="{postItem}"
    carteItemName="{'restaurants'}"
    cartefetchItem="{cartefetchItem}"
  />
  
  <style>
    .tab.tab-active {
      border-color: #df6562;
      color: #df6562;
    }
  </style>
  
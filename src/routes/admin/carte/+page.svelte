<script lang="ts">
  import AdminTable from '$lib/components/AdminTable.svelte'
  import type { Category } from '$lib/models/category'
  import type { Product } from '$lib/models/product.ts'
  import { onMount } from 'svelte'
  let carteItemName: string = 'categories'
  $: cartefetchItem = [{}] as Array<Category | Product>
  import Alert from '$lib/components/Alert.svelte'

  let messageError: string = ''
  let isMessageError: boolean = false

  onMount(async () => {
    getCarteItem(carteItemName)
  })

  async function getCarteItem(carteItemType: string) {
    cartefetchItem = []
    carteItemName = carteItemType
    const res = await fetch(`/api/${carteItemType}`)
    let response = await res.json()
    if (response.data) {
      cartefetchItem = response.data
      cartefetchItem.sort((a, b) => b.id - a.id)
    } else {
      cartefetchItem = []
    }
  }
  const deleteItem = async (event) => {
    const res = await fetch(`/api/${carteItemName}`, {
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
    getCarteItem(carteItemName)
  }

  const editItem = async (event) => {
    const res = await fetch(`/api/${carteItemName}`, {
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
    getCarteItem(carteItemName)
  }

  const postItem = async (event) => {
    const res = await fetch(`/api/${carteItemName}`, {
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
    getCarteItem(carteItemName)
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
      on:click="{() => getCarteItem('menus')}"
      class="{carteItemName === 'menus'
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
      on:click="{() => getCarteItem('offers')}"
      class="{carteItemName === 'offers'
        ? 'tab-active tab tab-bordered text-xl text-black'
        : 'tab tab-bordered text-xl text-black'}	">Promotions</button
    >
  </div>
</div>
<Alert isError="{isMessageError}" message="{messageError}" />
<AdminTable
  on:deleteItem="{deleteItem}"
  on:editItem="{editItem}"
  on:postItem="{postItem}"
  carteItemName="{carteItemName}"
  cartefetchItem="{cartefetchItem}"
/>

<style>
  .tab.tab-active {
    border-color: #df6562;
    color: #df6562;
  }
</style>

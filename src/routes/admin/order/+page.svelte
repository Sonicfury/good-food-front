<script lang="ts">
  import { onMount } from 'svelte'
  import Alert from '$lib/components/Alert.svelte'
  import Modal from '$lib/components/Modal.svelte'
  import OrderRecap from '$lib/components/OrderRecap.svelte'
  let isLoading = true
  let alertMessage = ''
  let alertLevel: 'error' | 'success' | 'warning' | 'info' = 'error'
  let showAlert = false
  let showModal: boolean = false
  let order = null

  type Basket = { name: string; items: any[] }
  let baskets: Basket[]
  onMount(async () => {
    baskets = [
      {
        name: 'Nouveau',
        items: [],
      },
      {
        name: 'En preparation',
        items: [],
      },
      {
        name: 'Prete',
        items: [],
      },
      {
        name: 'En livraison',
        items: [],
      },
      {
        name: 'Terminee',
        items: [],
      },
    ]

    getOrders()
  })

  async function getOrders() {
    isLoading = true
    const response = await fetch('/api/ordereds')
    const orders = await response.json()
    baskets = baskets.map((basket, idx ) => {
        basket.items = [...orders.data.filter((o) => o.state === `${idx}`)]
        return basket
    })
    isLoading = false
  }

  let hoveringOverBasket
  function dragStart(event, basketIndex, itemIndex) {
    const data = { basketIndex, itemIndex }
    event.dataTransfer.setData('text/plain', JSON.stringify(data))
  }

  async function move(event, basketIndex) {
    event.preventDefault()
    const json = event.dataTransfer.getData('text/plain')
    const data = JSON.parse(json)
    const [item] = baskets[data.basketIndex].items.splice(data.itemIndex, 1)

    baskets[basketIndex].items = [...baskets[basketIndex].items, item]

    hoveringOverBasket = null
    item.state = basketIndex.toString()
    await updateOrder(item)
    await getOrders()
  }
  async function updateOrder(item) {
    item.employee_id = item.employee
    const response = await fetch('/api/orders', {
      method: 'PUT',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {
      alertLevel = 'success'
      alertMessage = response.statusText
      showAlert = true
    } else {
      alertLevel = 'error'
      alertMessage = response.statusText
      showAlert = true
    }
    showModal = false
  }

  function closeModal() {
    showModal = false
  }
</script>

<div class="flex w-full gap-4 my-24 px-8">
  {#if showAlert}
    <Alert level="{alertLevel}" message="{alertMessage}" />
  {/if}
  {#if !isLoading || baskets}
    {#each baskets as basket, basketIndex (basket)}
      <div class="w-1/3">
        <h1 class="text-3xl">{basket.name}</h1>
        <ul
          class="gap-2 p-2 bg-base-200 rounded shadow-inner"
          class:hovering="{hoveringOverBasket === basket.name}"
          on:dragenter="{() => (hoveringOverBasket = basket.name)}"
          on:dragleave="{() => (hoveringOverBasket = null)}"
          on:drop="{(event) => move(event, basketIndex)}"
          ondragover="return false"
        >
          {#each basket.items as item, itemIndex (item)}
            <li
              class="rounded p-2 shadow-lg flex flex-col gap-2 min-w-[16rem]"
              draggable="{true}"
              on:dragstart="{(event) => dragStart(event, basketIndex, itemIndex)}"
              on:click="{() => ((showModal = true), (order = item))}"
            >
              <div class="flex justify-between">
                <h2 class="text-primary font-black text-lg">#{item.id}</h2>
                {#if item.isTakeaway}
                  <div class="badge badge-accent">Emporter</div>
                {:else}
                  <div class="badge badge-primary">Livraison</div>
                {/if}
              </div>
              <div class="flex justify-between">
                <span class="text-secondary">{new Date(item.createdAt).toLocaleString()}</span>
                <span>{item.total} €</span>
              </div>
              <span class="mt-2 flex justify-end font-medium text-lg"
                >{item.customer.lastname} {item.customer.firstname}</span
              >
            </li>
          {/each}
        </ul>
      </div>
    {/each}
    {#if showModal}
      <Modal>
        <OrderRecap order="{order}" />
        <div class=" flex content-row justify-center m-6">
          <button on:click="{() => closeModal()}" class="btn btn-error text-white m-2">Annuler</button>
          <button on:click="{() => updateOrder(order)}" class="btn btn-success text-white m-2"> Valider</button>
        </div>
      </Modal>
    {/if}
    {:else}
      <div class="flex w-full justify-center items-center h-96">
        <span class="loading loading-infinity loading-lg text-primary"></span>
      </div>
  {/if}
</div>

<style>
  .hovering {
    border-color: orange;
  }
  .item {
    display: inline; /* required for flip to work */
  }
  li {
    background-color: rgb(255, 255, 255);
    cursor: pointer;
    width: 100%;
    height: 120px;
  }
  li:hover {
    background: #e7b9a5;
    color: white;
  }
  ul {
    display: flex; /* required for drag & drop to work when .item display is inline */
    height: 100%; /* needed when empty */
    flex-direction: column;
  }
</style>

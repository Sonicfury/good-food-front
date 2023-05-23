<script lang="ts">
	import {flip} from 'svelte/animate';
    import { onMount } from 'svelte';
    import Alert from '$lib/components/Alert.svelte'
    import Modal from '$lib/components/Modal.svelte';
    import OrderRecap from '$lib/components/OrderRecap.svelte';
    let loadOrder = true
    let alertMessage = ''
    let isLoading = false
    let alertLevel: 'error' | 'success' | 'warning' | 'info' = 'error'
	let showAlert = false
    let showModal: boolean = false
    let order = null

	let baskets = [
        {
        "name": "Nouveau",
        "items": []
        },
        {
        "name": "En preparation",
        "items": []
        },
        {
        "name": "Prete",
        "items": []
        },
        {
        "name": "En livraison",
        "items": []
        },
        {
        "name": "Terminee",
        "items": []
        }
    ];

    onMount(async () => {
        getOrders()
    })

    async function getOrders(){
        loadOrder = true
        const response = await fetch('/api/ordereds')
        const orders = await response.json()
        orders.data.forEach(order => {
            const date = new Date(order.createdAt);
            const jour = date.getDate();
            const mois = date.getMonth() + 1; 
            const heure = date.getHours();
            const minute = date.getMinutes();

            order.createdAt = `${jour}/${mois} ${heure}:${minute}`;

            baskets[order.state].items.push(order)
        });
        loadOrder = false
    }
	
	let hoveringOverBasket;
	
	 function dragStart(event, basketIndex, itemIndex) {
		const data = {basketIndex, itemIndex};
   	    event.dataTransfer.setData('text/plain', JSON.stringify(data));
	}
	
	async function drop(event, basketIndex) {
		event.preventDefault();
        const json = event.dataTransfer.getData("text/plain");
		const data = JSON.parse(json);
		const [item] = baskets[data.basketIndex].items.splice(data.itemIndex, 1);
        
		baskets[basketIndex].items.push(item);
		baskets = baskets;
		
		hoveringOverBasket = null;
        item.state = data.itemIndex.toString()
        upadateOrder(item)
       
	}
    async function upadateOrder(item){
        const response = await fetch('/api/orders', {
            method: 'PUT',
            body: JSON.stringify(item),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if(response.status === 200){
            alertLevel = 'success'
            alertMessage = response.statusText
            showAlert = true
        }else{
            alertLevel = 'error'
            alertMessage = response.statusText
            showAlert = true
        }
        showModal = false
        getOrders()
    }

    function closeModal() {
        showModal = false
    }
</script>

<div class="flex w-full p-20">
{#if showAlert}
    <Alert level="{alertLevel}" message="{alertMessage}" />
{/if}
{#if !loadOrder}
{#each baskets as basket, basketIndex (basket)}
  <div animate:flip class="w-1/3" >
    <h1 class="text-3xl">{basket.name}</h1>
    <ul
	  	class:hovering={hoveringOverBasket === basket.name}
	    on:dragenter={() => hoveringOverBasket = basket.name}
        on:dragleave={() => hoveringOverBasket = null}
  		on:drop={event => drop(event, basketIndex)}
  		ondragover="return false"
    >
	    {#each basket.items as item, itemIndex (item)}
			<div class="item" animate:flip>
	      	    <li
	    	        draggable={true}
		  		    on:dragstart={event => dragStart(event, basketIndex, itemIndex)}
                    on:click="{() => (showModal = true, order = item)}"
		    	>
                    {item.createdAt}
                    {#if item.isTakeaway}
                    <div class="badge badge-accent">Emporter</div>
                    {:else}
                    <div class="badge badge-primary">Livraison</div>
                    {/if}
                    <br>
                    {item.total} €
                    <br>
                   <p class="truncate">{item.customer.email}</p> 
                    
	    	    </li>
			</div>
	    {/each}
    </ul>
</div>
  
{/each}
{#if showModal}
<Modal>
    <OrderRecap order={order}/>
    <div class=" flex content-row justify-center m-6">
        <button on:click="{() => closeModal()}" class="btn btn-error text-white m-2">Annuler</button>
        <button on:click="{() => upadateOrder(order)}"  class="btn btn-success text-white m-2"> Valider</button>
      </div>
</Modal>
{/if}
{:else}

    <progress class="progress color-neutral w-6/12 progress-warning"></progress>
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
		display: inline-block;
		margin-right: 10px;
		padding: 10px;
        margin: 10px;
        width: 200px;
        height: 100px;
	}
	li:hover {
		background: #E7B9A5;
		color: white;
	}
    ul {
		border: solid rgb(227, 227, 227) 1px;
		display: flex; /* required for drag & drop to work when .item display is inline */
		height: 100%; /* needed when empty */
		padding: 10px;
        flex-direction: column;
	}
</style>
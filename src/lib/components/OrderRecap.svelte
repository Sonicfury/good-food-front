
<script lang="ts">
    import { onMount } from "svelte"
    export let order
    let employes

    onMount( async()  => {
        const res = await fetch('/api/employe')
        employes = await res.json()
    })
</script>

<div class="p-10 flex flex-row justify-between">
    <div>
        <p>Heure de la commande : {order.createdAt}</p>
        <br>
        <p>Client : {order.customer.email} </p>
        <br>
        {#if order.customer.adresses.length > 0}
        <p>Adresse :{order.customer.adresses[0].name} </p>
        {/if}
    </div>
    {#if order.isTakeaway}
    <div class="badge badge-accent">Emporter</div>
    {:else}
    <div class="badge badge-primary">Livraison</div>
    {/if}
</div>
<div class="p-10 flex flex-row justify-between">
    <div class="w-1/2 ">
        <label class="label">
            <span class="label-text">Status :</span>
          </label>
        <select class="select select-bordered mb-10  w-2/3">
            <option selected={order.state === '0'} value="0">Nouveau</option>
            <option selected={order.state === '1'} value="1">En préparation</option>
            <option selected={order.state === '2'} value="2">Prête</option>
            <option selected={order.state === '3'} value="3">En livraison</option>
            <option selected={order.state === '4'} value="4">Terminée</option>
        </select>
    <br>
    {#if employes}
        <label class="label">
            <span class="label-text">Assigné à :</span>
        </label>
        <select class="select select-bordered mb-10 w-2/3">
            {#each employes.data as employe}
            <option>{employe.email}</option>
            {/each}
        </select>
    {/if}
        <label class="label">
            <span class="label-text">Notes :</span>
          </label>
        <textarea class="textarea textarea-bordered" placeholder="Bio"></textarea>
    </div>
    <br>
    <div>

        Commande : 
        
        {#each order.ordered as orderItem}
            {#if orderItem.product}
                <p class="mt-10"> {orderItem.product.name} {orderItem.product.price} €</p>
                
            {/if}
           
            
        {/each}
        <p class="mt-10 font-bold"> Total: {order.total} </p>
    </div>
</div>
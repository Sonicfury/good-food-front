<script lang="ts">
  import { onMount } from 'svelte'
  let orders = null

  onMount(async () => {
    const res = await fetch(`/api/orders`)
    let response = await res.json()
    if (response.data) {
      orders = response.data
    } else {
    }
  })
</script>

{#if orders}
  {#each orders as order}
    <div class="flex justify-center m-10">
      <div class="card w-120 border-slate-300 border text-neutral-content">
        <div class="card-body p-6 flex-row">
          <div class="">
            <h3 class="card-title text-primary">#{order.id}</h3>
            <h4>{order.createdAt}</h4>
            <p>{order.comment}</p>
          </div>
        </div>
      </div>
    </div>
  {/each}
{/if}

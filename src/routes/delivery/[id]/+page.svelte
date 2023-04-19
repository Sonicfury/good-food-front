<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { RealtimeChannel } from "@supabase/supabase-js";
  import { page } from "$app/stores";
  import { supabase } from "$lib/supabase";
  import { flip } from "svelte/animate";

  let isLoading = false;
  let sub;
  const channel = supabase.channel("orders-changes");
  let ordersToDeliver = [
    { id: 1, status: 3, deliveryman_id: 1, created_at: "2021-08-01 00:00:00", lat: 50.8923, lng: 2.4321 },
    { id: 2, status: 3, deliveryman_id: 1, created_at: "2021-08-01 00:00:00", lat: 50.8923, lng: 2.4321 },
    { id: 3, status: 3, deliveryman_id: 1, created_at: "2021-08-01 00:00:00", lat: 50.8923, lng: 2.4321 },
    { id: 4, status: 3, deliveryman_id: 1, created_at: "2021-08-01 00:00:00", lat: 50.8923, lng: 2.4321 }
  ];

  channel.on(
    "postgres_changes",
    {
      event: "INSERT",
      schema: "public",
      table: "orders",
      filter: `status=eq.3&deliveryman_id=eq.${$page.params.id}`
    },
    (payload) => ordersToDeliver.push(payload.new)
  );

  onMount(() => {
    getOrdersToDeliver();

    sub = channel.subscribe();
  });

  onDestroy(() => {
    if (sub instanceof RealtimeChannel) {
      sub.unsubscribe();
    }
  });

  const getOrdersToDeliver = async () => {
    console.group("getOrdersToDeliver");
    try {
      isLoading = true;
      console.log("fetching orders");

      // fetch orders
    } catch (error) {
      console.log(error);
    } finally {
      isLoading = false;
    }
    console.groupEnd();
  };

  const handleStatusChange = (orderId: number) => {
    console.group("handleStatusChange");
    try {
      isLoading = true;
      console.log(orderId);

      // update order status
      ordersToDeliver = ordersToDeliver.filter((order) => order.id !== orderId);
    } catch (error) {
      console.log(error);
    } finally {
      isLoading = false;
    }
    console.groupEnd();
  };
</script>
<div class="p-8">
  <h1 class="text-3xl">
    Livraisons à effectuer
  </h1>
  {($page.params.id)}


  <div
    class="grid grid-cols-1 py-8 gap-8">
    {#each ordersToDeliver as order (order.id)}
      <div
        animate:flip={{ duration: 300 }}
        class="form-control ">
        <label class="cursor-pointer label w-32 rounded-lg border-neutral">
          <span class="label-text">{order.id}{order.created_at.toString()}</span>
          <input on:change={() => handleStatusChange(order.id)} type="checkbox" checked={order.status !== 3}
                 class="checkbox checkbox-secondary " />
        </label>
      </div>
    {/each}
  </div>
</div>
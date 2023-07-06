<script>
  import { toasts } from '$lib/stores/toasts'
  import ToastNoti from '$lib/components/ToastNoti.svelte'
  import '../app.postcss'
</script>

<slot />
<style>
    .toast {
        z-index: 10000;
    }
</style>
 <div class="toast toast-start lg:toast-end ">
    {#each $toasts as toast, i (toast.id)}
        <ToastNoti {toast} />
    {/each}
</div>

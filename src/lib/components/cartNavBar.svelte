<script lang="ts">
  import { cart } from '$lib/stores/cart'
  import Icon from './Icon.svelte'
  import { mdiChevronRight, mdiCheck } from '@mdi/js'
</script>

{#if $cart}
  <nav
    aria-label="Nav"
    class="fixed bottom-4 transform inline-flex  mx-auto justify-between bg-white w-full bottom-0 h-14 flex items-center p-5 "
  >
    <span class="text-xl"> {$cart.totalPrice ? $cart.totalPrice.toFixed(2) : "0"} €</span>
    <a href="checkout">
      <div class="flex items-center flex-row	">
        Panier
        <Icon path="{mdiChevronRight}" clazz="fill-black" />
      </div>
    </a>
  </nav>
{/if}

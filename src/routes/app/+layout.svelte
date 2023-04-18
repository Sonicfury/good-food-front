<script>
  import './layout.css'
  import BottomNavBar from '$lib/components/BottomNavBar.svelte'
  import CartNavBar from '$lib/components/cartNavBar.svelte'
  import { page } from '$app/stores'
</script>

<slot />

{#if $page.url.pathname.includes('carte')}
  <CartNavBar />
{:else if !$page.url.pathname.includes('checkout')}
  <BottomNavBar />
{/if}

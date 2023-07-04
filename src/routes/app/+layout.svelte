<script>
  import './layout.css'
  import BottomNavBar from '$lib/components/BottomNavBar.svelte'
  import CartNavBar from '$lib/components/cartNavBar.svelte'
  import Footer from '$lib/components/Footer.svelte'
  import { page } from '$app/stores'
</script>

<div class="mb-12">
  <div class="mb-12 min-h-screen">
    <slot />
  </div>
  <Footer />
</div>

{#if $page.url.pathname.includes('carte')}
  <CartNavBar />
{:else if !$page.url.pathname.includes('checkout')}
  <BottomNavBar />
{/if}

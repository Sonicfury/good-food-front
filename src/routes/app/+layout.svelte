<script>
  import './layout.css'
  import BottomNavBar from '$lib/components/BottomNavBar.svelte'
  import { page } from '$app/stores'
</script>

<slot />
{$page.url.pathname}
<BottomNavBar />

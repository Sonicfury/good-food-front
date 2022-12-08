<script>
  import BottomNavBar from '$lib/components/BottomNavBar.svelte'
</script>

<slot />
<BottomNavBar />

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>

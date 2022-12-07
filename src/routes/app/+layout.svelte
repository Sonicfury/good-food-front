<script>
    import BottomNavBar from '../../components/BottomNavBar.svelte';
</script>

<slot />
<BottomNavBar />

<style global lang="postcss">
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
</style>

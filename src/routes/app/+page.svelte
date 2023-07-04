<script lang="ts">
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'
  import { onMount } from 'svelte'

  onMount(async () => {
    if ($page.route.id === '/app') {
      await goto('/app/dashboard')
    }
  })
</script>

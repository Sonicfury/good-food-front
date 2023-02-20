<script lang="ts">
  import { isAuthenticated } from '$lib/helpers/guard'
  import { goto } from '$app/navigation'
  import { onMount } from 'svelte'

  onMount(() => {
    if (isAuthenticated()) {
      goto('/app/dashboard')
    }
    goto('/login')
    return
  })
</script>

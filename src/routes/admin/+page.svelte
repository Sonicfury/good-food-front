<script lang="ts">
  import { isAuthenticatedAdmin } from '$lib/helpers/guard'
  import { goto } from '$app/navigation'
  import { onMount } from 'svelte'

  // onMount(() => {
  //   isAuthenticatedAdmin() && goto('/app/dashboard')
  // })
</script>

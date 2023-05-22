<script lang="ts">
  import { onMount } from 'svelte'
  import { goto } from '$app/navigation'
  import { fade } from 'svelte/transition'

  const timeout = (ms: string) => new Promise((resolve) => setTimeout(resolve, ms))
  onMount(async () => {
    await timeout(1700)
    await goto('/login')
  })
</script>

<div in:fade="{{ duration: 1500 }}" class="w-full h-screen flex justify-center items-center">
  <h1 class="text-2xl text-primary">Good food</h1>
</div>

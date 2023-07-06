<script lang="ts">
  import { page } from '$app/stores'
  import Icon from './Icon.svelte'
  import { mdiChevronLeft, mdiSilverware } from '@mdi/js'

  export let pageName: string
  export let goBack: string
  const showIcons = $page.route.id?.includes('checkout') || $page.route.id?.includes('carte/[slug]')
</script>

<div class="flex flex-row justify-between items-center content-center m-4">
  {#if showIcons}
  <a class="btn btn-circle btn-ghost" href="{goBack}"><Icon clazz="w-6 h-6" path="{mdiChevronLeft}" /></a>
  {/if}
  <div class="flex flex-col p-4 w-full">
    <h1 class="text-2xl text-primary">Good Food</h1>
    <h2 class="text-xl">{pageName}</h2>
  </div>
  <a class="btn btn-circle btn-ghost" href="/app/dashboard"><Icon clazz="w-6 h-6" path="{mdiSilverware}" /> </a>
</div>

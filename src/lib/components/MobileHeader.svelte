<script lang="ts">
  import Icon from './Icon.svelte'
  import { mdiChevronLeft, mdiClose } from '@mdi/js'

  export let pageName: string
  export let goBack: string
</script>

<div class="flex flex-row justify-between content-center m-4">
  <a href="{goBack}"><Icon clazz="w-6 h-6" path="{mdiChevronLeft}" /></a>
  <h1 class=" text-3xl">{pageName}</h1>
  <a href="/app/dashboard"><Icon clazz="w-6 h-6" path="{mdiClose}" /> </a>
</div>

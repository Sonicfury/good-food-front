<script lang="ts">
  import MobileHeader from '$lib/components/MobileHeader.svelte'
  let pageName: string = 'Nom restaurant'
  let urlBack: string = '/restaurants'
  import { onMount } from 'svelte'
  let selectedCategorie
  let categories = [] as Array<object>

  onMount(async () => {
    const res = await fetch('/api/categories')

    let response = await res.json()
    if (response.data) {
      categories = response.data
    } else {
      // isMessageError = true
      // messageError = response.message
      // isSucess = false
    }
  })
</script>

<MobileHeader bind:goBack="{urlBack}" bind:pageName="{pageName}" />
{#if categories.length > 0}
  <div class="flex justify-center mt-10 ">
    <select class="select w-full max-w-xs bg-neutral" bind:value="{selectedCategorie}">
      <option value="Promotions" selected>Promotions</option>
      <option value="Menus" selected>Menus</option>
      {#each categories as category}
        <option value="Catégories" selected>{category.name}</option>
      {/each}
    </select>
  </div>
{/if}

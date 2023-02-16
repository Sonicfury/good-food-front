<script lang="ts">
  import MobileHeader from '../../lib/components/MobileHeader.svelte'
  let pageName: string = 'Nom restaurant'
  let urlBack: string = '/restaurants'
  let selectedCategorie
</script>

<MobileHeader bind:goBack="{urlBack}" bind:pageName="{pageName}" />
<div class="flex justify-center mt-10 ">
  <select class="select w-full max-w-xs bg-neutral" bind:value="{selectedCategorie}">
    <option value="Promotions" selected>Promotions</option>
    <option value="Menus" selected>Menus</option>
    <option value="Catégories" selected>Catégories</option>
  </select>
</div>

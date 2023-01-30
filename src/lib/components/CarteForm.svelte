<script lang="ts">
  import type { Category } from '$lib/models/category'

  export let carteItemName: string
  export let item
</script>

<h3 class="font-bold text-lg m-6">Ajouter ou modifier {carteItemName}</h3>
<div class="flex content-row justify-center">
  <input
    type="text"
    name="Nom"
    placeholder="Nom"
    bind:value="{item.name}"
    class="input text-black m-6  bg-neutral mb-3  w-80 max-w-xs mt-10  "
  />
</div>

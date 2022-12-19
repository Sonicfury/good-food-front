<script lang="ts">
  import Search from './Search.svelte'
  import { CarteItem } from '$lib/enums/carte'
  import CarteForm from './CarteForm.svelte'
  export let carteItemName: CarteItem | string
</script>

<div class=" flex justify-around mt-24 mb-4">
  <label for="my-modal-5" class="btn btn-accent text-white"> + Ajouter {carteItemName} </label>
  <Search searchTerm="" placeholder="{'Recherche ...'}" />

  <CarteForm carteItemName="{carteItemName}" />
</div>

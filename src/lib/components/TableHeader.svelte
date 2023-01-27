<script lang="ts">
  import Search from './Search.svelte'
  import CarteForm from './CarteForm.svelte'
  export let carteItemName: string
</script>

<div class=" flex justify-around mt-24 mb-4">
  <label for="my-modal-5" class="btn btn-accent text-white"> + Ajouter un/une {carteItemName} </label>
  <Search searchTerm="" placeholder="{'Recherche ...'}" />

  <CarteForm carteItemName="{carteItemName}" />
</div>

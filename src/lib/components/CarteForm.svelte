<script lang="ts">
  export let carteItemName: CarteItem | string
</script>

<input type="checkbox" id="my-modal-5" class="modal-toggle" />
<div class="modal bg-white bg-opacity-80">
  <div class="modal-box w-11/12 max-w-5xl">
    <h3 class="font-bold text-lg">Ajouter ou modifier {carteItemName}</h3>
    <div class="flex content-row justify-center">
      <input
        type="text"
        name="email"
        placeholder="Email"
        class="input text-black m-6  bg-neutral mb-3  w-80 max-w-xs mt-10  "
      />
      <select class="select w-full max-w-xs input m-6  bg-neutral mb-3  w-80 max-w-xs mt-10">
        <option disabled selected>Catégorie</option>
        <option>Homer</option>
        <option>Marge</option>
        <option>Bart</option>
        <option>Lisa</option>
        <option>Maggie</option>
      </select>
    </div>
    <div class="flex content-row justify-center">
      <input
        type="text"
        name="email"
        placeholder="Email"
        class="input  bg-neutral mb-3  w-80 max-w-xs mt-10 m-6 input-lg "
      />
      <input type="text" name="email" placeholder="Email" class="input m-6  bg-neutral mb-3  w-80 max-w-xs mt-10  " />
    </div>
    <div class="modal-action flex content-row justify-center">
      <label for="my-modal-5" class="btn btn-error text-white">Annuler</label>
      <label for="my-modal-5" class="btn btn-success text-white"> Valider</label>
    </div>
  </div>
</div>

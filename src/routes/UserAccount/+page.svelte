<script>
  import UpdateProfil from '../components/UpdateProfil.svelte'
</script>

<div class="m-10 d-flex">
  <h1 class="text-6xl text-primary p-4">Mon compte</h1>
  <details class="collapse collapse-arrow  bg-base-100 rounded-box">
    <summary class="collapse-title text-m font-medium">Informations personnelles</summary>
    <UpdateProfil />
  </details>
  <details class="collapse collapse-arrow  bg-base-100 rounded-box">
    <summary class="collapse-title text-m font-medium">Mes adresses</summary>
  </details>
  <details class="collapse collapse-arrow  bg-base-100 rounded-box">
    <summary class="collapse-title text-m font-medium">Mes moyens de paiements</summary>
  </details>
  <details class="collapse collapse-arrow  bg-base-100 rounded-box">
    <summary class="collapse-title text-m font-medium">Mon historique de commandes</summary>
  </details>
  <form class="flex justify-center" method="POST">
    <button type="submit" class="btn mt-10 btn-neutral text-secondary w-64">Se deconnecter</button>
  </form>
</div>

<style>
  summary {
    list-style: none;
  }
</style>

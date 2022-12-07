<script>
    import UpdateProfil from '../components/UpdateProfil.svelte';
</script>

<div class="m-10">
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
</div>

<style>
    summary {
        list-style: none;
    }
</style>

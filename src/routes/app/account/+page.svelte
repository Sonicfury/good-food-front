<script>
  import UpdateProfile from '$lib/components/UpdateProfile.svelte'
  import Adress from '$lib/components/Adress.svelte'
  import OrderHistory from '$lib/components/OrderHistory.svelte'
  import { onMount } from 'svelte'
  let canUpdate = true
  import { session } from '$lib/stores/session'
  import { get } from 'svelte/store'

  onMount(() => {
    const userSession = get(session)
    if (!userSession) {
      window.location.href = '/login'
    }
  })

  function logout() {
    session.update((session) => '')
  }
</script>

<div class="m-10 d-flex">
  <h1 class="text-6xl text-primary p-4">Mon compte</h1>
  <details id="personal-info" class="collapse collapse-arrow  bg-base-100 rounded-box">
    <summary class="collapse-title text-m font-medium">Informations personnelles</summary>
    <UpdateProfile />
  </details>
  <details class="collapse collapse-arrow  bg-base-100 rounded-box">
    <summary class="collapse-title text-m font-medium">Mes adresses</summary>
    <Adress bind:canUpdate="{canUpdate}" />
  </details>
  <details class="collapse collapse-arrow  bg-base-100 rounded-box">
    <summary class="collapse-title text-m font-medium">Mes moyens de paiements</summary>
  </details>
  <details class="collapse collapse-arrow  bg-base-100 rounded-box">
    <summary class="collapse-title text-m font-medium">Mon historique de commandes</summary>
    <OrderHistory />
  </details>
  <form class="flex justify-center" method="POST">
    <button on:click="{logout}" type="submit" class="btn mt-10 btn-neutral text-secondary w-64">Se deconnecter</button>
  </form>
</div>

<style>
  summary {
    list-style: none;
  }
</style>

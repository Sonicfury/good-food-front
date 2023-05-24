<script lang="ts">
  import { page } from '$app/stores'
  import { session } from '$lib/stores/session'

  function logout() {
    session.update((session) => '')
    window.location.href = '/login'
  }
</script>

<div class="navbar bg-white">
  <div class="flex-1">
    <img class="ml-4 object-contain  w-24" alt="good-food-logo" src="/images/Good-Food-logo.png" />
  </div>
  <div class="flex-none">
    <ul class="menu menu-horizontal px-1">
      <li>
        <a class="{$page.route.id === '/admin/order' ? 'text-primary' : ''}" href="/admin/order"
          >Commandes et réservations</a
        >
      </li>
      <li><a class="{$page.route.id === '/admin/carte' ? 'text-primary' : ''}" href="/admin/carte">Ma carte</a></li>
      <li><a class="{$page.route.id === '/admin/kpi' ? 'text-primary' : ''}" href="/admin/kpi">KPI</a></li>
      <li>
        <a class="{$page.route.id === '/admin/delivery' ? 'text-primary' : ''}" href="/admin/delivery">Mes livreurs</a>
      </li>
    </ul>
    <div class="dropdown dropdown-end ml-24 mr-6">
      <label tabindex="0" class="btn btn-ghost btn-circle avatar">
        <div class="w-10 rounded-full">
          <img src="https://placeimg.com/80/80/people" />
        </div>
      </label>
      <ul tabindex="0" class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
        <li>
          <a class="justify-between"> Profile </a>
        </li>
        <li><a on:click="{logout}">Logout</a></li>
      </ul>
    </div>
  </div>
</div>
<slot />

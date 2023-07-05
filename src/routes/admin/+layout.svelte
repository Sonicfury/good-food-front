<script lang="ts">
	import { goto } from '$app/navigation';
  import { page } from '$app/stores'
  import { onMount } from 'svelte'
  import { get } from 'svelte/store'
  import { session } from '$lib/stores/session'
  import { mdiRouter } from '@mdi/js'

  let isEmployee = false
  let restaurants = null
  let selectedRestaurants  = null

  function logout() {
    session.update((session) => '')
    window.location.href = '/login'
  }

  function onChange(){
    window.location.reload()
  }
  

  onMount(async () => {
    const userSession = get(session)
    if (userSession.user.roles[0].name === 'employee') {
      isEmployee = true 
    }
    
    const res = await fetch(`/api/restaurant`)

    let response = await res.json()
    if (response.data) {
      restaurants = response.data
      selectedRestaurants = restaurants[0]
    }
  })

 

 
  
</script>

<div class="navbar bg-white">
  <div class="flex-1">
    <img class="ml-4 object-contain  w-24" alt="good-food-logo" src="/images/Good-Food-logo.png" />
  </div>
  {#if isEmployee }
  <label class="label">
    <span class="label-text">Restaurants  </span>
  </label>
  <select class="select w-full max-w-xs" bind:value="{selectedRestaurants}"  on:change={onChange}>
    {#if restaurants}
      <option value="{selectedRestaurants}" selected>{selectedRestaurants.name}</option>
    {/if}
    {#each restaurants as restaurant}
      <option value="{restaurant}">{restaurant.name}</option>
    {/each}
  </select>
  {/if}
  <div class="flex-none">
    <ul class="menu menu-horizontal px-1">
      {#if !isEmployee}
      <li>
        <a class="{$page.route.id === '/admin/order' ? 'text-primary' : ''}" href="/admin/order"
          >Commandes et réservations</a
        >
      </li>
      <li><a class="{$page.route.id === '/admin/carte' ? 'text-primary' : ''}" href="/admin/restaurants">Restaurants</a></li>
      <li><a class="{$page.route.id === '/admin/carte' ? 'text-primary' : ''}" href="/admin/carte">Ma carte</a></li>
      <li>
        <a class="{$page.route.id === '/admin/delivery' ? 'text-primary' : ''}" href="/admin/delivery">Mes livreurs</a>
      </li>
      {/if}
    </ul>
    <div class="dropdown dropdown-end ml-24 mr-6">
      <label tabindex="0" class="btn btn-ghost btn-circle avatar">
        <div class="w-10 rounded-full">
          <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
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

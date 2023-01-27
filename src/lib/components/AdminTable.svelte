<script lang="ts">
  import Icon from './Icon.svelte'
  import { mdiCircleEditOutline } from '@mdi/js'
  import { mdiDeleteOutline } from '@mdi/js'
  import { page } from '$app/stores'
  import CarteForm from './CarteForm.svelte'
  import type { Category } from '$lib/models/category'
  export let carteItemName: string
  export let cartefetchItem: null | Array<Category>
  const isActive = (path: string) => $page.route.id === path
</script>

<div class="overflow-x-auto flex justify-center">
  <table class="table w-3/4">
    <!-- head -->
    <thead>
      <tr>
        <th>id</th>
        <th>Nom</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody class="bg-white">
      {#each cartefetchItem as carteItem}
        <tr>
          <th>{carteItem.id}</th>
          <td>{carteItem.name}</td>
          <td class="flex content-row">
            <label class="mr-8" for="my-modal-5"
              ><Icon
                path="{mdiCircleEditOutline}"
                clazz="{isActive('/admin/carte') ? 'fill-success' : 'fill-secondary'}"
              /></label
            >
            <button>
              <Icon path="{mdiDeleteOutline}" clazz="{isActive('/admin/carte') ? 'fill-error' : 'fill-secondary'}" />
            </button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
  <CarteForm carteItemName="{carteItemName}" />
</div>

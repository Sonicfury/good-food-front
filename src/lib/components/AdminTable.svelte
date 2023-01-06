<script lang="ts">
  import { CarteItem } from '$lib/enums/carte'
  import Icon from './Icon.svelte'
  import { mdiCircleEditOutline } from '@mdi/js'
  import { mdiDeleteOutline } from '@mdi/js'
  import { page } from '$app/stores'
  import CarteForm from './CarteForm.svelte'
  export let carteItemName: CarteItem | string

  const isActive = (path: string) => $page.route.id === path
</script>

<div class="overflow-x-auto flex justify-center">
  <table class="table w-3/4">
    <!-- head -->
    <thead>
      <tr>
        <th>{carteItemName} Id</th>
        <th>Nom</th>
        <th>Prix</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody class="bg-white">
      <!-- row 1 -->
      <tr>
        <th>1</th>
        <td>Cy Ganderton</td>
        <td>Quality Control Specialist</td>
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
    </tbody>
  </table>
  <CarteForm carteItemName="{carteItemName}" />
</div>

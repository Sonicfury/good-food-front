<script lang="ts">
  import { CarteItem } from '$lib/enums/carte'
  import Icon from './Icon.svelte'
  import { mdiCircleEditOutline } from '@mdi/js'
  import { mdiDeleteOutline } from '@mdi/js'
  import { page } from '$app/stores'

  export let carteItemName: CarteItem | string

  const isActive = (path: string) => $page.route.id === path
</script>

<div class="overflow-x-auto flex justify-center">
  <table class="table w-3/4">
    <!-- head -->
    <thead class="bg-primary">
      <tr>
        <th>{carteItemName} Id</th>
        <th>Nom</th>
        <th>Prix</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <!-- row 1 -->
      <tr>
        <th>1</th>
        <td>Cy Ganderton</td>
        <td>Quality Control Specialist</td>
        <td class="flex content-row">
          <button class="mr-8"
            ><Icon
              path="{mdiCircleEditOutline}"
              clazz="{isActive('/admin/carte') ? 'fill-success' : 'fill-secondary'}"
            /></button
          >
          <button>
            <Icon path="{mdiDeleteOutline}" clazz="{isActive('/admin/carte') ? 'fill-error' : 'fill-secondary'}" />
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</div>

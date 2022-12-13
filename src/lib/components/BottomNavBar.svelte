<script lang="ts">
  import { mdiMapMarkerOutline } from '@mdi/js'
  import { mdiHomeOutline } from '@mdi/js'
  import { mdiAccountOutline } from '@mdi/js'
  import Icon from './Icon.svelte'
  import { page } from '$app/stores'

  const isActive = (path: string) => $page.route.id === path
</script>

<nav aria-label="Nav" class="fixed bottom-4 transform inline-flex  mx-auto justify-between bg-white w-full bottom-0">
  <a
    aria-current="{isActive('/app/dashboard') ? 'page' : 'false'}"
    class="inline-flex flex-col items-center text-primary text-xs font-medium py-3 px-4 text-white flex-grow"
    href="/app/dashboard"
  >
    <Icon path="{mdiHomeOutline}" clazz="{isActive('/app/dashboard') ? 'fill-primary' : 'fill-secondary'}" />
    <span class="sr-only">Home</span>
  </a>

  <a
    aria-current="{isActive('/app/search') ? 'page' : 'false'}"
    class="relative inline-flex flex-col items-center text-xs font-medium text-white py-3 px-6 flex-grow"
    href="/app/search"
  >
    <div class="absolute bottom-5 p-3 rounded-full border-4 border-base-100 bg-accent">
      <Icon path="{mdiMapMarkerOutline}" clazz="fill-white w-10 h-10" />
    </div>
    <span class="sr-only">Location</span>
  </a>
  <a
    aria-current="{isActive('/app/profile') ? 'page' : 'false'}"
    class="inline-flex flex-col items-center text-secondary text-xs font-medium text-blue-400 py-3 px-4 flex-grow"
    href="/app/profile"
  >
    <Icon path="{mdiAccountOutline}" clazz="{isActive('/app/profile') ? 'fill-primary' : 'fill-secondary'}" />
    <span class="sr-only">Profile</span>
  </a>
</nav>

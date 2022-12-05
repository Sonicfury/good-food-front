<script>
    import Icon from 'mdi-svelte';
    import { mdiMapMarkerOutline } from '@mdi/js';
    import { mdiHomeOutline } from '@mdi/js';
    import { mdiAccountOutline } from '@mdi/js';

    let activeColor = '#DF6562';
    let inActiveColor = '#E7B9A5';
</script>

<div class="fixed bottom-4 transform inline-flex  mx-auto justify-between bg-white w-full bottom-0">
    <a
        aria-current="page"
        class="inline-flex flex-col items-center text-xs font-medium py-3 px-4 text-white flex-grow"
        href="#"
    >
        <Icon path="{mdiHomeOutline}" size="1.25" color="{activeColor}" />
        <span class="sr-only">Home</span>
    </a>
    <button class="relative inline-flex flex-col items-center text-xs font-medium text-white py-3 px-6 flex-grow">
        <div class="absolute bottom-5 p-3 rounded-full border-4 border-base-100 bg-accent">
            <Icon path="{mdiMapMarkerOutline}" color="white" size="1.5" />
        </div>
        <span class="sr-only">Location</span>
    </button>
    <a class="inline-flex flex-col items-center text-xs font-medium text-blue-400 py-3 px-4 flex-grow" href="#">
        <Icon path="{mdiAccountOutline}" size="1.25" color="{inActiveColor}" />
        <span class="sr-only">Profile</span>
    </a>
</div>

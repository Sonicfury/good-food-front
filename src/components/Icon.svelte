<script lang="ts">
    export let clazz: string;
    export let path: string;

    // defaults the size to w-8 h-8 if none is specified in clazz
    clazz = 'w-8 h-8 '.concat(clazz);
</script>

<svg class="{clazz}" viewBox="0 0 24 24">
    <path d="{path}"></path>
</svg>

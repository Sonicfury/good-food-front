<script>
  import { onMount } from 'svelte';
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

  let fileInput;

  onMount(() => {
    fileInput.addEventListener('change', () => {
      const file = fileInput.files[0];
      const reader = new FileReader();

      reader.addEventListener('load', readFile);
      reader.readAsText(file);
    });
  });

  function readFile(e){
    dispatch('fileSelected', e.target.result );
  }
</script>

<div class="flex flex-col space-y-2 max-w-xs">
  <input type="file" id="fileInput" bind:this={fileInput} class="py-2 px-3 border rounded-md" accept="image/*" />
</div>

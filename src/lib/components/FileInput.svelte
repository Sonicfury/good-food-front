<script>
    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte'
    const dispatch = createEventDispatcher()
  
    let fileInput;
  
    onMount(() => {
      fileInput.addEventListener('change', () => {
        const reader = new FileReader();
        reader.onload = () => {
          const base64 = reader.result.split(',')[1];
          dispatch('fileSelected', { base64 });
        };
        reader.readAsDataURL(fileInput.files[0]);
      });
    });
  </script>
  
  <div class="flex flex-col space-y-2 max-w-xs">
    <input type="file" id="fileInput" bind:this={fileInput} class="py-2 px-3 border rounded-md" accept="image/*" />
  </div>
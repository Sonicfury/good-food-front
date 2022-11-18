<script lang="ts">
    import { error } from "@sveltejs/kit";

	export let form: any;
	console.log(form, 'form')
</script>

<div class="flex items-center flex-col mt-12">
  <h1 class="text-6xl text-primary">S'inscrire</h1>
  <form method="POST" action="?/login" class="flex items-center flex-col">
	<input
		type="text"
		name="email"
		value={ form?.email  ?? ''}
		placeholder="Email"
		class="input  bg-neutral  w-full max-w-xs m-10 { form?.errors?.email ? "input-error" : ""} "
	/>
	{#if form?.errors?.email}
	<span class="label-text-alt text-error" >{form.errors.email[0]}</span>
	{/if}

	<input
		type="password"
		name="password"
		value={ form?.password  ?? ''}
		placeholder="Mot de passe"
		class="input  bg-neutral  w-full max-w-xs { form?.errors?.password ? "input-error" : ""}"
	/>
	<!-- {#if form.errors.email}
	<span class="label-text-alt text-error" >{form.errors.password[0]}</span>
	{/if} -->
	<button type="submit" class="btn mt-10 btn-primary text-base-100 w-32">Valider</button>
	<a href="/register" class="text-primary mt-5 cursor-pointer">Ou se connecter</a>
  </form>
  <!-- {#if form?.success} -->
  <!-- this message is ephemeral; it exists because the page was rendered in
       response to a form submission. it will vanish if the user reloads -->
  <!-- <p>Successfully logged in! Welcome back, {data.user.name}</p> -->
<!-- {/if} -->
</div>


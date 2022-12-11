<script lang="ts">
  import * as yup from 'yup'
  import { goto } from '$app/navigation'
  import { ObjectSchema } from 'yup'
  import Alert from '$lib/components/Alert.svelte'

  type LoginForm = {
    email: string
    password: string
  }
  type LoginError = LoginForm

  let loginForm = {
    email: '' as string,
    password: '' as string,
  } as LoginForm
  let error = {} as LoginError
  let alertMessage = ''
  let showAlert = false
  let isLoading = false

  const schema: ObjectSchema<LoginForm> = yup.object().shape({
    email: yup.string().required(' Email requis').email('Email invalide'),
    password: yup.string().required('Mot de passe requis'),
  })

  const handleSubmit = async () => {
    error = {} as LoginError

    try {
      await schema.validate(loginForm, { abortEarly: false })
    } catch (err: any) {
      error = err.inner.reduce((acc, err) => {
        return { ...acc, [err.path]: err.message }
      }, {}) as LoginError

      return
    }

    await login()
  }

  const login = async () => {
    showAlert = false
    isLoading = true

    const response: Response = await fetch('api/login', {
      method: 'POST',
      body: JSON.stringify(loginForm),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const userResponse = await response.json()

    if (userResponse.data) {
      await goto('/')

      return
    }

    showAlert = true
    alertMessage = 'Adresse email ou mot de passe incorrect'
    isLoading = false
  }
</script>

<div class="flex items-center flex-col mt-12">
  <h1 class="text-6xl text-primary">Se connecter</h1>
  <form on:submit|preventDefault="{handleSubmit}" class="flex items-center flex-col">
    <input
      type="text"
      name="email"
      bind:value="{loginForm.email}"
      placeholder="Email"
      class="input  bg-neutral mb-3  w-80 max-w-xs mt-10 {error?.email ? 'input-error' : ''} "
    />
    {#if error?.email}
      <span class="label-text-alt text-error">{error?.email}</span>
    {/if}
    <input
      type="password"
      name="password"
      bind:value="{loginForm.password}"
      placeholder="Mot de passe"
      class="input  bg-neutral mb-3  mt-10  w-80 max-w-xs  {error?.password ? 'input-error' : ''}"
    />
    {#if error?.password}
      <span class="label-text-alt text-error ">{error?.password}</span>
    {/if}
    {#if showAlert}
      <Alert level="error" message="{alertMessage}" />
    {/if}
    <button type="submit" class="btn mt-10 btn-primary text-base-100 w-32" class:loading="{isLoading}">
      Valider
    </button>
    <a href="/register" class="text-primary mt-5 cursor-pointer">Où s'inscrire ?</a>
  </form>
</div>

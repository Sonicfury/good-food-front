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
  let errors = {} as LoginError
  let alertMessage = ''
  let showAlert = false
  let isLoading = false

  const schema: ObjectSchema<LoginForm> = yup.object().shape({
    email: yup.string().required(' Email requis').email('Email invalide'),
    password: yup.string().required('Mot de passe requis'),
  })

  const handleSubmit = async () => {
    errors = {} as LoginError

    try {
      await schema.validate(loginForm, { abortEarly: false })
    } catch (err: any) {
      errors = err.inner.reduce((acc, err) => {
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

<div class="flex items-center flex-col mt-12 gap-8">
  <h1 class="text-6xl text-primary">Se connecter</h1>
  <form on:submit|preventDefault="{handleSubmit}" class="flex items-center flex-col gap-8">
    <div class="form-control">
      <label class="label" for="email">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        bind:value="{loginForm.email}"
        placeholder="you@domain.com"
        class="input bg-neutral w-72 max-w-xs"
        class:input-error="{errors?.email}"
      />
      {#if errors?.email}
        <span class="label-text-alt text-error">{errors?.email}</span>
      {/if}
    </div>
    <div class="form-control">
      <label class="label" for="password">Mot de passe</label>
      <input
        type="password"
        id="password"
        name="password"
        bind:value="{loginForm.password}"
        placeholder="Mot de passe"
        class="input bg-neutral w-72 max-w-xs"
        class:input-error="{errors?.password}"
      />

      {#if errors?.password}
        <span class="label-text-alt text-error ">{errors?.password}</span>
      {/if}
    </div>

    {#if showAlert}
      <Alert level="error" message="{alertMessage}" />
    {/if}

    <button type="submit" class="btn mt-10 btn-primary text-base-100 w-32" class:loading="{isLoading}">
      Valider
    </button>
    <a href="/register" class="text-primary mt-5 cursor-pointer">Où s'inscrire ?</a>
  </form>
</div>

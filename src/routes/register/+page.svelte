<script lang="ts">
  import Alert from '$lib/components/Alert.svelte'
  import * as yup from 'yup'
  import { goto } from '$app/navigation'
  import { session } from '../../lib/stores/session'

  type LoginForm = {
    email: string
    password: string
    firstName: string
    lastName: string
  }
  let loginForm = {
    email: '' as string,
    password: '' as string,
    firstName: '' as string,
    lastName: '' as string,
  } as LoginForm

  let alertMessage = ''
  let alertLevel: 'error' | 'success' | 'warning' | 'info' = 'error'
  let showAlert = false

  const schema = yup.object().shape({
    email: yup.string().required(' Email requis').email('Email invalide'),
    password: yup
      .string()
      .required('Mot de passe requis')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        'Doit contenir 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial',
      ),
    firstName: yup.string().required(' Prénom requis'),
    lastName: yup.string().required('Nom requis'),
  })

  let errors = {} as LoginForm

  const handleSubmit = async () => {
    try {
      await schema.validate(loginForm, { abortEarly: false })
      await register()
      errors = {} as LoginForm
    } catch (err: any) {
      errors = err.inner.reduce((acc, err) => {
        return { ...acc, [err.path]: err.message }
      }, {})
    }
  }

  async function register() {
    showAlert = false
    const response = await fetch('api/user', {
      method: 'POST',
      body: JSON.stringify(loginForm),
      headers: {
        'content-type': 'application/json',
      },
    })

    const userInfo = await response.json()

    if (userInfo.data) {
      await goto('/')

      return
    }

    showAlert = true
    alertLevel = 'error'
    alertMessage = userInfo.message
  }
</script>

<div class="flex justify-center">
  <img class="m-4 object-contain  w-24" alt="good-food-logo" src="/images/Good-Food-logo.png" />
</div>
<div class="flex items-center flex-col mt-12">
  <h1 class="text-6xl text-primary">S'inscrire</h1>
  <form on:submit|preventDefault="{handleSubmit}" class="flex items-center flex-col gap-8">
    <div class="form-control">
      <label class="label" for="firstName">Prénom</label>
      <input
        type="text"
        name="firstName"
        id="firstName"
        bind:value="{loginForm.firstName}"
        placeholder="Prénom"
        class="input  bg-neutral w-72 max-w-xs"
        class:input-error="{errors?.firstName}"
      />
      {#if errors?.firstName}
        <span class="label-text-alt text-error ">{errors?.firstName}</span>
      {/if}
    </div>

    <div class="form-control">
      <label class="label" for="lastName">Nom</label>
      <input
        type="text"
        name="lastName"
        id="lastName"
        bind:value="{loginForm.lastName}"
        placeholder="Nom de famille"
        class="input bg-neutral w-72 max-w-xs"
        class:input-error="{errors?.lastName}"
      />
      {#if errors?.lastName}
        <span class="label-text-alt text-error">{errors?.lastName}</span>
      {/if}
    </div>

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
        <span class="label-text-alt text-error w-72">{errors?.password}</span>
      {/if}
    </div>

    {#if showAlert}
      <Alert level="{alertLevel}" message="{alertMessage}" />
    {/if}
    <button type="submit" class="btn btn-primary text-base-100 w-32">Valider</button>
    <a href="/login" class="text-primary mt-5 cursor-pointer">J'ai déjà un compte !</a>
  </form>
</div>

<script lang="ts">
  import Alert from '../../lib/components/Alert.svelte'
  import * as yup from 'yup'
  import { goto } from '$app/navigation'
  import { onMount } from 'svelte'
  import { isAuthenticated } from '../../lib/helpers/guard'
  import { session } from '../../lib/stores/session'

  onMount(() => {
    isAuthenticated() && goto('/app/dashboard')
  })

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

  let messageError = ''
  let isMessageError = false

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
    isMessageError = false
    const response = await fetch('api/user', {
      method: 'POST',
      body: JSON.stringify(loginForm),
      headers: {
        'content-type': 'application/json',
      },
    })
    const userInfo = await response.json()
    if (userInfo.data) {
      session.update((session) => userInfo.data)
      await goto('/')
    } else {
      isMessageError = true
      messageError = userInfo.message
    }
  }
</script>

<div class="flex justify-center">
  <img class="m-4 object-contain  w-24" alt="good-food-logo" src="/images/Good-Food-logo.png" />
</div>
<div class="flex items-center flex-col mt-12">
  <h1 class="text-6xl text-primary">S'inscrire</h1>
  <form on:submit|preventDefault="{handleSubmit}" class="flex items-center flex-col">
    <input
      type="text"
      name="firstName"
      bind:value="{loginForm.firstName}"
      placeholder="Prénom"
      class="input  bg-neutral mb-3  mt-10  w-80 max-w-xs  {errors?.firstName ? 'input-error' : ''}"
    />
    {#if errors?.firstName}
      <span class="label-text-alt text-error ">{errors?.firstName}</span>
    {/if}

    <input
      type="text"
      name="lastName"
      bind:value="{loginForm.lastName}"
      placeholder="Nom de famille"
      class="input  bg-neutral mb-3  mt-10  w-80 max-w-xs  {errors?.lastName ? 'input-error' : ''}"
    />
    {#if errors?.lastName}
      <span class="label-text-alt text-error ">{errors?.lastName}</span>
    {/if}

    <input
      type="text"
      name="email"
      bind:value="{loginForm.email}"
      placeholder="Email"
      class="input  bg-neutral mb-3  w-80 max-w-xs mt-10 {errors?.email ? 'input-error' : ''} "
    />
    {#if errors?.email}
      <span class="label-text-alt text-error">{errors?.email}</span>
    {/if}
    <input
      type="password"
      name="password"
      bind:value="{loginForm.password}"
      placeholder="Mot de passe"
      class="input  bg-neutral mb-3  mt-10  w-80 max-w-xs  {errors?.password ? 'input-error' : ''}"
    />
    {#if errors?.password}
      <span class="label-text-alt text-error w-80">{errors?.password}</span>
    {/if}

    <Alert isError="{isMessageError}" message="{messageError}" />

    <button type="submit" class="btn mt-10 btn-primary text-base-100 w-32">Valider</button>
    <a href="/login" class="text-primary mt-5 cursor-pointer">J'ai déjà un compte !</a>
  </form>
</div>

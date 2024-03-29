<script lang="ts">
  import * as yup from 'yup'
  import { goto } from '$app/navigation'
  import { session } from '$lib/stores/session'
  import { onMount } from 'svelte'
  import { isAuthenticated } from '$lib/helpers/guard'
  import { toasts } from '$lib/stores/toasts'

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
  let messageError = ''
  let isMessageError = false
  let isLoading = false
  let isOrder = false

  const schema: ObjectSchema<LoginForm> = yup.object().shape({
    email: yup.string().required(' Email requis').email('Email invalide'),
    password: yup.string().required('Mot de passe requis'),
  })

  onMount(() => {
    isAuthenticated() && goto('/app/dashboard')
    const urlParams = new URLSearchParams(window.location.search)
    isOrder = urlParams.get('order')
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
    isMessageError = false
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
      if (isOrder) {
        await goto('/app/checkout/adresse')
        session.update((session) => userResponse.data)

        toasts.success(`Bienvenue, ${$session.user.firstname} !`)
      } else {
        session.update((session) => userResponse.data)
        if (userResponse.data.user.roles[0].name === 'admin' || userResponse.data.user.roles[0].name === 'employee') {
          await goto('/admin/order')
        } else {
          await goto('/app/dashboard')
        }
        toasts.success(`Bienvenue, ${$session.user.firstname} !`)

        return
      }
    }

    isMessageError = true
    messageError = 'Adresse email ou mot de passe incorrect'
    isLoading = false
  }
</script>

<div class="flex flex-row ">
  <div class="right-picture"></div>
  <div class="left-content flex items-center flex-col mt-12 w-1/2	">
    <div class="flex justify-center">
      <img class="m-4 object-contain  w-24" alt="good-food-logo" src="/images/Good-Food-logo.png" />
    </div>
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
      {#if isMessageError}
        <div class="alert alert-error shadow-lg">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>{messageError}</span>
          </div>
        </div>
      {/if}
      <button type="submit" class="btn mt-10 btn-primary text-base-100 w-32">
        {#if isLoading}
        <span class="loading loading-spinner text-secondary"></span>
        {/if}
        Valider
      </button>
      <a href="/register" class="text-primary mt-5 cursor-pointer">Où s'inscrire ?</a>
    </form>
  </div>
</div>

<style>
  .right-picture {
    background-image: url('/images/login-picture.jpg');
    width: 50%;
    background-size: cover;
    height: 900px;
  }
  @media (max-width: 1200px) {
    .right-picture {
      display: none;
    }
    .left-content {
      width: 100%;
    }
  }
</style>

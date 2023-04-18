<script lang="ts">
  import { onMount } from 'svelte'
  import type { User } from '../../models/user'
  import Alert from './Alert.svelte'
  import * as yup from 'yup'

  let alertMessage = ''
  let isLoading = false
  let alertLevel: 'error' | 'success' | 'warning' | 'info' = 'error'
  let showAlert = false
  let user = {} as User
  let errors = {} as User

  onMount(async () => {
    isLoading = true
    const res = await fetch(`/api/user`)
    let response = await res.json()
    if (response.data) {
      user = response.data
    } else {
      alertLevel = 'error'
      alertMessage = response.message
      showAlert = true
    }

    isLoading = false
  })

  const schema = yup.object().shape({
    email: yup.string().required(' Email requis').email('Email invalide'),
    firstname: yup.string().required(' Prénom requis'),
    lastname: yup.string().required('Nom requis'),
  })

  const handleSubmit = async () => {
    try {
      await schema.validate(user, { abortEarly: false })
      await updateUser()
      errors = {} as User
    } catch (err) {
      errors = err.inner.reduce((acc, err) => {
        return { ...acc, [err.path]: err.message }
      }, {})
    }
  }

  async function updateUser() {
    showAlert = false
    isLoading = true

    const response = await fetch('api/user', {
      method: 'PUT',
      body: JSON.stringify(user),
      headers: {
        'content-type': 'application/json',
      },
    })

    const userInfo = await response.json()

    if (userInfo.data) {
      user = userInfo.data
      showAlert = true
      alertLevel = 'success'
      alertMessage = 'Informations modifiées avec succès'
    } else {
      showAlert = true
      alertMessage = userInfo.message
      alertLevel = 'error'
    }

    isLoading = false
  }
</script>

<div class="flex items-center flex-col">
  {#if showAlert}
    <Alert level="{alertLevel}" message="{alertMessage}" />
  {/if}
  <form on:submit|preventDefault="{handleSubmit}" class="flex items-center flex-col gap-8">
    <div class="form-control">
      <label class="label" for="firstname">Prénom</label>
      <input
        type="text"
        id="firstname"
        name="firstname"
        bind:value="{user.firstname}"
        placeholder="Prénom"
        class="input bg-neutral w-72 max-w-xs"
        class:input-error="{errors?.firstname}"
      />
      {#if errors?.firstname}
        <span class="label-text-alt text-error ">{errors?.firstname}</span>
      {/if}
    </div>

    <div class="form-control">
      <label class="label" for="lastname">Nom</label>
      <input
        type="text"
        id="lastname"
        name="lastname"
        bind:value="{user.lastname}"
        placeholder="Mot de passe"
        class="input  bg-neutral w-72 max-w-xs"
        class:input-error="{errors?.lastname}"
      />
      {#if errors?.lastname}
        <span class="label-text-alt text-error ">{errors?.lastname}</span>
      {/if}
    </div>

    <div class="form-control">
      <label class="label" for="email">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        bind:value="{user.email}"
        placeholder="you@domain.com"
        class="input bg-neutral w-72 max-w-xs"
        class:input-error="{errors?.email}"
      />
      {#if errors?.email}
        <span class="label-text-alt text-error">{errors?.email}</span>
      {/if}
    </div>

    <button type="submit" class="btn btn-primary text-base-100 w-32" class:loading="{isLoading}">Modifier</button>
  </form>
</div>

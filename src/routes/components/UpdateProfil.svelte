<script lang="ts">
    import { onMount } from 'svelte';
    import type { User } from '../../models/user';
    import Alert from './Alert.svelte';
    import * as yup from 'yup';

    let messageError = 'test' as string;
    let isMessageError = false as boolean;
    let isSucess = false as boolean;
    let user = {} as User;
    let errors = {} as User;

    onMount(async () => {
        const res = await fetch(`api/user`);
        let response = await res.json();
        if (response.data) {
            user = response.data;
        } else {
            isMessageError = true;
            messageError = response.message;
            isSucess = false;
        }
    });

    const schema = yup.object().shape({
        email: yup.string().required(' Email requis').email('Email invalide'),
        firstname: yup.string().required(' Prénom requis'),
        lastname: yup.string().required('Nom requis'),
    });

    const handleSubmit = async () => {
        try {
            await schema.validate(user, { abortEarly: false });
            await updateUser();
            errors = {} as User;
        } catch (err) {
            errors = err.inner.reduce((acc, err) => {
                return { ...acc, [err.path]: err.message };
            }, {});
        }
    };

    async function updateUser() {
        isMessageError = false;
        const response = await fetch('api/user', {
            method: 'PUT',
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json',
            },
        });
        const userInfo = await response.json();
        if (userInfo.data) {
            user = userInfo.data;
            isMessageError = true;
            messageError = 'Informations modifié avec succés';
            isSucess = true;
        } else {
            isMessageError = true;
            messageError = userInfo.message;
            isSucess = false;
        }
    }
</script>

<div class="flex items-center flex-col">
    <Alert isSucess="{isSucess}" isError="{isMessageError}" message="{messageError}" />
    <form on:submit|preventDefault="{handleSubmit}" class="flex items-center flex-col">
        <input
            type="text"
            name="firstname"
            bind:value="{user.firstname}"
            placeholder="Prénom"
            class="input  bg-neutral mb-3  mt-10  w-72 max-w-xs  {errors?.firstname ? 'input-error' : ''}"
        />
        {#if errors?.firstname}
            <span class="label-text-alt text-error ">{errors?.firstname}</span>
        {/if}

        <input
            type="text"
            name="lastname"
            bind:value="{user.lastname}"
            placeholder="Mot de passe"
            class="input  bg-neutral mb-3  mt-10  w-72 max-w-xs  {errors?.lastname ? 'input-error' : ''}"
        />
        {#if errors?.lastname}
            <span class="label-text-alt text-error ">{errors?.lastname}</span>
        {/if}

        <input
            type="text"
            name="email"
            bind:value="{user.email}"
            placeholder="Email"
            class="input  bg-neutral mb-3 w-72 max-w-xs mt-10 {errors?.email ? 'input-error' : ''} "
        />
        {#if errors?.email}
            <span class="label-text-alt text-error">{errors?.email}</span>
        {/if}

        <button type="submit" class="btn mt-10 btn-primary text-base-100 w-32">Modifier</button>
    </form>
</div>

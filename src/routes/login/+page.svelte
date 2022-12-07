<script lang="ts">
    import * as yup from 'yup';
    import { goto } from '$app/navigation';

    type LoginForm = {
        email: string;
        password: string;
    };

    type LoginError = LoginForm;

    let loginForm = {
        email: '' as string,
        password: '' as string,
    } as LoginForm;

    const schema = yup.object().shape({
        email: yup.string().required(' Email requis').email('Email invalide'),
        password: yup.string().required('Mot de passe requis'),
    });

    let error = {} as LoginError;

    let messageError = '';
    let isMessageError = false;

    const handleSubmit = async () => {
        try {
            schema.validate(loginForm, { abortEarly: false });
            error = {} as LoginError;
        } catch (err: any) {
            error = err.inner.reduce((acc, err) => {
                return { ...acc, [err.path]: err.message };
            }, {}) as LoginError;
        }

        await login();
    };

    async function login() {
        isMessageError = false;

        const response = await fetch('api/login', {
            method: 'POST',
            body: JSON.stringify(loginForm),
            headers: {
                'content-type': 'application/json',
            },
        });

        const userInfo = await response.json();

        if (userInfo.data) {
            await goto('/');
        } else {
            isMessageError = true;
            messageError = 'Adresse email ou mot de passe incorrect';
        }
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
        {#if isMessageError}
            <div class="alert alert-error shadow-lg">
                <div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="stroke-current flex-shrink-0 h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        ><path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg
                    >
                    <span>{messageError}</span>
                </div>
            </div>
        {/if}
        <button type="submit" class="btn mt-10 btn-primary text-base-100 w-32">Valider</button>
        <a href="/register" class="text-primary mt-5 cursor-pointer">Où s'inscrire ?</a>
    </form>
</div>

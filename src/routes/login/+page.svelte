<script lang="ts">
    import * as yup from 'yup';

    type LoginForm = {
        email: string;
        password: string;
    };
    let loginForm = {
        email: '' as string,
        password: '' as string,
    } as LoginForm;

    const schema = yup.object().shape({
        email: yup.string().required(' Email requis').email('Email invalide'),
        password: yup.string().required('Mot de passe requis'),
    });

    let errors = {} as LoginForm;

    const handleSubmit = async () => {
        try {
            await schema.validate(loginForm, { abortEarly: false });
            await login();
            errors = {} as LoginForm;
        } catch (err) {
            errors = err.inner.reduce((acc, err) => {
                return { ...acc, [err.path]: err.message };
            }, {});
        }
    };

    async function login() {
        try {
            const request = await fetch('api/login', {
                method: 'POST',
                body: JSON.stringify(loginForm),
                headers: {
                    'content-type': 'application/json',
                },
            });
        } catch (err) {}
    }
</script>

<div class="flex items-center flex-col mt-12">
    <h1 class="text-6xl text-primary">S'inscrire</h1>
    <form on:submit|preventDefault="{handleSubmit}" class="flex items-center flex-col">
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
            <span class="label-text-alt text-error ">{errors?.password}</span>
        {/if}

        <button type="submit" class="btn mt-10 btn-primary text-base-100 w-32">Valider</button>
        <a href="/register" class="text-primary mt-5 cursor-pointer">Ou se connecter</a>
    </form>
</div>

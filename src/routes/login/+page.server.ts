import type {  Actions } from './$types';
import { z } from 'zod'

const loginSchema = z.object({
    email: z.string({ required_error:  "Email requis"}).email({ message: "Email invalid"}),
    password: z.string({ required_error:  "Mot de passe requis"}).min(2, { message: "Mot de passe requis"})
})

 
export const actions: Actions = {
  login: async ({ request }) => {
    const formData = Object.fromEntries(await request.formData());

    try{
      const loginData = loginSchema.parse(formData)
      const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'content-type': 'application/json'
        }
      });
      return await response.json();
    }catch (err) {
      console.log(err, 'err')
			const { fieldErrors: errors } = err.flatten();
			const { password, passwordConfirm, ...rest } = formData;
			return {
				data: rest,
				errors
			};
    }
 
  },
};
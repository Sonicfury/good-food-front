// @ts-nocheck
import type {  Actions } from './$types';
import { z } from 'zod'

const loginSchema = z.object({
    email: z.string({ required_error:  "Email requis"}).email({ message: "Email invalid"}),
    password: z.string({ required_error:  "Mot de passe requis"})
})

 
export const actions = {
  login: async ({ cookies, request }: import('./$types').RequestEvent) => {
    const formData = Object.fromEntries(await request.formData());

    try{
        const result = loginSchema.parse(formData)
        console.log(result, 'success')
    }catch(error: any){
        const { fieldErrors: errors } = error.flatten()
        const { password, ...rest} = formData
        return{ 
            data: rest,
            errors
        }
    }
 
  },
};;null as any as Actions;
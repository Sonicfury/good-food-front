// @ts-nocheck
import { redirect } from '@sveltejs/kit'
import type { Actions } from './$types'

export const actions = {
  default({ cookies }) {
    cookies.delete('token')
    cookies.delete('user')

    throw redirect(302, '/login')
  },
}
;null as any as Actions;
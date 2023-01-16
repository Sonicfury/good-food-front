import { redirect } from '@sveltejs/kit'
import type { Actions } from './$types'
import type { LayoutServerLoad } from './$types'

export const actions: Actions = {
  default({ cookies }) {
    cookies.delete('token')
    cookies.delete('user')

    throw redirect(302, '/login')
  },
}

export const load = (({ cookies }) => {
  if (cookies.get('token', '/')) {
    throw redirect(307, '/')
  }
}) satisfies LayoutServerLoad

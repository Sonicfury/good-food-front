import type { RequestHandler } from './$types'

export const GET: RequestHandler = async ({ cookies, params }) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/products/${params.slug}`, {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${cookies.get('session')}`,
        Accept: 'application/json',
      },
    })
    const requestBody = await response.json()
    if (requestBody.success) {
      return new Response(JSON.stringify({ data: requestBody.data }), { status: 200 })
    } else {
      return new Response(JSON.stringify({ message: 'Une erreur est survenue' }), { status: 500 })
    }
  }
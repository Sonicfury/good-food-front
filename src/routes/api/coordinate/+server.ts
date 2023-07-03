import type { RequestHandler } from './$types'

export const POST: RequestHandler = async ({ cookies, request }) => {
  const data = await request.json()
  const response = await fetch(`${import.meta.env.VITE_ADRESSE_API_URL}` + data.replace(/ /g, '+'))
  const requestBody = await response.json()
  if (requestBody) {
    return new Response(JSON.stringify({ data: requestBody.features }), { status: 200 })
  } else {
    return new Response(JSON.stringify({ message: 'Une erreur est survenue' }), { status: 500 })
  }
}

import type { RequestHandler } from './$types'

export const POST: RequestHandler = async ({ cookies, request }) => {
  const userId = cookies.get('userId')
  const data = await request.json()
  console.log(data, 'data')
  console.log(`${import.meta.env.VITE_API_URL}` + '/users/' + userId + '/addresses', 'url')
  const response = await fetch(`${import.meta.env.VITE_ADRESSE_API_URL}` + '/users/' + userId + '/addresses', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${cookies.get('session')}`,
      Accept: 'application/json',
    },
  })
  const requestBody = await response.json()

  if (requestBody) {
    return new Response(JSON.stringify({ data: requestBody.features }), { status: 200 })
  } else {
    return new Response(JSON.stringify({ message: 'Une erreur est survenue' }), { status: 500 })
  }
}

// export const GET: RequestHandler = async ({ cookies, request }) => {
//   const data = await request.json()
//   const response = await fetch(`${import.meta.env.VITE_API_URL}`)
//   const requestBody = await response.json()
//   if (requestBody) {
//     return new Response(JSON.stringify({ data: requestBody.features }), { status: 200 })
//   } else {
//     return new Response(JSON.stringify({ message: 'Une erreur est survenue' }), { status: 500 })
//   }
// }

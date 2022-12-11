import type { RequestHandler } from './$types'
import type { User } from '$lib/models/user'

export const POST: RequestHandler = async ({ cookies, request }) => {
  const data = await request.json()
  const response = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
    },
  })
  const requestBody = await response.json()
  if (requestBody.success) {
    cookies.set('token', requestBody.data.token, {path: '/'})
    cookies.set('user', JSON.stringify(requestBody.data.user), {path: '/'})
    return new Response(JSON.stringify({ data: requestBody.data }), { status: 200 })
  } else if (requestBody.message === 'Validation Error.') {
    return new Response(JSON.stringify({ message: 'Un compte avec cet email est déjà enregistré' }), {
      status: 500,
    })
  } else {
    return new Response(JSON.stringify({ message: 'Une erreur est survenue' }), { status: 500 })
  }
}

export const GET: RequestHandler = async ({ cookies }) => {
  const user = JSON.parse(cookies.get('user') ?? '') as User
  const response = await fetch(`${import.meta.env.VITE_API_URL}/users/` + user.id, {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${cookies.get('token')}`,
    },
  })
  const requestBody = await response.json()
  if (requestBody.success) {
    return new Response(JSON.stringify({ data: requestBody.data }), { status: 200 })
  } else {
    return new Response(JSON.stringify({ message: 'Une erreur est survenue' }), { status: 500 })
  }
}

export const PUT: RequestHandler = async ({ cookies, request }): Promise<Response> => {
  const user = JSON.parse(cookies.get('user') ?? '') as User
  const data = await request.json()
  const response = await fetch(`${import.meta.env.VITE_API_URL}/users/` + user.id, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${cookies.get('token')}`,
    },
  })
  const requestBody = await response.json()

  if (requestBody.success) {
    return new Response(JSON.stringify({ data: requestBody.data }), { status: 200 })
  } else {
    return new Response(JSON.stringify({ message: 'Une erreur est survenue' }), { status: 500 })
  }
}

import type { RequestHandler } from './$types'

export const GET: RequestHandler = async ({ cookies, url }) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/restaurants` + url.search, {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${cookies.get('session')}`,
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
  const data = await request.json()
  const restaurantId = data.id
  const response = await fetch(`${import.meta.env.VITE_API_URL}/restaurants/` + restaurantId, {
    method: 'PUT',
    body: JSON.stringify(data),
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

export const DELETE: RequestHandler = async ({ cookies, request }): Promise<Response> => {
  const id = await request.json()
  const response = await fetch(`${import.meta.env.VITE_API_URL}/restaurants/` + id, {
    method: 'DELETE',
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

export const POST: RequestHandler = async ({ cookies, request }) => {
  const data = await request.json()
  const response = await fetch(`${import.meta.env.VITE_API_URL}/restaurants`, {
    method: 'POST',
    body: JSON.stringify(data),
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

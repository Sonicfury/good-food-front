import type { RequestHandler } from './$types'
import type { User } from '$lib/models/user'

export const POST: RequestHandler = async ({ cookies, request }) => {
  const data = await request.json()
  const response = await fetch(`${import.meta.env.VITE_API_URL}/menus`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${cookies.get('session')}`,
      Accept: 'application/json',
    },
  })

  const requestBody = await response.json()
  const productMenus = await fetch(
    `${import.meta.env.VITE_API_URL}/menus/${requestBody.data.id}/products/${data.products.id}`,
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${cookies.get('session')}`,
        Accept: 'application/json',
      },
    },
  )
  if (requestBody.success) {
    return new Response(JSON.stringify({ data: requestBody.data }), { status: 200 })
  } else {
    return new Response(JSON.stringify({ message: 'Une erreur est survenue' }), { status: 500 })
  }
}

export const GET: RequestHandler = async ({ cookies }) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/menus/`, {
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

export const PUT: RequestHandler = async ({ cookies, request }): Promise<Response> => {
  const data = await request.json()
  const categoryId = data.id
  const response = await fetch(`${import.meta.env.VITE_API_URL}/menus/` + categoryId, {
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
  const response = await fetch(`${import.meta.env.VITE_API_URL}/menus/` + id, {
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

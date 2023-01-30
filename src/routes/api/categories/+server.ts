import type { RequestHandler } from './$types'
import type { User } from '$lib/models/user'

export const POST: RequestHandler = async ({ cookies, request }) => {

  const data = await request.json()
  const response = await fetch(`${import.meta.env.VITE_API_URL}/categories`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${cookies.get('session')}`,
      'Accept': 'application/json'
    },
  })
  const requestBody = await response.json()
  if (requestBody.success) {
    return new Response(JSON.stringify({ data: requestBody.data }), { status: 200 })
  } else {
    return new Response(JSON.stringify({ message: 'Une erreur est survenue' }), { status: 500 })
  }
}

export const GET: RequestHandler = async ({ cookies }) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/categories/`, {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${cookies.get('session')}`,
      'Accept': 'application/json'
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
  const response = await fetch(`${import.meta.env.VITE_API_URL}/categories/` + categoryId, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${cookies.get('session')}`,
      'Accept': 'application/json'
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
  const response = await fetch(`${import.meta.env.VITE_API_URL}/categories/` + id, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${cookies.get('session')}`,
      'Accept': 'application/json'
    },
  })
  const requestBody = await response.json()

  if (requestBody.success) {
    return new Response(JSON.stringify({ data: requestBody.data }), { status: 200 })
  } else {
    return new Response(JSON.stringify({ message: 'Une erreur est survenue' }), { status: 500 })
  }
}
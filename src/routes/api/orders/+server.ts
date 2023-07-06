import type { RequestHandler } from './$types'
import type { User } from '$lib/models/user'

export const POST: RequestHandler = async ({ cookies, request }) => {
  const data = await request.json()
  data.customer_id = cookies.get('userId')
  data.employee_id = '1'
  data.addresses_id = '1'
  const response = await fetch(`${import.meta.env.VITE_API_URL}/orders`, {
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

export const GET: RequestHandler = async ({ cookies }) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/orders/ ` + cookies.get('userId') + '/ordereds', {
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
  const orderId = data.id
  const response = await fetch(`${import.meta.env.VITE_API_URL}/orders/` + orderId, {
    method: 'PATCH',
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

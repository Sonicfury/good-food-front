import type { RequestHandler } from './$types'
import type { User } from '$lib/models/user'

export const POST: RequestHandler = async ({ cookies, request }) => {
  const data = await request.json()
  const product = {
    name: data.name,
    price: data.price,
    category_id: data.category.id,
  }
  const response = await fetch(`${import.meta.env.VITE_API_URL}/products`, {
    method: 'POST',
    body: JSON.stringify(product),
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${cookies.get('session')}`,
      Accept: 'application/json',
    },
  })
  const requestBody = await response.json()
  // const images = {
  //   id: requestBody.data.id,
  //   model: 'product',
  //   image: data.image,
  // }
  // const formData = new FormData()
  // formData.append('id', images.id)
  // formData.append('model', images.model)
  // formData.append('image', images.image)
  // formData.append('_method', 'PUT')
  // const image = await fetch(`${import.meta.env.VITE_API_URL}/medias`, {
  //   method: 'POST',
  //   body: formData,
  //   headers: {
  //     'content-type': 'multipart/form-data',
  //     Authorization: `Bearer ${cookies.get('session')}`,
  //     Accept: 'application/json',
  //   },
  // })
  if (requestBody.success) {
    return new Response(JSON.stringify({ data: requestBody.data }), { status: 200 })
  } else {
    return new Response(JSON.stringify({ message: 'Une erreur est survenue' }), { status: 500 })
  }
}

export const GET: RequestHandler = async ({ cookies }) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/products/`, {
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
  const product = {
    name: data.name,
    price: data.price,
    category_id: data.category.id,
  }
  const response = await fetch(`${import.meta.env.VITE_API_URL}/products/` + categoryId, {
    method: 'PUT',
    body: JSON.stringify(product),
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
  const response = await fetch(`${import.meta.env.VITE_API_URL}/products/` + id, {
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

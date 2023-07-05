export const GET: RequestHandler = async ({ cookies }) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/users/`, {
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
  const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${cookies.get('session')}`,
    },
  })
  const requestBody = await response.json()
  if (requestBody.success) {
    return new Response(JSON.stringify({ data: requestBody.data }), { status: 200 })
  } else if (requestBody.message === 'Validation Error.') {
    return new Response(JSON.stringify({ message: 'Un compte avec cet email est déjà enregistré' }), {
      status: 500,
    })
  } else {
    return new Response(JSON.stringify({ message: 'Une erreur est survenue' }), { status: 500 })
  }
}

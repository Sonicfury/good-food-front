const POST = async ({ cookies, request }) => {
  const data = await request.json();
  const response = await fetch(`${{ "BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true }.VITE_API_URL}/login`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json"
    }
  });
  const requestBody = await response.json();
  if (requestBody.success) {
    cookies.set("session", requestBody.data.token);
    return new Response(JSON.stringify({ data: requestBody.data }), { status: 200 });
  } else {
    return new Response(JSON.stringify({ error: requestBody.data.error }), { status: 500 });
  }
};
export {
  POST
};

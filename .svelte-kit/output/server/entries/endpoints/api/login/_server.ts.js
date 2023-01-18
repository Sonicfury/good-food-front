const POST = async ({ cookies, request }) => {
  const data = await request.json();
  const response = await fetch(`${"https://good-food-back.fly.dev/api"}/login`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json"
    }
  });
  const requestBody = await response.json();
  if (requestBody.success) {
    cookies.set("token", requestBody.data.token, { path: "/" });
    cookies.set("user", JSON.stringify(requestBody.data.user), { path: "/" });
    return new Response(JSON.stringify({ data: requestBody.data }), { status: 200 });
  } else {
    return new Response(JSON.stringify({ error: requestBody.data.error }), { status: 500 });
  }
};
export {
  POST
};

const POST = async ({ cookies, request }) => {
  const data = await request.json();
  const response = await fetch(`${"https://good-food-back.fly.dev/api"}/register`, {
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
  } else if (requestBody.message === "Validation Error.") {
    return new Response(JSON.stringify({ message: "Un compte avec cet email est d\xE9j\xE0 enregistr\xE9" }), {
      status: 500
    });
  } else {
    return new Response(JSON.stringify({ message: "Une erreur est survenue" }), { status: 500 });
  }
};
const GET = async ({ cookies }) => {
  const user = JSON.parse(cookies.get("user") ?? "");
  const response = await fetch(`${"https://good-food-back.fly.dev/api"}/users/` + user.id, {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${cookies.get("token")}`
    }
  });
  const requestBody = await response.json();
  if (requestBody.success) {
    return new Response(JSON.stringify({ data: requestBody.data }), { status: 200 });
  } else {
    return new Response(JSON.stringify({ message: "Une erreur est survenue" }), { status: 500 });
  }
};
const PUT = async ({ cookies, request }) => {
  const user = JSON.parse(cookies.get("user") ?? "");
  const data = await request.json();
  const response = await fetch(`${"https://good-food-back.fly.dev/api"}/users/` + user.id, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${cookies.get("token")}`
    }
  });
  const requestBody = await response.json();
  if (requestBody.success) {
    return new Response(JSON.stringify({ data: requestBody.data }), { status: 200 });
  } else {
    return new Response(JSON.stringify({ message: "Une erreur est survenue" }), { status: 500 });
  }
};
export {
  GET,
  POST,
  PUT
};

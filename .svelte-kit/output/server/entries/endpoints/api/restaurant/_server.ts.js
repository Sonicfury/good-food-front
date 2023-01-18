const GET = async ({ cookies, url }) => {
  console.log(url.search, "url.search");
  const response = await fetch(`${"https://good-food-back.fly.dev/api"}/restaurants` + url.search, {
    headers: {
      "content-type": "application/json",
      "Authorization": `Bearer ${cookies.get("session")}`
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
  GET
};

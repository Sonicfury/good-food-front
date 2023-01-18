const POST = async ({ cookies, request }) => {
  const data = await request.json();
  const response = await fetch(`${"https://api-adresse.data.gouv.fr/search/?q="}` + data.replace(/ /g, "+"));
  const requestBody = await response.json();
  if (requestBody) {
    return new Response(JSON.stringify({ data: requestBody.features }), { status: 200 });
  } else {
    return new Response(JSON.stringify({ message: "Une erreur est survenue" }), { status: 500 });
  }
};
const GET = async ({ cookies, request }) => {
  await request.json();
  const response = await fetch(`${"https://good-food-back.fly.dev/api"}`);
  const requestBody = await response.json();
  if (requestBody) {
    return new Response(JSON.stringify({ data: requestBody.features }), { status: 200 });
  } else {
    return new Response(JSON.stringify({ message: "Une erreur est survenue" }), { status: 500 });
  }
};
export {
  GET,
  POST
};

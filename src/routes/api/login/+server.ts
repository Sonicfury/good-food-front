import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
 
export const POST: RequestHandler = async ({ request }) => {
    console.log("je passe", request)
  const test = await request.json();
  return json(test);
}
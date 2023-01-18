import { r as redirect } from "../../../chunks/index2.js";
const load = ({ cookies }) => {
  if (cookies.get("token", "/")) {
    throw redirect(307, "/");
  }
};
export {
  load
};

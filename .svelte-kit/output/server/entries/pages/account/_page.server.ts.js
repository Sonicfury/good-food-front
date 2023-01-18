import { r as redirect } from "../../../chunks/index2.js";
const actions = {
  default({ cookies }) {
    cookies.delete("token");
    cookies.delete("user");
    throw redirect(302, "/login");
  }
};
const load = ({ cookies }) => {
  if (cookies.get("token", "/")) {
    throw redirect(307, "/");
  }
};
export {
  actions,
  load
};

import { c as create_ssr_component, d as add_attribute, e as escape } from "../../../chunks/index.js";
import * as yup from "yup";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let loginForm = { email: "", password: "" };
  let errors = {};
  yup.object().shape({
    email: yup.string().required(" Email requis").email("Email invalide"),
    password: yup.string().required("Mot de passe requis")
  });
  return `<div class="${"flex items-center flex-col mt-12 gap-8"}"><h1 class="${"text-6xl text-primary"}">Se connecter</h1>
  <form class="${"flex items-center flex-col gap-8"}"><div class="${"form-control"}"><label class="${"label"}" for="${"email"}">Email</label>
      <input type="${"email"}" id="${"email"}" name="${"email"}" placeholder="${"you@domain.com"}" class="${["input bg-neutral w-72 max-w-xs", (errors == null ? void 0 : errors.email) ? "input-error" : ""].join(" ").trim()}"${add_attribute("value", loginForm.email, 0)}>
      ${(errors == null ? void 0 : errors.email) ? `<span class="${"label-text-alt text-error"}">${escape(errors == null ? void 0 : errors.email)}</span>` : ``}</div>
    <div class="${"form-control"}"><label class="${"label"}" for="${"password"}">Mot de passe</label>
      <input type="${"password"}" id="${"password"}" name="${"password"}" placeholder="${"Mot de passe"}" class="${["input bg-neutral w-72 max-w-xs", (errors == null ? void 0 : errors.password) ? "input-error" : ""].join(" ").trim()}"${add_attribute("value", loginForm.password, 0)}>

      ${(errors == null ? void 0 : errors.password) ? `<span class="${"label-text-alt text-error "}">${escape(errors == null ? void 0 : errors.password)}</span>` : ``}</div>

    ${``}

    <button type="${"submit"}" class="${["btn mt-10 btn-primary text-base-100 w-32", ""].join(" ").trim()}">Valider
    </button>
    <a href="${"/register"}" class="${"text-primary mt-5 cursor-pointer"}">O\xF9 s&#39;inscrire ?</a></form></div>`;
});
export {
  Page as default
};

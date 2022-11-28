import { c as create_ssr_component, e as escape, d as add_attribute } from "../../../chunks/index.js";
import * as yup from "yup";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let loginForm = { email: "", password: "" };
  yup.object().shape({
    email: yup.string().required(" Email requis").email("Email invalide"),
    password: yup.string().required("Mot de passe requis")
  });
  let errors = {};
  return `<div class="${"flex items-center flex-col mt-12"}"><h1 class="${"text-6xl text-primary"}">Se connecter</h1>
    <form class="${"flex items-center flex-col"}"><input type="${"text"}" name="${"email"}" placeholder="${"Email"}" class="${"input bg-neutral mb-3 w-80 max-w-xs mt-10 " + escape((errors == null ? void 0 : errors.email) ? "input-error" : "", true)}"${add_attribute("value", loginForm.email, 0)}>
        ${(errors == null ? void 0 : errors.email) ? `<span class="${"label-text-alt text-error"}">${escape(errors == null ? void 0 : errors.email)}</span>` : ``}
        <input type="${"password"}" name="${"password"}" placeholder="${"Mot de passe"}" class="${"input bg-neutral mb-3 mt-10 w-80 max-w-xs " + escape((errors == null ? void 0 : errors.password) ? "input-error" : "", true)}"${add_attribute("value", loginForm.password, 0)}>
        ${(errors == null ? void 0 : errors.password) ? `<span class="${"label-text-alt text-error "}">${escape(errors == null ? void 0 : errors.password)}</span>` : ``}
        ${``}
        <button type="${"submit"}" class="${"btn mt-10 btn-primary text-base-100 w-32"}">Valider</button>
        <a href="${"/register"}" class="${"text-primary mt-5 cursor-pointer"}">O\xF9 s&#39;inscrire ?</a></form></div>`;
});
export {
  Page as default
};

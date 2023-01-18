import { c as create_ssr_component, d as add_attribute, e as escape } from "../../../chunks/index.js";
import * as yup from "yup";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let loginForm = {
    email: "",
    password: "",
    firstName: "",
    lastName: ""
  };
  yup.object().shape({
    email: yup.string().required(" Email requis").email("Email invalide"),
    password: yup.string().required("Mot de passe requis").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, "Doit contenir 8 caract\xE8res, une majuscule, une minuscule, un chiffre et un caract\xE8re sp\xE9cial"),
    firstName: yup.string().required(" Pr\xE9nom requis"),
    lastName: yup.string().required("Nom requis")
  });
  let errors = {};
  return `<div class="${"flex items-center flex-col mt-12 gap-8"}"><h1 class="${"text-6xl text-primary"}">S&#39;inscrire</h1>
  <form class="${"flex items-center flex-col gap-8"}"><div class="${"form-control"}"><label class="${"label"}" for="${"firstName"}">Pr\xE9nom</label>
      <input type="${"text"}" name="${"firstName"}" id="${"firstName"}" placeholder="${"Pr\xE9nom"}" class="${["input bg-neutral w-72 max-w-xs", (errors == null ? void 0 : errors.firstName) ? "input-error" : ""].join(" ").trim()}"${add_attribute("value", loginForm.firstName, 0)}>
      ${(errors == null ? void 0 : errors.firstName) ? `<span class="${"label-text-alt text-error "}">${escape(errors == null ? void 0 : errors.firstName)}</span>` : ``}</div>

    <div class="${"form-control"}"><label class="${"label"}" for="${"lastName"}">Nom</label>
      <input type="${"text"}" name="${"lastName"}" id="${"lastName"}" placeholder="${"Nom de famille"}" class="${["input bg-neutral w-72 max-w-xs", (errors == null ? void 0 : errors.lastName) ? "input-error" : ""].join(" ").trim()}"${add_attribute("value", loginForm.lastName, 0)}>
      ${(errors == null ? void 0 : errors.lastName) ? `<span class="${"label-text-alt text-error"}">${escape(errors == null ? void 0 : errors.lastName)}</span>` : ``}</div>

    <div class="${"form-control"}"><label class="${"label"}" for="${"email"}">Email</label>
      <input type="${"email"}" id="${"email"}" name="${"email"}" placeholder="${"you@domain.com"}" class="${["input bg-neutral w-72 max-w-xs", (errors == null ? void 0 : errors.email) ? "input-error" : ""].join(" ").trim()}"${add_attribute("value", loginForm.email, 0)}>
      ${(errors == null ? void 0 : errors.email) ? `<span class="${"label-text-alt text-error"}">${escape(errors == null ? void 0 : errors.email)}</span>` : ``}</div>

    <div class="${"form-control"}"><label class="${"label"}" for="${"password"}">Mot de passe</label>
      <input type="${"password"}" id="${"password"}" name="${"password"}" placeholder="${"Mot de passe"}" class="${["input bg-neutral w-72 max-w-xs", (errors == null ? void 0 : errors.password) ? "input-error" : ""].join(" ").trim()}"${add_attribute("value", loginForm.password, 0)}>
      ${(errors == null ? void 0 : errors.password) ? `<span class="${"label-text-alt text-error w-72"}">${escape(errors == null ? void 0 : errors.password)}</span>` : ``}</div>

    ${``}
    <button type="${"submit"}" class="${"btn btn-primary text-base-100 w-32"}">Valider</button>
    <a href="${"/login"}" class="${"text-primary mt-5 cursor-pointer"}">J&#39;ai d\xE9j\xE0 un compte !</a></form></div>`;
});
export {
  Page as default
};

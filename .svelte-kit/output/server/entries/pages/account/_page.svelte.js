import { c as create_ssr_component, d as add_attribute, e as escape, v as validate_component } from "../../../chunks/index.js";
import * as yup from "yup";
const UpdateProfile = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let user = {};
  let errors = {};
  yup.object().shape({
    email: yup.string().required(" Email requis").email("Email invalide"),
    firstname: yup.string().required(" Pr\xE9nom requis"),
    lastname: yup.string().required("Nom requis")
  });
  return `<div class="${"flex items-center flex-col"}">${``}
  <form class="${"flex items-center flex-col gap-8"}"><div class="${"form-control"}"><label class="${"label"}" for="${"firstname"}">Pr\xE9nom</label>
      <input type="${"text"}" id="${"firstname"}" name="${"firstname"}" placeholder="${"Pr\xE9nom"}" class="${["input bg-neutral w-72 max-w-xs", (errors == null ? void 0 : errors.firstname) ? "input-error" : ""].join(" ").trim()}"${add_attribute("value", user.firstname, 0)}>
      ${(errors == null ? void 0 : errors.firstname) ? `<span class="${"label-text-alt text-error "}">${escape(errors == null ? void 0 : errors.firstname)}</span>` : ``}</div>

    <div class="${"form-control"}"><label class="${"label"}" for="${"lastname"}">Nom</label>
      <input type="${"text"}" id="${"lastname"}" name="${"lastname"}" placeholder="${"Mot de passe"}" class="${["input bg-neutral w-72 max-w-xs", (errors == null ? void 0 : errors.lastname) ? "input-error" : ""].join(" ").trim()}"${add_attribute("value", user.lastname, 0)}>
      ${(errors == null ? void 0 : errors.lastname) ? `<span class="${"label-text-alt text-error "}">${escape(errors == null ? void 0 : errors.lastname)}</span>` : ``}</div>

    <div class="${"form-control"}"><label class="${"label"}" for="${"email"}">Email</label>
      <input type="${"email"}" id="${"email"}" name="${"email"}" placeholder="${"you@domain.com"}" class="${["input bg-neutral w-72 max-w-xs", (errors == null ? void 0 : errors.email) ? "input-error" : ""].join(" ").trim()}"${add_attribute("value", user.email, 0)}>
      ${(errors == null ? void 0 : errors.email) ? `<span class="${"label-text-alt text-error"}">${escape(errors == null ? void 0 : errors.email)}</span>` : ``}</div>

    <button type="${"submit"}" class="${["btn btn-primary text-base-100 w-32", ""].join(" ").trim()}">Modifier</button></form></div>`;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "summary.svelte-1j11za4{list-style:none}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<div class="${"m-10 d-flex"}"><h1 class="${"text-6xl text-primary p-4"}">Mon compte</h1>
  <details id="${"personal-info"}" class="${"collapse collapse-arrow bg-base-100 rounded-box"}"><summary class="${"collapse-title text-m font-medium svelte-1j11za4"}">Informations personnelles</summary>
    ${validate_component(UpdateProfile, "UpdateProfile").$$render($$result, {}, {}, {})}</details>
  <details class="${"collapse collapse-arrow bg-base-100 rounded-box"}"><summary class="${"collapse-title text-m font-medium svelte-1j11za4"}">Mes adresses</summary></details>
  <details class="${"collapse collapse-arrow bg-base-100 rounded-box"}"><summary class="${"collapse-title text-m font-medium svelte-1j11za4"}">Mes moyens de paiements</summary></details>
  <details class="${"collapse collapse-arrow bg-base-100 rounded-box"}"><summary class="${"collapse-title text-m font-medium svelte-1j11za4"}">Mon historique de commandes</summary></details>
  <form class="${"flex justify-center"}" method="${"POST"}"><button type="${"submit"}" class="${"btn mt-10 btn-neutral text-secondary w-64"}">Se deconnecter</button></form>
</div>`;
});
export {
  Page as default
};

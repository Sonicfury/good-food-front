import { c as create_ssr_component } from "../../chunks/index.js";
const app = "";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="${"flex justify-center"}"><img class="${"m-4 object-contain w-24"}" alt="${"good-food-logo"}" src="${"/images/Good-Food-logo.png"}"></div>
${slots.default ? slots.default({}) : ``}`;
});
export {
  Layout as default
};

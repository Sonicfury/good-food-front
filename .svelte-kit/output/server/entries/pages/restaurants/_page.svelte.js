import { c as create_ssr_component, d as add_attribute, v as validate_component } from "../../../chunks/index.js";
const Search_svelte_svelte_type_style_lang = "";
const css = {
  code: ".search-btn.svelte-yz33dg{border-radius:0px 30px 30px 0px}.search-icon.svelte-yz33dg{border-radius:30px 0px 0px 30px}",
  map: null
};
const Search = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { searchTerm } = $$props;
  if ($$props.searchTerm === void 0 && $$bindings.searchTerm && searchTerm !== void 0)
    $$bindings.searchTerm(searchTerm);
  $$result.css.add(css);
  return `<div class="${"flex justify-center"}"><svg aria-hidden="${"true"}" focusable="${"false"}" data-prefix="${"fas"}" data-icon="${"search"}" class="${"btn search-icon hover-neutral svelte-yz33dg"}" role="${"img"}" xmlns="${"http://www.w3.org/2000/svg"}" viewBox="${"0 0 512 512"}" width="${"50px"}" height="${"50px"}"><path class="${"w-4"}" fill="${"#334155"}" d="${"M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"}"></path></svg>
  <input type="${"text"}" placeholder="${"Adresse, ville ..."}" class="${"input w-80 max-w-xs bg-neutral search-btn placeholder-info svelte-yz33dg"}"${add_attribute("value", searchTerm, 0)}>
</div>`;
});
const LeafletMap_svelte_svelte_type_style_lang = "";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let searchTerm = "";
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `<div class="${"dropdown flex justify-center dropdown-open"}">${validate_component(Search, "Search").$$render(
      $$result,
      { searchTerm },
      {
        searchTerm: ($$value) => {
          searchTerm = $$value;
          $$settled = false;
        }
      },
      {}
    )}
  ${``}</div>
${``}
`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};

export const load = ({ fetch, params, url }) => {
  const fetchProduct = async (id: String) => {
    const isMenus = url.searchParams.get('menus')
    console.log(isMenus, '')

    if (isMenus === 'true') {
      const res = await fetch(`/api/menus/${id}`)
      const data = await res.json()
      return data.data
    } else {
      const res = await fetch(`/api/products/${id}`)
      const data = await res.json()
      return data.data
    }
  }

  return {
    product: fetchProduct(params.slug),
  }
}

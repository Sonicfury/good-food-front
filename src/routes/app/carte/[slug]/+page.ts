export const load = ({ fetch, params}) => {
  
    const fetchProduct = async (id: String) => {
      const res = await fetch(`/api/products/${id}`)
      const data = await res.json()
      return data.data
    }
  
    return {
      product: fetchProduct(params.slug)
    }
  
  }
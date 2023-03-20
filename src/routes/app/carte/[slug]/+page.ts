export const load = ({ fetch, params}) => {
  
    const fetchProduct = async (id: String) => {
      const res = await fetch(`/api/products/${id}`)
      const data = await res.json()
      console.log(data, 't')
      return data.data
    }
  
    return {
      product: fetchProduct(params.slug)
    }
  
  }
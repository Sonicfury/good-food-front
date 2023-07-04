export type Cart = {
  items: [
    {
      id: string
      name: string
      price: number
      quantity: number
    },
  ]
  totalPrice: number
  isTakeaway: boolean
  restaurentId: string
  restaurantName: string
}

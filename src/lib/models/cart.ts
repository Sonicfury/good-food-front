export type CartItem = {
        id: string
        name: string
        price: number
        quantity: number
    }
export type Cart = {
    items: CartItem[]
    totalPrice: number
    isTakeaway: boolean
    restaurentId: string
    restaurantName: string
}


export type Cart = {
    items: [{
        id: string,
        name: string,
        price: number,
        quantity: number
    }]
    totalPrice: number
}

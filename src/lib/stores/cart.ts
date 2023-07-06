import type { Cart } from '../models/cart'
import type { Writable } from 'svelte/store'
import { writable } from 'svelte/store'
import { browser } from '$app/environment'

let localCart 
const defaultCart = {
    items: [],
    totalPrice: 0,
    isTakeaway: false,
    restaurentId: '',
    restaurantName: '',
} 

// ensures localStorage exists
if (browser) {
  localCart = window.localStorage.getItem('cart') 
}

// if a session exists in localStorage, inits the store with it
export const cart: Writable<Cart> = writable(localCart ? JSON.parse(localCart) : defaultCart)

// Updates localStorage on store update
if (browser) {
  cart.subscribe((cart) => {
      cart.totalPrice = cart.items.reduce((acc, curr) => acc + (Number(curr.price) * Number(curr.quantity)), 0)
      window.localStorage.setItem('cart', JSON.stringify(cart))
  })
}

import type { Cart } from '../models/cart'
import type { Writable } from 'svelte/store'
import { writable } from 'svelte/store'
import { browser } from '$app/environment'

let localCart

// ensures localStorage exists
if (browser) {
  localCart = window.localStorage.getItem('cart')
}

// if a session exists in localStorage, inits the store with it
export const cart: Writable<Cart> = writable(localCart ? JSON.parse(localCart) : null)

// Updates localStorage on store update
if (browser) {
  cart.subscribe((cart) => window.localStorage.setItem('cart', JSON.stringify(cart)))
}

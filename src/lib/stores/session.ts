import type { Session } from '../models/session'
import type { Writable } from 'svelte/store'
import { writable } from 'svelte/store'
import { browser } from '$app/environment'

let localSession

// ensures localStorage exists
if (browser) {
  localSession = window.localStorage.getItem('session')
}

// if a session exists in localStorage, inits the store with it
export const session: Writable<Session> = writable(localSession ? JSON.parse(localSession) : null)

// Updates localStorage on store update
if (browser) {
  session.subscribe((session) => window.localStorage.setItem('session', JSON.stringify(session)))
}

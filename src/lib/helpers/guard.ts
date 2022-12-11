import { get } from 'svelte/store'
import { session } from '../stores/session'

export const isAuthenticated = () => !!get(session)

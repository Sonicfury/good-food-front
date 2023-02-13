import { get } from 'svelte/store'
import { session } from '../stores/session'

export const isAuthenticated = () => !!get(session)

export const isAuthenticatedAdmin = () => {
    const userSession = get(session)
    if(userSession.user.roles[0].name !== 'customer'){
        return false
    }
    return true    
}


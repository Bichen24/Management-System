import { TOKEN_TIMEOUT, TOKEN_TIMESTAP } from '@/constant'
import { getItem, removeItem, setItem } from './storage'
export const getTokenTimestap = () => {
    return getItem(TOKEN_TIMESTAP)
}
export const setTokenTimestap = () => {
    setItem(TOKEN_TIMESTAP, Date.now())
}

export const reomveTokenTimestap = () => {
    removeItem(TOKEN_TIMESTAP)
}

export const getTokenOut = () => {
    return Date.now() - getTokenTimestap() > TOKEN_TIMEOUT
}

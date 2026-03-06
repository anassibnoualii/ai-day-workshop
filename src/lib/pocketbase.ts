import PocketBase from 'pocketbase'

export const PB_URL = import.meta.env.VITE_PB_URL || 'http://127.0.0.1:8090'
console.log('PB_URL', PB_URL)

const pb = new PocketBase(PB_URL)

export default pb

import { useState, useCallback } from 'react'
import pb from '../lib/pocketbase'

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(pb.authStore.isValid)
  const [error, setError] = useState('')

  const login = useCallback(async (email: string, password: string) => {
    try {
      setError('')
      await pb.collection('_superusers').authWithPassword(email, password)
      setIsAuthenticated(true)
    } catch {
      setError('Invalid credentials')
      setIsAuthenticated(false)
    }
  }, [])

  const logout = useCallback(() => {
    pb.authStore.clear()
    setIsAuthenticated(false)
  }, [])

  return { isAuthenticated, login, logout, error }
}

import { useState, useCallback } from 'react'
import * as authService from '../services/authService'

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated())
  const [error, setError] = useState('')

  const login = useCallback(async (email: string, password: string) => {
    try {
      setError('')
      await authService.login(email, password)
      setIsAuthenticated(true)
    } catch {
      setError('Invalid credentials')
      setIsAuthenticated(false)
    }
  }, [])

  const logout = useCallback(() => {
    authService.logout()
    setIsAuthenticated(false)
  }, [])

  return { isAuthenticated, login, logout, error }
}

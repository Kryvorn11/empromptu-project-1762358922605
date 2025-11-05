import React, { createContext, useContext, useState, useEffect } from 'react'
import { apiCall } from '../utils/api'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    initializeAuth()
  }, [])

  const initializeAuth = async () => {
    try {
      // Check for existing session
      const savedUser = localStorage.getItem('mindeease_user')
      if (savedUser) {
        const userData = JSON.parse(savedUser)
        setUser(userData)
      }
    } catch (error) {
      console.error('Auth initialization error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email, password) => {
    try {
      // Check if user exists in database
      const query = `
        SELECT id, username, email, profile_data, calm_level, total_points 
        FROM newschema_79bfc72e90c740979d0bdbefe1997145.users 
        WHERE email = $1 AND password_hash = $2
      `
      
      const response = await apiCall('/api_tools/templates/call_postgres', {
        query,
        params: [email, password] // In production, use proper password hashing
      })

      if (response.data && response.data.length > 0) {
        const userData = response.data[0]
        setUser(userData)
        localStorage.setItem('mindeease_user', JSON.stringify(userData))
        return { success: true, user: userData }
      } else {
        return { success: false, error: 'Invalid credentials' }
      }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, error: 'Login failed' }
    }
  }

  const signup = async (username, email, password) => {
    try {
      // Create new user
      const query = `
        INSERT INTO newschema_79bfc72e90c740979d0bdbefe1997145.users 
        (username, email, password_hash, profile_data, calm_level, total_points)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id, username, email, profile_data, calm_level, total_points
      `
      
      const profileData = JSON.stringify({
        joinDate: new Date().toISOString(),
        avatar: null,
        bio: '',
        moodQuote: 'Starting my mindfulness journey 🌱'
      })

      const response = await apiCall('/api_tools/templates/call_postgres', {
        query,
        params: [username, email, password, profileData, 1, 0]
      })

      if (response.data && response.data.length > 0) {
        const userData = response.data[0]
        setUser(userData)
        localStorage.setItem('mindeease_user', JSON.stringify(userData))
        return { success: true, user: userData }
      } else {
        return { success: false, error: 'Signup failed' }
      }
    } catch (error) {
      console.error('Signup error:', error)
      return { success: false, error: 'Signup failed' }
    }
  }

  const loginAsGuest = () => {
    const guestUser = {
      id: 'guest',
      username: 'Guest User',
      email: 'guest@mindeease.com',
      profile_data: JSON.stringify({
        joinDate: new Date().toISOString(),
        avatar: null,
        bio: 'Exploring MindEase as a guest',
        moodQuote: 'Taking it one breath at a time 🌸'
      }),
      calm_level: 1,
      total_points: 0,
      isGuest: true
    }
    
    setUser(guestUser)
    localStorage.setItem('mindeease_user', JSON.stringify(guestUser))
    return { success: true, user: guestUser }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('mindeease_user')
  }

  const value = {
    user,
    isLoading,
    login,
    signup,
    loginAsGuest,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

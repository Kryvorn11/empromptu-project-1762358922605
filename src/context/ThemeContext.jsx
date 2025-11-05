import React, { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const savedTheme = localStorage.getItem('mindeease_theme') || 'light'
    setTheme(savedTheme)
    updateTheme(savedTheme)
  }, [])

  const updateTheme = (newTheme) => {
    // Remove all theme classes first
    document.documentElement.classList.remove('dark', 'zen-pastel')
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
      // Reset zen variables when switching away from zen
      document.documentElement.style.removeProperty('--zen-bg')
      document.documentElement.style.removeProperty('--zen-card')
      document.documentElement.style.removeProperty('--zen-text')
      document.documentElement.style.removeProperty('--zen-accent')
    } else if (newTheme === 'zen') {
      document.documentElement.classList.add('zen-pastel')
      // Apply enhanced zen pastel styles with better contrast and visibility
      document.documentElement.style.setProperty('--zen-bg', 'linear-gradient(135deg, #f0fdf4, #ecfdf5, #f0f9ff, #faf5ff)')
      document.documentElement.style.setProperty('--zen-card', 'rgba(255, 255, 255, 0.85)')
      document.documentElement.style.setProperty('--zen-text', '#1f2937')
      document.documentElement.style.setProperty('--zen-accent', '#10b981')
      document.documentElement.style.setProperty('--zen-secondary', '#06b6d4')
      document.documentElement.style.setProperty('--zen-tertiary', '#8b5cf6')
    } else {
      // Reset to default light theme
      document.documentElement.style.removeProperty('--zen-bg')
      document.documentElement.style.removeProperty('--zen-card')
      document.documentElement.style.removeProperty('--zen-text')
      document.documentElement.style.removeProperty('--zen-accent')
      document.documentElement.style.removeProperty('--zen-secondary')
      document.documentElement.style.removeProperty('--zen-tertiary')
    }
  }

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : theme === 'dark' ? 'zen' : 'light'
    setTheme(newTheme)
    localStorage.setItem('mindeease_theme', newTheme)
    updateTheme(newTheme)
  }

  const setSpecificTheme = (newTheme) => {
    setTheme(newTheme)
    localStorage.setItem('mindeease_theme', newTheme)
    updateTheme(newTheme)
  }

  const value = {
    theme,
    toggleTheme,
    setSpecificTheme
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Toaster } from 'react-hot-toast'

// Components
import SplashScreen from './components/SplashScreen'
import LoginScreen from './components/LoginScreen'
import OnboardingFlow from './components/OnboardingFlow'
import Dashboard from './components/Dashboard'
import MeditationHub from './components/MeditationHub'
import ChatBot from './components/ChatBot'
import Community from './components/Community'
import Settings from './components/Settings'
import Navigation from './components/Navigation'

// Context
import { AuthProvider, useAuth } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import { UserProvider } from './context/UserContext'

function AppContent() {
  const { user, isLoading } = useAuth()
  const [showSplash, setShowSplash] = useState(true)
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (user) {
      // Check if user has completed onboarding
      const onboardingComplete = localStorage.getItem(`onboarding_${user.id}`)
      setHasCompletedOnboarding(!!onboardingComplete)
    }
  }, [user])

  if (isLoading || showSplash) {
    return <SplashScreen />
  }

  if (!user) {
    return <LoginScreen />
  }

  if (!hasCompletedOnboarding) {
    return <OnboardingFlow onComplete={() => setHasCompletedOnboarding(true)} />
  }

  return (
    <div className="min-h-screen pb-20">
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/meditate" element={<MeditationHub />} />
          <Route path="/chat" element={<ChatBot />} />
          <Route path="/community" element={<Community />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Navigation />
      </Router>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <UserProvider>
          <div className="App">
            <AppContent />
            <Toaster 
              position="top-center"
              toastOptions={{
                duration: 3000,
                style: {
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '16px',
                  color: '#374151',
                },
              }}
            />
          </div>
        </UserProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App

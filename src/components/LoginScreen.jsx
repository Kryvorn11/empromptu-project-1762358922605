import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Lock, User, Eye, EyeOff, Leaf } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

const LoginScreen = () => {
  const { login, signup, loginAsGuest } = useAuth()
  const [isSignup, setIsSignup] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      let result
      if (isSignup) {
        result = await signup(formData.username, formData.email, formData.password)
      } else {
        result = await login(formData.email, formData.password)
      }

      if (result.success) {
        toast.success(`Welcome ${isSignup ? 'to' : 'back to'} MindEase! 🌱`)
      } else {
        toast.error(result.error || 'Authentication failed')
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGuestLogin = () => {
    const result = loginAsGuest()
    if (result.success) {
      toast.success('Welcome to MindEase! 🌸')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-mint-50 via-sky-50 to-lavender-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4 overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-20"
            style={{
              width: `${100 + Math.random() * 200}px`,
              height: `${100 + Math.random() * 200}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `linear-gradient(45deg, ${
                ['#a7f3d0', '#bae6fd', '#e9d5ff', '#faf2e1'][Math.floor(Math.random() * 4)]
              }, transparent)`,
            }}
            animate={{
              x: [0, 30, 0],
              y: [0, -30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="glass-card p-8 w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-mint-400 to-sky-400 rounded-full flex items-center justify-center"
          >
            <Leaf className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold gradient-text mb-2">MindEase</h1>
          <p className="text-gray-600 dark:text-gray-300">
            {isSignup ? 'Begin your wellness journey' : 'Welcome back to calm'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {isSignup && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="relative"
            >
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Your name"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full pl-12 pr-4 py-3 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-mint-400 transition-all"
                required
              />
            </motion.div>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              placeholder="Email address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full pl-12 pr-4 py-3 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-mint-400 transition-all"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full pl-12 pr-12 py-3 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-mint-400 transition-all"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-gradient-to-r from-mint-500 to-sky-500 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
          >
            {isLoading ? 'Please wait...' : (isSignup ? 'Create Account' : 'Sign In')}
          </motion.button>
        </form>

        <div className="mt-6 space-y-4">
          <div className="text-center">
            <button
              onClick={() => setIsSignup(!isSignup)}
              className="text-mint-600 dark:text-mint-400 hover:underline transition-colors"
            >
              {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
            </button>
          </div>

          {!isSignup && (
            <div className="text-center">
              <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                Forgot password?
              </button>
            </div>
          )}

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white/70 dark:bg-gray-800/70 text-gray-500">or</span>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGuestLogin}
            className="w-full py-3 bg-white/70 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-2xl font-semibold hover:bg-white/90 dark:hover:bg-gray-800/90 transition-all"
          >
            Continue as Guest
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}

export default LoginScreen

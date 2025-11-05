import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  User, 
  Palette, 
  Bell, 
  Info, 
  LogOut, 
  Sun, 
  Moon, 
  Smartphone,
  Shield,
  Award,
  Edit3,
  Phone,
  Heart,
  Check
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import toast from 'react-hot-toast'

const Settings = () => {
  const { user, logout } = useAuth()
  const { theme, setSpecificTheme } = useTheme()
  const [activeSection, setActiveSection] = useState('profile')
  const [notifications, setNotifications] = useState({
    meditation: true,
    mood: true,
    quotes: false,
    sleep: true
  })
  const [privacy, setPrivacy] = useState({
    anonymous: true,
    encryption: true
  })

  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully')
  }

  const toggleNotification = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
    toast.success(`${key} notifications ${notifications[key] ? 'disabled' : 'enabled'}`)
  }

  const togglePrivacy = (key) => {
    setPrivacy(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
    toast.success(`${key} ${privacy[key] ? 'disabled' : 'enabled'}`)
  }

  const sections = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'appearance', name: 'Theme', icon: Palette },
    { id: 'notifications', name: 'Alerts', icon: Bell },
    { id: 'privacy', name: 'Safety', icon: Shield },
    { id: 'about', name: 'About', icon: Info }
  ]

  const renderProfileSection = () => (
    <div className="space-y-4">
      {/* Profile Header */}
      <div className="text-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="w-20 h-20 mx-auto mb-3 bg-gradient-to-br from-mint-400 to-sky-400 rounded-full flex items-center justify-center cursor-pointer"
        >
          <User className="w-10 h-10 text-white" />
        </motion.div>
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
          {user?.username || 'Guest User'}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
          {user?.email || 'guest@mindeease.com'}
        </p>
        <div className="flex items-center justify-center space-x-2">
          <Award className="w-4 h-4 text-mint-500" />
          <span className="text-sm text-mint-600 dark:text-mint-400 font-medium">
            Level {user?.calm_level || 1} - Peaceful Mind
          </span>
        </div>
      </div>

      {/* Profile Stats */}
      <div className="glass-card p-4">
        <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-3">
          Your Journey
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center">
            <div className="text-xl font-bold text-mint-600 dark:text-mint-400">
              {user?.total_points || 0}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-300">
              MindEase Points
            </div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-sky-600 dark:text-sky-400">
              0
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-300">
              Days Streak
            </div>
          </div>
        </div>
      </div>

      {/* Mood Quote */}
      <div className="glass-card p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-base font-semibold text-gray-800 dark:text-white">
            Mood Quote
          </h3>
          <Edit3 className="w-4 h-4 text-gray-400" />
        </div>
        <p className="text-gray-600 dark:text-gray-300 italic text-sm">
          "Taking it one breath at a time 🌸"
        </p>
      </div>
    </div>
  )

  const renderAppearanceSection = () => (
    <div className="space-y-4">
      <div className="glass-card p-4">
        <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-3">
          Theme Selection
        </h3>
        <div className="space-y-3">
          {[
            { 
              id: 'light', 
              name: 'Light Mode', 
              icon: Sun, 
              desc: 'Bright and energizing', 
              preview: 'bg-gradient-to-r from-white to-gray-100',
              textColor: 'text-gray-800'
            },
            { 
              id: 'dark', 
              name: 'Dark Mode', 
              icon: Moon, 
              desc: 'Easy on the eyes', 
              preview: 'bg-gradient-to-r from-gray-800 to-gray-900',
              textColor: 'text-white'
            },
            { 
              id: 'zen', 
              name: 'Zen Pastel', 
              icon: Palette, 
              desc: 'Soft and calming', 
              preview: 'bg-gradient-to-r from-mint-100 via-sky-100 to-lavender-100',
              textColor: 'text-gray-700'
            }
          ].map((themeOption) => (
            <motion.button
              key={themeOption.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setSpecificTheme(themeOption.id)
                toast.success(`Switched to ${themeOption.name}`)
              }}
              className={`w-full p-4 rounded-2xl border-2 transition-all relative overflow-hidden ${
                theme === themeOption.id
                  ? 'border-mint-500 shadow-lg'
                  : 'border-gray-200 dark:border-gray-700 hover:border-mint-300'
              }`}
            >
              {/* Theme Preview Background */}
              <div className={`absolute inset-0 ${themeOption.preview} opacity-20`}></div>
              
              <div className="relative flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  theme === themeOption.id
                    ? 'bg-mint-500 text-white'
                    : 'bg-white/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300'
                }`}>
                  <themeOption.icon className="w-5 h-5" />
                </div>
                <div className="text-left flex-1">
                  <div className="font-semibold text-gray-800 dark:text-white">
                    {themeOption.name}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    {themeOption.desc}
                  </div>
                </div>
                {theme === themeOption.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-6 h-6 bg-mint-500 rounded-full flex items-center justify-center"
                  >
                    <Check className="w-4 h-4 text-white" />
                  </motion.div>
                )}
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <div className="glass-card p-4">
        <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-3">
          Visual Effects
        </h3>
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium text-gray-800 dark:text-white text-sm">
              Animated Backgrounds
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-300">
              Floating particles and gradients
            </div>
          </div>
          <motion.div 
            whileTap={{ scale: 0.95 }}
            className="w-12 h-6 bg-mint-500 rounded-full relative cursor-pointer"
          >
            <motion.div 
              className="w-5 h-5 bg-white rounded-full absolute top-0.5 shadow-sm"
              animate={{ x: 26 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  )

  const renderNotificationsSection = () => (
    <div className="space-y-4">
      <div className="glass-card p-4">
        <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-4">
          Wellness Reminders
        </h3>
        <div className="space-y-4">
          {[
            { key: 'meditation', name: 'Daily Meditation', desc: 'Gentle reminders to meditate' },
            { key: 'mood', name: 'Mood Check-ins', desc: 'Daily emotional wellness check' },
            { key: 'quotes', name: 'Motivational Quotes', desc: 'Inspiring messages throughout the day' },
            { key: 'sleep', name: 'Sleep Reminders', desc: 'Wind-down notifications' }
          ].map((notification) => (
            <div key={notification.key} className="flex items-center justify-between">
              <div className="flex-1">
                <div className="font-medium text-gray-800 dark:text-white text-sm">
                  {notification.name}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-300">
                  {notification.desc}
                </div>
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleNotification(notification.key)}
                className={`w-12 h-6 rounded-full relative transition-colors ${
                  notifications[notification.key] ? 'bg-mint-500' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <motion.div 
                  className="w-5 h-5 bg-white rounded-full absolute top-0.5 shadow-sm"
                  animate={{ 
                    x: notifications[notification.key] ? 26 : 2 
                  }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </motion.button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderPrivacySection = () => (
    <div className="space-y-4">
      <div className="glass-card p-4">
        <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-4">
          Data & Privacy
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="font-medium text-gray-800 dark:text-white text-sm">
                Anonymous Community
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-300">
                Hide your identity in community chats
              </div>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => togglePrivacy('anonymous')}
              className={`w-12 h-6 rounded-full relative transition-colors ${
                privacy.anonymous ? 'bg-mint-500' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <motion.div 
                className="w-5 h-5 bg-white rounded-full absolute top-0.5 shadow-sm"
                animate={{ 
                  x: privacy.anonymous ? 26 : 2 
                }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </motion.button>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="font-medium text-gray-800 dark:text-white text-sm">
                Data Encryption
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-300">
                All data is encrypted and secure
              </div>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => togglePrivacy('encryption')}
              className={`w-12 h-6 rounded-full relative transition-colors ${
                privacy.encryption ? 'bg-mint-500' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <motion.div 
                className="w-5 h-5 bg-white rounded-full absolute top-0.5 shadow-sm"
                animate={{ 
                  x: privacy.encryption ? 26 : 2 
                }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </motion.button>
          </div>
        </div>
      </div>

      <div className="glass-card p-4">
        <div className="flex items-center space-x-2 mb-3">
          <Heart className="w-5 h-5 text-red-500" />
          <h3 className="text-base font-semibold text-gray-800 dark:text-white">
            Crisis Support - India
          </h3>
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-xs mb-3">
          If you're in distress, please reach out for help. You're not alone.
        </p>
        <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-xl border border-red-200 dark:border-red-800">
          <div className="text-xs text-red-800 dark:text-red-200 space-y-2">
            <div className="flex items-center space-x-2">
              <Phone className="w-3 h-3 flex-shrink-0" />
              <span><strong>Emergency:</strong> 112</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-3 h-3 flex-shrink-0" />
              <span><strong>AASRA:</strong> 91-22-27546669</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-3 h-3 flex-shrink-0" />
              <span><strong>Sneha:</strong> 044-24640050</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-3 h-3 flex-shrink-0" />
              <span><strong>Vandrevala Foundation:</strong> 1860-2662-345</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-3 h-3 flex-shrink-0" />
              <span><strong>iCall:</strong> 9152987821</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderAboutSection = () => (
    <div className="space-y-4">
      <div className="glass-card p-4">
        <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-3">
          About MindEase
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
          MindEase is your companion for mental wellness, designed to help you manage stress, 
          anxiety, and emotions through guided meditations, AI support, and mindful practices.
        </p>
        <div className="text-center">
          <motion.div 
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="text-3xl mb-2"
          >
            🌱
          </motion.div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Version 1.0.0 • Made with love for your wellbeing
          </div>
        </div>
      </div>

      <div className="glass-card p-4">
        <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-3">
          Support & Feedback
        </h3>
        <div className="space-y-2">
          <motion.button 
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full p-3 text-left bg-white/50 dark:bg-gray-800/50 rounded-xl hover:bg-white/70 dark:hover:bg-gray-800/70 transition-colors"
          >
            <div className="font-medium text-gray-800 dark:text-white text-sm">FAQ</div>
            <div className="text-xs text-gray-600 dark:text-gray-300">
              Common questions and answers
            </div>
          </motion.button>
          
          <motion.button 
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full p-3 text-left bg-white/50 dark:bg-gray-800/50 rounded-xl hover:bg-white/70 dark:hover:bg-gray-800/70 transition-colors"
          >
            <div className="font-medium text-gray-800 dark:text-white text-sm">Terms & Conditions</div>
            <div className="text-xs text-gray-600 dark:text-gray-300">
              Privacy policy and terms of use
            </div>
          </motion.button>
        </div>
      </div>

      {!user?.isGuest && (
        <div className="glass-card p-4">
          <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-3">
            Account Actions
          </h3>
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={handleLogout}
            className="w-full p-3 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-xl hover:bg-red-200 dark:hover:bg-red-900/30 transition-colors flex items-center justify-center space-x-2"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-medium">Sign Out</span>
          </motion.button>
        </div>
      )}
    </div>
  )

  const renderSection = () => {
    switch (activeSection) {
      case 'profile': return renderProfileSection()
      case 'appearance': return renderAppearanceSection()
      case 'notifications': return renderNotificationsSection()
      case 'privacy': return renderPrivacySection()
      case 'about': return renderAboutSection()
      default: return renderProfileSection()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-mint-50 via-sky-50 to-lavender-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 relative overflow-hidden">
      {/* Enhanced Background Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-10"
            style={{
              width: `${60 + Math.random() * 120}px`,
              height: `${60 + Math.random() * 120}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `linear-gradient(45deg, ${
                ['#a7f3d0', '#bae6fd', '#e9d5ff', '#faf2e1'][Math.floor(Math.random() * 4)]
              }, transparent)`,
            }}
            animate={{
              x: [0, 30, -30, 0],
              y: [0, -40, 40, 0],
              scale: [1, 1.2, 0.8, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="max-w-md mx-auto relative z-10">
        {/* Header */}
        <div className="text-center pt-4 mb-6">
          <h1 className="text-2xl font-bold gradient-text mb-2">
            Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Personalize your MindEase experience
          </p>
        </div>

        {/* Section Navigation */}
        <div className="glass-card p-2 mb-4">
          <div className="grid grid-cols-5 gap-1">
            {sections.map((section) => (
              <motion.button
                key={section.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveSection(section.id)}
                className={`p-3 rounded-xl transition-all ${
                  activeSection === section.id
                    ? 'bg-gradient-to-r from-mint-500 to-sky-500 text-white shadow-lg'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-800/50'
                }`}
              >
                <section.icon className="w-5 h-5 mx-auto mb-1" />
                <div className="text-xs font-medium">
                  {section.name}
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Section Content */}
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="pb-24"
        >
          {renderSection()}
        </motion.div>
      </div>
    </div>
  )
}

export default Settings

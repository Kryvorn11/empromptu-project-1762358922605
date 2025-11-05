import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Smile, Zap, TreePine, Award, Quote } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useUser } from '../context/UserContext'
import InstantCalm from './InstantCalm'

const Dashboard = () => {
  const { user } = useAuth()
  const { userProgress, addMoodCheckin } = useUser()
  const [showInstantCalm, setShowInstantCalm] = useState(false)
  const [dailyQuote, setDailyQuote] = useState('')
  const [todaysMoodLogged, setTodaysMoodLogged] = useState(false)

  const quotes = [
    "Peace comes from within. Do not seek it without. 🌸",
    "The present moment is the only time over which we have dominion. 🌿",
    "Breathe in peace, breathe out stress. 💨",
    "You are exactly where you need to be. 🌟",
    "Every breath is a new beginning. 🌱",
    "Calm mind brings inner strength and self-confidence. 💪",
    "In the midst of movement and chaos, keep stillness inside of you. 🧘‍♀️"
  ]

  const moodOptions = [
    { emoji: '😢', label: 'Very Sad', value: 1, color: 'from-red-400 to-red-600' },
    { emoji: '😔', label: 'Sad', value: 2, color: 'from-orange-400 to-orange-600' },
    { emoji: '😐', label: 'Neutral', value: 3, color: 'from-yellow-400 to-yellow-600' },
    { emoji: '😊', label: 'Happy', value: 4, color: 'from-mint-400 to-mint-600' },
    { emoji: '😄', label: 'Very Happy', value: 5, color: 'from-sky-400 to-sky-600' }
  ]

  useEffect(() => {
    // Set daily quote based on date
    const today = new Date().getDate()
    setDailyQuote(quotes[today % quotes.length])
    
    // Check if mood was already logged today
    const lastMoodDate = localStorage.getItem(`lastMoodDate_${user?.id}`)
    const todayString = new Date().toDateString()
    setTodaysMoodLogged(lastMoodDate === todayString)
  }, [user])

  const handleMoodSelect = async (moodValue) => {
    await addMoodCheckin(moodValue)
    const todayString = new Date().toDateString()
    localStorage.setItem(`lastMoodDate_${user?.id}`, todayString)
    setTodaysMoodLogged(true)
  }

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 17) return 'Good afternoon'
    return 'Good evening'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-mint-50 via-sky-50 to-lavender-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 relative overflow-hidden">
      {/* Enhanced Background Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
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

      <div className="max-w-md mx-auto space-y-6 relative z-10">
        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center pt-4"
        >
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            {getGreeting()}, {user?.username || 'Friend'}! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            How are you feeling today?
          </p>
        </motion.div>

        {/* Daily Quote */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6 text-center"
        >
          <Quote className="w-8 h-8 text-mint-500 mx-auto mb-3" />
          <p className="text-gray-700 dark:text-gray-300 italic">
            {dailyQuote}
          </p>
        </motion.div>

        {/* Single-Tap Mood Check-in */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-6"
        >
          <div className="flex items-center mb-4">
            <Smile className="w-6 h-6 text-mint-500 mr-3" />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Daily Mood Check-in
            </h2>
          </div>
          
          {todaysMoodLogged ? (
            <div className="text-center py-4">
              <div className="text-4xl mb-2">✅</div>
              <p className="text-gray-600 dark:text-gray-300">
                Mood logged for today! Come back tomorrow.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-5 gap-2">
              {moodOptions.map((mood) => (
                <motion.button
                  key={mood.value}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleMoodSelect(mood.value)}
                  className={`aspect-square rounded-2xl bg-gradient-to-br ${mood.color} flex flex-col items-center justify-center text-white shadow-lg hover:shadow-xl transition-all`}
                >
                  <div className="text-2xl mb-1">{mood.emoji}</div>
                  <div className="text-xs font-medium text-center leading-tight">
                    {mood.label}
                  </div>
                </motion.button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Instant Calm */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-6"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowInstantCalm(true)}
            className="w-full py-6 bg-gradient-to-r from-lavender-400 to-sky-400 text-white rounded-2xl font-semibold shadow-lg flex items-center justify-center space-x-3"
          >
            <Zap className="w-6 h-6" />
            <span className="text-xl">Instant Calm</span>
          </motion.button>
          <p className="text-center text-gray-600 dark:text-gray-300 mt-3 text-sm">
            Quick 1-minute breathing exercise
          </p>
        </motion.div>

        {/* Progress Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card p-6"
        >
          <div className="flex items-center mb-4">
            <TreePine className="w-6 h-6 text-mint-500 mr-3" />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Your Progress
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-mint-600 dark:text-mint-400">
                {userProgress.totalMeditations}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Sessions
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-sky-600 dark:text-sky-400">
                {userProgress.totalMinutes}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Minutes
              </div>
            </div>
          </div>

          {/* XP Bar */}
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Calm Level {Math.floor(userProgress.totalMinutes / 60) + 1}
              </span>
              <Award className="w-4 h-4 text-lavender-500" />
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(userProgress.totalMinutes % 60) / 60 * 100}%` }}
                transition={{ duration: 1, delay: 0.7 }}
                className="h-3 bg-gradient-to-r from-mint-500 to-sky-500 rounded-full animate-glow"
              />
            </div>
          </div>
        </motion.div>

        {/* Forest Preview */}
        {userProgress.trees.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="glass-card p-6"
          >
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
              Your Growing Forest 🌳
            </h3>
            <div className="flex space-x-2 overflow-x-auto">
              {userProgress.trees.slice(0, 5).map((tree, index) => (
                <motion.div
                  key={index}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                  className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-mint-400 to-mint-600 rounded-full flex items-center justify-center"
                >
                  <TreePine className="w-6 h-6 text-white" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Instant Calm Modal */}
      {showInstantCalm && (
        <InstantCalm onClose={() => setShowInstantCalm(false)} />
      )}
    </div>
  )
}

export default Dashboard

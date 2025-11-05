import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { TreePine, Moon, Focus, Zap, Play, Clock } from 'lucide-react'
import MeditationSession from './MeditationSession'

const MeditationHub = () => {
  const [selectedMode, setSelectedMode] = useState(null)
  const [showSession, setShowSession] = useState(false)

  const meditationModes = [
    {
      id: 'calm-focus',
      title: 'Calm Focus',
      description: 'Guided breathing with ambient nature sounds',
      icon: TreePine,
      color: 'from-mint-400 to-mint-600',
      duration: '5-30 min',
      benefits: ['Reduces stress', 'Improves focus', 'Calms mind']
    },
    {
      id: 'deep-sleep',
      title: 'Deep Sleep',
      description: 'Peaceful sounds and gentle guidance for rest',
      icon: Moon,
      color: 'from-sky-400 to-sky-600',
      duration: '10-60 min',
      benefits: ['Better sleep', 'Relaxation', 'Night peace']
    },
    {
      id: 'focus-garden',
      title: 'Focus Garden',
      description: 'Mindfulness challenge to stay present',
      icon: Focus,
      color: 'from-lavender-400 to-lavender-600',
      duration: '3-15 min',
      benefits: ['Mindfulness', 'Concentration', 'Awareness']
    },
    {
      id: 'breathing',
      title: 'Breathing Space',
      description: 'Simple breathing exercises for instant calm',
      icon: Zap,
      color: 'from-beige-400 to-beige-600',
      duration: '1-10 min',
      benefits: ['Quick relief', 'Energy boost', 'Clarity']
    }
  ]

  const startMeditation = (mode) => {
    setSelectedMode(mode)
    setShowSession(true)
  }

  if (showSession && selectedMode) {
    return (
      <MeditationSession 
        mode={selectedMode}
        onComplete={() => {
          setShowSession(false)
          setSelectedMode(null)
        }}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-mint-50 via-sky-50 to-lavender-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center pt-4"
        >
          <h1 className="text-3xl font-bold gradient-text mb-2">
            Meditation Garden
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Choose your path to inner peace
          </p>
        </motion.div>

        {/* Forest Growth Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6 text-center"
        >
          <div className="flex justify-center space-x-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  delay: i * 0.2
                }}
                className="w-8 h-8 bg-gradient-to-br from-mint-400 to-mint-600 rounded-full flex items-center justify-center"
              >
                <TreePine className="w-4 h-4 text-white" />
              </motion.div>
            ))}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Your forest grows with each meditation session 🌱
          </p>
        </motion.div>

        {/* Meditation Modes */}
        <div className="space-y-4">
          {meditationModes.map((mode, index) => (
            <motion.div
              key={mode.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="glass-card p-6 hover:shadow-xl transition-all cursor-pointer"
              onClick={() => startMeditation(mode)}
            >
              <div className="flex items-start space-x-4">
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-12 h-12 bg-gradient-to-br ${mode.color} rounded-2xl flex items-center justify-center shadow-lg`}
                >
                  <mode.icon className="w-6 h-6 text-white" />
                </motion.div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                      {mode.title}
                    </h3>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Clock className="w-4 h-4 mr-1" />
                      {mode.duration}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                    {mode.description}
                  </p>

                  {/* Benefits */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {mode.benefits.map((benefit, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-white/50 dark:bg-gray-800/50 rounded-full text-xs text-gray-600 dark:text-gray-300"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>

                  {/* Start Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center space-x-2 text-mint-600 dark:text-mint-400 font-semibold"
                  >
                    <Play className="w-4 h-4" />
                    <span>Start Session</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="glass-card p-6"
        >
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Today's Progress
          </h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-mint-600 dark:text-mint-400">0</div>
              <div className="text-xs text-gray-600 dark:text-gray-300">Sessions</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-sky-600 dark:text-sky-400">0</div>
              <div className="text-xs text-gray-600 dark:text-gray-300">Minutes</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-lavender-600 dark:text-lavender-400">0</div>
              <div className="text-xs text-gray-600 dark:text-gray-300">Trees</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default MeditationHub

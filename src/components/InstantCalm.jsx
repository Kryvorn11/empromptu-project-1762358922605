import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Play, Pause } from 'lucide-react'

const InstantCalm = ({ onClose }) => {
  const [isActive, setIsActive] = useState(false)
  const [phase, setPhase] = useState('inhale') // inhale, hold, exhale, hold
  const [timeLeft, setTimeLeft] = useState(60) // 1 minute session

  const breathingPattern = {
    inhale: 4,
    hold1: 2,
    exhale: 6,
    hold2: 2
  }

  useEffect(() => {
    if (!isActive) return

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsActive(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isActive])

  useEffect(() => {
    if (!isActive) return

    let phaseTimer
    const cyclePhases = () => {
      const phases = ['inhale', 'hold1', 'exhale', 'hold2']
      let currentIndex = 0

      const nextPhase = () => {
        setPhase(phases[currentIndex])
        const duration = breathingPattern[phases[currentIndex]] * 1000
        
        phaseTimer = setTimeout(() => {
          currentIndex = (currentIndex + 1) % phases.length
          nextPhase()
        }, duration)
      }

      nextPhase()
    }

    cyclePhases()

    return () => {
      if (phaseTimer) clearTimeout(phaseTimer)
    }
  }, [isActive])

  const getPhaseText = () => {
    switch (phase) {
      case 'inhale': return 'Breathe In'
      case 'hold1': return 'Hold'
      case 'exhale': return 'Breathe Out'
      case 'hold2': return 'Hold'
      default: return 'Breathe'
    }
  }

  const getOrbScale = () => {
    switch (phase) {
      case 'inhale': return 1.4
      case 'hold1': return 1.4
      case 'exhale': return 1
      case 'hold2': return 1
      default: return 1
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="glass-card p-8 w-full max-w-sm text-center"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Instant Calm
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            {timeLeft > 0 ? `${timeLeft}s remaining` : 'Session complete! 🌸'}
          </p>

          {/* Breathing Orb */}
          <div className="relative mb-8">
            <motion.div
              animate={{ 
                scale: isActive ? getOrbScale() : 1,
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ 
                scale: { 
                  duration: phase === 'inhale' ? 4 : phase === 'exhale' ? 6 : 2,
                  ease: "easeInOut"
                },
                opacity: { 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              className="breathing-orb mx-auto"
            />
            
            {/* Phase text */}
            <motion.div
              key={phase}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <span className="text-white font-semibold text-lg">
                {isActive ? getPhaseText() : 'Ready'}
              </span>
            </motion.div>
          </div>

          {/* Controls */}
          <div className="space-y-4">
            {timeLeft > 0 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsActive(!isActive)}
                className="w-full py-3 bg-gradient-to-r from-mint-500 to-sky-500 text-white rounded-2xl font-semibold shadow-lg flex items-center justify-center space-x-2"
              >
                {isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                <span>{isActive ? 'Pause' : 'Start'}</span>
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="w-full py-3 bg-gradient-to-r from-lavender-500 to-mint-500 text-white rounded-2xl font-semibold shadow-lg"
              >
                Complete ✨
              </motion.button>
            )}

            <button
              onClick={onClose}
              className="w-full py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default InstantCalm

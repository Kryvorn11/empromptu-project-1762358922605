import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Play, Pause, RotateCcw, TreePine, Plus, Minus } from 'lucide-react'
import { useUser } from '../context/UserContext'
import toast from 'react-hot-toast'

const MeditationSession = ({ mode, onComplete }) => {
  const { addMeditationSession } = useUser()
  const [isActive, setIsActive] = useState(false)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [selectedDuration, setSelectedDuration] = useState(300) // 5 minutes default
  const [customDuration, setCustomDuration] = useState(5) // for custom time picker
  const [phase, setPhase] = useState('setup') // setup, active, complete
  const [breathingPhase, setBreathingPhase] = useState('inhale')
  const [moodBefore, setMoodBefore] = useState(3)
  const [moodAfter, setMoodAfter] = useState(3)
  const [treeGrowth, setTreeGrowth] = useState(0)

  const quickDurations = [
    { label: '1 min', value: 60 },
    { label: '5 min', value: 300 },
    { label: '10 min', value: 600 },
    { label: '15 min', value: 900 },
    { label: '20 min', value: 1200 },
    { label: '30 min', value: 1800 }
  ]

  useEffect(() => {
    if (!isActive || phase !== 'active') return

    const timer = setInterval(() => {
      setTimeElapsed(prev => {
        const newTime = prev + 1
        // Animate tree growth based on time elapsed
        setTreeGrowth(Math.min((newTime / selectedDuration) * 100, 100))
        
        if (newTime >= selectedDuration) {
          setIsActive(false)
          setPhase('complete')
          return newTime
        }
        return newTime
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isActive, selectedDuration, phase])

  // Breathing animation for certain modes
  useEffect(() => {
    if (!isActive || mode.id !== 'breathing') return

    const breathingCycle = () => {
      const phases = ['inhale', 'hold', 'exhale', 'hold']
      const durations = [4000, 2000, 6000, 2000] // milliseconds
      let currentIndex = 0

      const nextPhase = () => {
        setBreathingPhase(phases[currentIndex])
        setTimeout(() => {
          currentIndex = (currentIndex + 1) % phases.length
          nextPhase()
        }, durations[currentIndex])
      }

      nextPhase()
    }

    breathingCycle()
  }, [isActive, mode.id])

  const startSession = () => {
    setPhase('active')
    setIsActive(true)
    setTimeElapsed(0)
    setTreeGrowth(0)
  }

  const pauseSession = () => {
    setIsActive(!isActive)
  }

  const resetSession = () => {
    setIsActive(false)
    setTimeElapsed(0)
    setTreeGrowth(0)
    setPhase('setup')
  }

  const completeSession = async () => {
    const minutes = Math.floor(timeElapsed / 60)
    await addMeditationSession(minutes, mode.id, moodBefore, moodAfter)
    
    toast.success(`🌱 Great session! You meditated for ${minutes} minutes and your tree grew!`)
    onComplete()
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getBreathingText = () => {
    switch (breathingPhase) {
      case 'inhale': return 'Breathe In'
      case 'hold': return 'Hold'
      case 'exhale': return 'Breathe Out'
      default: return 'Breathe'
    }
  }

  const getOrbScale = () => {
    if (mode.id !== 'breathing') return 1 + (treeGrowth / 200) // Subtle growth animation
    return breathingPhase === 'inhale' || breathingPhase === 'hold' ? 1.4 : 1
  }

  const getBackgroundGradient = () => {
    switch (mode.id) {
      case 'calm-focus':
        return 'from-mint-100 via-mint-50 to-sky-50 dark:from-mint-900 dark:via-gray-800 dark:to-gray-900'
      case 'deep-sleep':
        return 'from-sky-100 via-indigo-50 to-purple-50 dark:from-sky-900 dark:via-gray-800 dark:to-gray-900'
      case 'focus-garden':
        return 'from-lavender-100 via-purple-50 to-pink-50 dark:from-lavender-900 dark:via-gray-800 dark:to-gray-900'
      case 'breathing':
        return 'from-beige-100 via-yellow-50 to-orange-50 dark:from-beige-900 dark:via-gray-800 dark:to-gray-900'
      default:
        return 'from-mint-50 via-sky-50 to-lavender-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900'
    }
  }

  const adjustCustomTime = (increment) => {
    const newTime = Math.max(1, Math.min(60, customDuration + increment))
    setCustomDuration(newTime)
    setSelectedDuration(newTime * 60)
  }

  if (phase === 'setup') {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${getBackgroundGradient()} p-4 flex items-center justify-center relative overflow-hidden`}>
        {/* Enhanced Background Animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full opacity-20"
              style={{
                width: `${80 + Math.random() * 160}px`,
                height: `${80 + Math.random() * 160}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: `linear-gradient(45deg, ${
                  ['#a7f3d0', '#bae6fd', '#e9d5ff', '#faf2e1'][Math.floor(Math.random() * 4)]
                }, transparent)`,
              }}
              animate={{
                x: [0, 40, -40, 0],
                y: [0, -50, 50, 0],
                scale: [1, 1.3, 0.7, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 20 + Math.random() * 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-8 w-full max-w-md relative z-10"
        >
          <button
            onClick={onComplete}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="text-center mb-8">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${mode.color} rounded-2xl flex items-center justify-center shadow-lg`}
            >
              <mode.icon className="w-8 h-8 text-white" />
            </motion.div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              {mode.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {mode.description}
            </p>
          </div>

          {/* Enhanced Duration Selection */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
              Choose Duration
            </h3>
            
            {/* Quick Select */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {quickDurations.map((duration) => (
                <motion.button
                  key={duration.value}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedDuration(duration.value)
                    setCustomDuration(duration.value / 60)
                  }}
                  className={`py-2 px-3 rounded-xl font-semibold transition-all ${
                    selectedDuration === duration.value
                      ? 'bg-gradient-to-r from-mint-500 to-sky-500 text-white shadow-lg'
                      : 'bg-white/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:bg-white/70 dark:hover:bg-gray-800/70'
                  }`}
                >
                  {duration.label}
                </motion.button>
              ))}
            </div>

            {/* Custom Time Picker */}
            <div className="bg-white/30 dark:bg-gray-800/30 rounded-2xl p-4">
              <div className="text-center mb-3">
                <span className="text-sm text-gray-600 dark:text-gray-300">Custom Duration</span>
              </div>
              <div className="flex items-center justify-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => adjustCustomTime(-1)}
                  className="w-10 h-10 bg-white/50 dark:bg-gray-700/50 rounded-full flex items-center justify-center hover:bg-white/70 dark:hover:bg-gray-700/70 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </motion.button>
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-800 dark:text-white">
                    {customDuration}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    {customDuration === 1 ? 'minute' : 'minutes'}
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => adjustCustomTime(1)}
                  className="w-10 h-10 bg-white/50 dark:bg-gray-700/50 rounded-full flex items-center justify-center hover:bg-white/70 dark:hover:bg-gray-700/70 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Mood Before */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
              How do you feel right now?
            </h3>
            <div className="flex justify-between">
              {['😢', '😔', '😐', '😊', '😄'].map((emoji, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setMoodBefore(index + 1)}
                  className={`text-3xl p-2 rounded-full transition-all ${
                    moodBefore === index + 1 ? 'bg-mint-200 dark:bg-mint-800' : ''
                  }`}
                >
                  {emoji}
                </motion.button>
              ))}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={startSession}
            className="w-full py-4 bg-gradient-to-r from-mint-500 to-sky-500 text-white rounded-2xl font-semibold shadow-lg flex items-center justify-center space-x-2"
          >
            <Play className="w-5 h-5" />
            <span>Begin Meditation</span>
          </motion.button>
        </motion.div>
      </div>
    )
  }

  if (phase === 'active') {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${getBackgroundGradient()} p-4 flex flex-col items-center justify-center relative overflow-hidden`}>
        {/* Enhanced Background Animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full opacity-10"
              style={{
                width: `${100 + Math.random() * 200}px`,
                height: `${100 + Math.random() * 200}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: `radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)`,
              }}
              animate={{
                x: [0, 50, -50, 0],
                y: [0, -60, 60, 0],
                scale: [1, 1.4, 0.6, 1],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 25 + Math.random() * 15,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 10,
              }}
            />
          ))}
        </div>

        {/* Header */}
        <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-10">
          <div className="text-white/80">
            <div className="text-sm">{mode.title}</div>
            <div className="text-xs opacity-75">
              {formatTime(timeElapsed)} / {formatTime(selectedDuration)}
            </div>
          </div>
          <button
            onClick={onComplete}
            className="text-white/60 hover:text-white/80 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="absolute top-20 left-6 right-6 z-10">
          <div className="w-full bg-white/20 rounded-full h-1">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(timeElapsed / selectedDuration) * 100}%` }}
              className="h-1 bg-white/60 rounded-full"
            />
          </div>
        </div>

        {/* Main Content with Animated Forest Growth */}
        <div className="text-center relative z-10">
          {/* Growing Tree Visualization */}
          <div className="relative mb-8">
            <motion.div
              animate={{ 
                scale: getOrbScale(),
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ 
                scale: { 
                  duration: mode.id === 'breathing' ? 
                    (breathingPhase === 'inhale' ? 4 : breathingPhase === 'exhale' ? 6 : 2) : 3,
                  ease: "easeInOut"
                },
                opacity: { 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              className="w-40 h-40 mx-auto bg-gradient-to-br from-white/30 to-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 shadow-2xl"
            >
              <motion.div
                animate={{
                  scale: [1, 1 + (treeGrowth / 100) * 0.5, 1],
                  rotate: [0, treeGrowth / 10, 0]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <TreePine className="w-16 h-16 text-white/80" />
              </motion.div>
            </motion.div>

            {/* Growth Particles */}
            {treeGrowth > 20 && (
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(Math.floor(treeGrowth / 20))].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-mint-400 rounded-full"
                    style={{
                      left: `${30 + Math.random() * 40}%`,
                      top: `${30 + Math.random() * 40}%`,
                    }}
                    animate={{
                      y: [-10, -30, -10],
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.5,
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Instruction Text */}
          <motion.div
            key={breathingPhase}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white mb-8"
          >
            <h2 className="text-3xl font-light mb-2">
              {mode.id === 'breathing' ? getBreathingText() : 'Stay Present'}
            </h2>
            <p className="text-white/70">
              {mode.id === 'breathing' ? 'Follow the rhythm' : 'Watch your tree grow with each breath'}
            </p>
          </motion.div>

          {/* Time Display */}
          <div className="text-white/60 text-lg font-mono mb-8">
            {formatTime(selectedDuration - timeElapsed)} remaining
          </div>

          {/* Growth Progress */}
          <div className="text-white/50 text-sm">
            Tree Growth: {Math.round(treeGrowth)}%
          </div>
        </div>

        {/* Controls */}
        <div className="absolute bottom-8 left-6 right-6 flex justify-center space-x-4 z-10">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={pauseSession}
            className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white/80 hover:bg-white/30 transition-all"
          >
            {isActive ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={resetSession}
            className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white/80 hover:bg-white/30 transition-all"
          >
            <RotateCcw className="w-6 h-6" />
          </motion.button>
        </div>
      </div>
    )
  }

  if (phase === 'complete') {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${getBackgroundGradient()} p-4 flex items-center justify-center relative overflow-hidden`}>
        {/* Celebration Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 bg-mint-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, -100],
                opacity: [1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-8 w-full max-w-md text-center relative z-10"
        >
          {/* Celebration */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="text-6xl mb-4"
          >
            🌸
          </motion.div>

          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Beautiful Session!
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            You meditated for {Math.floor(timeElapsed / 60)} minutes. Your tree has grown {Math.round(treeGrowth)}%! 🌱
          </p>

          {/* Mood After */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
              How do you feel now?
            </h3>
            <div className="flex justify-between">
              {['😢', '😔', '😐', '😊', '😄'].map((emoji, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setMoodAfter(index + 1)}
                  className={`text-3xl p-2 rounded-full transition-all ${
                    moodAfter === index + 1 ? 'bg-mint-200 dark:bg-mint-800' : ''
                  }`}
                >
                  {emoji}
                </motion.button>
              ))}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={completeSession}
            className="w-full py-4 bg-gradient-to-r from-mint-500 to-sky-500 text-white rounded-2xl font-semibold shadow-lg mb-4"
          >
            Complete Session ✨
          </motion.button>

          <button
            onClick={resetSession}
            className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"
          >
            Meditate Again
          </button>
        </motion.div>
      </div>
    )
  }
}

export default MeditationSession

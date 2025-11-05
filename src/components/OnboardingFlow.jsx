import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, Heart, Moon, MessageCircle, TreePine, Sparkles } from 'lucide-react'

const OnboardingFlow = ({ onComplete }) => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      icon: Heart,
      title: "Manage Stress & Anxiety",
      description: "Find peace through guided meditations, breathing exercises, and mindfulness practices tailored to your needs.",
      color: "from-mint-400 to-mint-600"
    },
    {
      icon: Moon,
      title: "Sleep Peacefully",
      description: "Drift into restful sleep with soothing sounds, bedtime stories, and relaxation techniques.",
      color: "from-sky-400 to-sky-600"
    },
    {
      icon: MessageCircle,
      title: "AI Support Companion",
      description: "Chat freely with MindBot, your caring AI companion available 24/7 for emotional support and guidance.",
      color: "from-lavender-400 to-lavender-600"
    },
    {
      icon: TreePine,
      title: "Grow Your Calm Tree",
      description: "Watch your personal forest flourish as you meditate. Each session grows your trees and unlocks new peaceful environments.",
      color: "from-beige-400 to-beige-600"
    }
  ]

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    } else {
      // Mark onboarding as complete
      localStorage.setItem(`onboarding_${Date.now()}`, 'true')
      onComplete()
    }
  }

  const skipOnboarding = () => {
    localStorage.setItem(`onboarding_${Date.now()}`, 'true')
    onComplete()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-mint-50 via-sky-50 to-lavender-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col">
      {/* Skip button */}
      <div className="absolute top-6 right-6 z-10">
        <button
          onClick={skipOnboarding}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
        >
          Skip
        </button>
      </div>

      {/* Progress indicators */}
      <div className="flex justify-center pt-12 pb-8">
        <div className="flex space-x-2">
          {slides.map((_, index) => (
            <motion.div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'w-8 bg-mint-500' 
                  : index < currentSlide 
                    ? 'w-2 bg-mint-300' 
                    : 'w-2 bg-gray-300 dark:bg-gray-600'
              }`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 }}
            />
          ))}
        </div>
      </div>

      {/* Slide content */}
      <div className="flex-1 flex items-center justify-center px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="text-center max-w-md"
          >
            {/* Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`w-24 h-24 mx-auto mb-8 bg-gradient-to-br ${slides[currentSlide].color} rounded-full flex items-center justify-center shadow-2xl`}
            >
              {React.createElement(slides[currentSlide].icon, {
                className: "w-12 h-12 text-white"
              })}
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-3xl font-bold text-gray-800 dark:text-white mb-6"
            >
              {slides[currentSlide].title}
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
            >
              {slides[currentSlide].description}
            </motion.p>

            {/* Decorative elements */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="mt-8 flex justify-center space-x-4"
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    y: [0, -10, 0],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    delay: i * 0.3
                  }}
                >
                  <Sparkles className="w-4 h-4 text-mint-400" />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="pb-12 px-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={nextSlide}
          className="w-full max-w-md mx-auto flex items-center justify-center py-4 bg-gradient-to-r from-mint-500 to-sky-500 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all"
        >
          {currentSlide === slides.length - 1 ? "Let's Begin" : "Continue"}
          <ChevronRight className="w-5 h-5 ml-2" />
        </motion.button>
      </div>
    </div>
  )
}

export default OnboardingFlow

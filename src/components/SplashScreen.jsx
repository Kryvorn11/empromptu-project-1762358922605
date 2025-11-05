import React from 'react'
import { motion } from 'framer-motion'
import { Leaf, Sparkles } from 'lucide-react'

const SplashScreen = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-mint-100 via-sky-100 to-lavender-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center overflow-hidden">
      {/* Floating particles */}
      <div className="floating-particles">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -60, -20],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main logo and content */}
      <div className="text-center z-10">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="relative">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-mint-400 to-sky-400 rounded-full flex items-center justify-center shadow-2xl"
            >
              <Leaf className="w-12 h-12 text-white" />
            </motion.div>
            
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-2 -right-2"
            >
              <Sparkles className="w-6 h-6 text-lavender-400" />
            </motion.div>
          </div>
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-4xl font-bold gradient-text mb-4"
        >
          MindEase
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="text-lg text-gray-600 dark:text-gray-300 mb-8"
        >
          Your companion for mental wellness
        </motion.p>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          className="flex justify-center space-x-2"
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 1, 
                repeat: Infinity,
                delay: i * 0.2
              }}
              className="w-3 h-3 bg-mint-400 rounded-full"
            />
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default SplashScreen

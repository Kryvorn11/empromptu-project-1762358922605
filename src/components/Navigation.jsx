import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, TreePine, MessageCircle, Users, Settings } from 'lucide-react'

const Navigation = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/meditate', icon: TreePine, label: 'Meditate' },
    { path: '/chat', icon: MessageCircle, label: 'ChatBot' },
    { path: '/community', icon: Users, label: 'Community' },
    { path: '/settings', icon: Settings, label: 'Settings' }
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-t border-white/20 dark:border-gray-700/20 z-50">
      <div className="max-w-md mx-auto px-4 py-2">
        <div className="flex justify-around">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <motion.button
                key={item.path}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center py-2 px-3 rounded-2xl transition-all ${
                  isActive 
                    ? 'text-mint-600 dark:text-mint-400' 
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                }`}
              >
                <motion.div
                  animate={isActive ? { 
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, -5, 0]
                  } : {}}
                  transition={{ duration: 0.5 }}
                  className={`p-2 rounded-xl mb-1 ${
                    isActive 
                      ? 'bg-mint-100 dark:bg-mint-900/30' 
                      : ''
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                </motion.div>
                <span className="text-xs font-medium">
                  {item.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -top-1 w-1 h-1 bg-mint-500 rounded-full"
                  />
                )}
              </motion.button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Navigation

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, MessageCircle, Heart, Flower, Send, Shield } from 'lucide-react'

const Community = () => {
  const [selectedRoom, setSelectedRoom] = useState('calm-zone')
  const [message, setMessage] = useState('')
  // Reset to empty messages for all users
  const [messages, setMessages] = useState({
    'calm-zone': [],
    'motivation-zone': [],
    'sleep-zone': []
  })

  const rooms = [
    {
      id: 'calm-zone',
      name: 'Calm Zone',
      description: 'Share peaceful moments and gentle support',
      icon: Heart,
      color: 'from-mint-400 to-mint-600',
      members: 234
    },
    {
      id: 'motivation-zone',
      name: 'Motivation Zone',
      description: 'Celebrate progress and inspire each other',
      icon: Users,
      color: 'from-sky-400 to-sky-600',
      members: 189
    },
    {
      id: 'sleep-zone',
      name: 'Sleep Zone',
      description: 'Rest, relaxation, and peaceful nights',
      icon: MessageCircle,
      color: 'from-lavender-400 to-lavender-600',
      members: 156
    }
  ]

  const sendMessage = () => {
    if (!message.trim()) return

    const newMessage = {
      id: Date.now(),
      user: 'You',
      message: message,
      time: 'now',
      reactions: { hearts: 0, flowers: 0 }
    }

    setMessages(prev => ({
      ...prev,
      [selectedRoom]: [...prev[selectedRoom], newMessage]
    }))
    setMessage('')
  }

  const addReaction = (messageId, type) => {
    setMessages(prev => ({
      ...prev,
      [selectedRoom]: prev[selectedRoom].map(msg => 
        msg.id === messageId 
          ? { ...msg, reactions: { ...msg.reactions, [type]: msg.reactions[type] + 1 } }
          : msg
      )
    }))
  }

  const currentRoom = rooms.find(room => room.id === selectedRoom)

  return (
    <div className="min-h-screen bg-gradient-to-br from-mint-50 via-sky-50 to-lavender-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Enhanced Background Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-10"
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

      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-white/20 dark:border-gray-700/20 p-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold gradient-text mb-2">
              Community
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Connect with others on their wellness journey
            </p>
          </div>

          {/* Room Selector */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {rooms.map((room) => (
              <motion.button
                key={room.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedRoom(room.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-2xl text-sm font-medium transition-all ${
                  selectedRoom === room.id
                    ? `bg-gradient-to-r ${room.color} text-white shadow-lg`
                    : 'bg-white/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:bg-white/70 dark:hover:bg-gray-800/70'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <room.icon className="w-4 h-4" />
                  <span>{room.name}</span>
                  <span className="text-xs opacity-75">({room.members})</span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Room Info */}
      <div className="max-w-md mx-auto p-4 relative z-10">
        <motion.div
          key={selectedRoom}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-4 mb-4"
        >
          <div className="flex items-center space-x-3 mb-2">
            <div className={`w-10 h-10 bg-gradient-to-br ${currentRoom.color} rounded-full flex items-center justify-center`}>
              <currentRoom.icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                {currentRoom.name}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {currentRoom.description}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>{currentRoom.members} members online</span>
            <div className="flex items-center space-x-1">
              <Shield className="w-3 h-3" />
              <span>AI Moderated</span>
            </div>
          </div>
        </motion.div>

        {/* Messages Area - Now Empty for New Users */}
        <div className="space-y-4 mb-24">
          {messages[selectedRoom]?.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🌱</div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                Welcome to {currentRoom.name}!
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Be the first to share something positive and start a conversation.
              </p>
            </div>
          ) : (
            messages[selectedRoom]?.map((msg, index) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`glass-card p-4 ${msg.user === 'You' ? 'bg-mint-100/50 dark:bg-mint-900/20' : ''}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-semibold">
                        {msg.user.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-800 dark:text-white text-sm">
                        {msg.user}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                        {msg.time}
                      </span>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
                  {msg.message}
                </p>

                {/* Reactions */}
                <div className="flex items-center space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => addReaction(msg.id, 'hearts')}
                    className="flex items-center space-x-1 text-pink-500 hover:text-pink-600 transition-colors"
                  >
                    <Heart className="w-4 h-4" />
                    <span className="text-sm">{msg.reactions.hearts}</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => addReaction(msg.id, 'flowers')}
                    className="flex items-center space-x-1 text-purple-500 hover:text-purple-600 transition-colors"
                  >
                    <Flower className="w-4 h-4" />
                    <span className="text-sm">{msg.reactions.flowers}</span>
                  </motion.button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Message Input */}
      <div className="fixed bottom-20 left-0 right-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-t border-white/20 dark:border-gray-700/20 p-4 z-10">
        <div className="max-w-md mx-auto">
          <div className="flex items-end space-x-3">
            <div className="flex-1">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share something positive..."
                className="w-full px-4 py-3 bg-white/70 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-mint-400 resize-none max-h-32"
                rows="1"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={sendMessage}
              disabled={!message.trim()}
              className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all ${
                message.trim()
                  ? `bg-gradient-to-r ${currentRoom.color} text-white hover:shadow-xl`
                  : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400'
              }`}
            >
              <Send className="w-5 h-5" />
            </motion.button>
          </div>
          
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
            Be kind and supportive. All messages are moderated by AI for safety.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Community

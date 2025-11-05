import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Bot, User, Heart, Loader } from 'lucide-react'
import { createAgent, chatWithAgent } from '../utils/api'
import toast from 'react-hot-toast'

const ChatBot = () => {
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [agentId, setAgentId] = useState(null)
  const [isInitializing, setIsInitializing] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    initializeAgent()
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const initializeAgent = async () => {
    if (isInitializing) return
    
    setIsInitializing(true)
    
    try {
      const instructions = `You are MindBot, a caring and empathetic AI companion for the MindEase mental wellness app. You provide gentle emotional support, listen actively, and offer comfort to users dealing with stress, anxiety, or difficult emotions. You can help with:

- Emotional support and active listening
- Stress and anxiety management techniques
- Mindfulness and breathing exercises
- Sleep and relaxation guidance
- Motivation and positive reinforcement
- Crisis support and resource referrals

Always respond with warmth, understanding, and positivity. Keep responses conversational and supportive. If someone mentions crisis keywords like "panic", "self-harm", or "suicide", immediately express concern and suggest they seek professional help while offering immediate coping strategies.

Be gentle, non-judgmental, and focus on the user's wellbeing. Offer practical techniques when appropriate, but always validate their feelings first.`

      const response = await createAgent(instructions, 'MindBot - Wellness Companion')

      if (response && response.agent_id) {
        setAgentId(response.agent_id)
        
        // Add welcome message
        const welcomeMessage = "Hi there! I'm MindBot, your caring wellness companion. I'm here to listen, support you, and help you navigate through stress, anxiety, or any emotions you're experiencing. How are you feeling today? 💙"
        
        setMessages([{
          id: Date.now(),
          text: welcomeMessage,
          sender: 'bot',
          timestamp: new Date()
        }])
      } else {
        throw new Error('Failed to create agent')
      }
    } catch (error) {
      console.error('Error initializing agent:', error)
      toast.error('Failed to initialize chat. Please try again.')
      
      // Fallback welcome message
      const fallbackMessage = {
        id: Date.now(),
        text: "I'm having trouble connecting right now, but I'm still here for you. How are you feeling today?",
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages([fallbackMessage])
    } finally {
      setIsInitializing(false)
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading || isInitializing) return

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    try {
      // Check for crisis keywords
      const crisisKeywords = ['panic', 'self-harm', 'suicide', 'kill myself', 'end it all', 'can\'t go on']
      const hasCrisisKeyword = crisisKeywords.some(keyword => 
        inputMessage.toLowerCase().includes(keyword)
      )

      if (hasCrisisKeyword) {
        const crisisResponse = {
          id: Date.now() + 1,
          text: "I'm really concerned about you right now. Please know that you're not alone and there are people who want to help. If you're in immediate danger, please contact emergency services (112) or a crisis helpline. In India, you can reach:\n\n• AASRA: 91-22-27546669\n• Sneha: 044-24640050\n• Vandrevala Foundation: 1860-2662-345\n\nWould you like to talk about what's troubling you, or would you prefer some grounding exercises to help you feel safer right now?",
          sender: 'bot',
          timestamp: new Date(),
          isCrisis: true
        }
        setMessages(prev => [...prev, crisisResponse])
        setIsLoading(false)
        return
      }

      // Send message to AI agent
      if (agentId) {
        const response = await chatWithAgent(agentId, inputMessage)
        
        const botMessage = {
          id: Date.now() + 1,
          text: response.response || "I'm here to listen. Can you tell me more about how you're feeling?",
          sender: 'bot',
          timestamp: new Date()
        }

        setMessages(prev => [...prev, botMessage])
      } else {
        throw new Error('No valid agent available')
      }
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage = {
        id: Date.now() + 1,
        text: "I'm having trouble connecting right now, but I'm still here for you. Sometimes taking a few deep breaths can help while we wait. How are you feeling in this moment?",
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-mint-50 via-sky-50 to-lavender-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
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

      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-white/20 dark:border-gray-700/20 p-4">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="w-10 h-10 bg-gradient-to-br from-mint-400 to-sky-600 rounded-full flex items-center justify-center"
              >
                <Bot className="w-5 h-5 text-white" />
              </motion.div>
              <div>
                <h1 className="text-lg font-semibold text-gray-800 dark:text-white">
                  MindBot
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Your wellness companion
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <div className={`w-2 h-2 rounded-full ${isInitializing ? 'bg-yellow-500 animate-pulse' : 'bg-green-500 animate-pulse'}`}></div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {isInitializing ? 'Connecting...' : 'Online'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="max-w-md mx-auto p-4 pb-24 relative z-10">
        <div className="space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-2 max-w-[80%] ${
                  message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}>
                  {/* Avatar */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.sender === 'user' 
                      ? 'bg-gradient-to-br from-mint-400 to-sky-400' 
                      : 'bg-gradient-to-br from-mint-400 to-sky-600'
                  }`}>
                    {message.sender === 'user' ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <Bot className="w-4 h-4 text-white" />
                    )}
                  </div>

                  {/* Message Bubble */}
                  <div className={`px-4 py-3 rounded-2xl shadow-sm ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-mint-500 to-sky-500 text-white'
                      : message.isCrisis
                        ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-800'
                        : 'bg-white/70 dark:bg-gray-800/70 text-gray-800 dark:text-gray-200'
                  } ${
                    message.sender === 'user' 
                      ? 'rounded-br-md' 
                      : 'rounded-bl-md'
                  }`}>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {message.text}
                    </p>
                    <div className={`text-xs mt-2 opacity-70 ${
                      message.sender === 'user' ? 'text-white' : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          {(isLoading || isInitializing) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="flex items-start space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-mint-400 to-sky-600 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white/70 dark:bg-gray-800/70 px-4 py-3 rounded-2xl rounded-bl-md">
                  <div className="flex space-x-1">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                        className="w-2 h-2 bg-gray-400 rounded-full"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="fixed bottom-20 left-0 right-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-t border-white/20 dark:border-gray-700/20 p-4 z-10">
        <div className="max-w-md mx-auto">
          <div className="flex items-end space-x-3">
            <div className="flex-1 relative">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Share what's on your mind..."
                className="w-full px-4 py-3 bg-white/70 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-mint-400 resize-none max-h-32"
                rows="1"
                disabled={isLoading || isInitializing}
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={sendMessage}
              disabled={!inputMessage.trim() || isLoading || isInitializing}
              className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all ${
                inputMessage.trim() && !isLoading && !isInitializing
                  ? 'bg-gradient-to-r from-mint-400 to-sky-600 text-white hover:shadow-xl'
                  : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400'
              }`}
            >
              {isLoading || isInitializing ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatBot

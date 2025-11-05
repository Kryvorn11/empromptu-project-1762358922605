import React, { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'
import { apiCall } from '../utils/api'

const UserContext = createContext()

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

export const UserProvider = ({ children }) => {
  const { user } = useAuth()
  const [userProgress, setUserProgress] = useState({
    totalMeditations: 0,
    totalMinutes: 0,
    currentStreak: 0,
    trees: [],
    moodHistory: []
  })

  useEffect(() => {
    if (user && !user.isGuest) {
      loadUserProgress()
    }
  }, [user])

  const loadUserProgress = async () => {
    try {
      // Load meditation sessions
      const sessionsQuery = `
        SELECT * FROM newschema_79bfc72e90c740979d0bdbefe1997145.meditation_sessions 
        WHERE user_id = $1 
        ORDER BY date DESC
      `
      
      const sessionsResponse = await apiCall('/api_tools/templates/call_postgres', {
        query: sessionsQuery,
        params: [user.id]
      })

      // Load forest progress
      const forestQuery = `
        SELECT * FROM newschema_79bfc72e90c740979d0bdbefe1997145.forest_progress 
        WHERE user_id = $1
      `
      
      const forestResponse = await apiCall('/api_tools/templates/call_postgres', {
        query: forestQuery,
        params: [user.id]
      })

      // Load mood check-ins
      const moodQuery = `
        SELECT * FROM newschema_79bfc72e90c740979d0bdbefe1997145.mood_checkins 
        WHERE user_id = $1 
        ORDER BY date DESC 
        LIMIT 30
      `
      
      const moodResponse = await apiCall('/api_tools/templates/call_postgres', {
        query: moodQuery,
        params: [user.id]
      })

      const sessions = sessionsResponse.data || []
      const totalMinutes = sessions.reduce((sum, session) => sum + session.duration, 0)
      
      setUserProgress({
        totalMeditations: sessions.length,
        totalMinutes,
        currentStreak: calculateStreak(sessions),
        trees: forestResponse.data || [],
        moodHistory: moodResponse.data || []
      })
    } catch (error) {
      console.error('Error loading user progress:', error)
    }
  }

  const calculateStreak = (sessions) => {
    if (sessions.length === 0) return 0
    
    let streak = 0
    const today = new Date()
    
    for (let i = 0; i < sessions.length; i++) {
      const sessionDate = new Date(sessions[i].date)
      const daysDiff = Math.floor((today - sessionDate) / (1000 * 60 * 60 * 24))
      
      if (daysDiff === streak) {
        streak++
      } else {
        break
      }
    }
    
    return streak
  }

  const addMeditationSession = async (duration, mode, moodBefore, moodAfter, notes = '') => {
    if (user.isGuest) {
      // For guest users, just update local state
      setUserProgress(prev => ({
        ...prev,
        totalMeditations: prev.totalMeditations + 1,
        totalMinutes: prev.totalMinutes + duration
      }))
      return
    }

    try {
      const query = `
        INSERT INTO newschema_79bfc72e90c740979d0bdbefe1997145.meditation_sessions 
        (user_id, duration, mode, date, mood_before, mood_after, notes)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
      `
      
      await apiCall('/api_tools/templates/call_postgres', {
        query,
        params: [user.id, duration, mode, new Date().toISOString(), moodBefore, moodAfter, notes]
      })

      // Add forest progress
      await addTreeGrowth(duration, mode)
      
      // Reload progress
      loadUserProgress()
    } catch (error) {
      console.error('Error adding meditation session:', error)
    }
  }

  const addTreeGrowth = async (duration, mode) => {
    try {
      const treeSpecies = getTreeSpeciesForMode(mode)
      const growthLevel = Math.floor(duration / 5) // 1 growth level per 5 minutes
      
      const query = `
        INSERT INTO newschema_79bfc72e90c740979d0bdbefe1997145.forest_progress 
        (user_id, tree_species, growth_level, unlock_date, environment_type)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
      `
      
      await apiCall('/api_tools/templates/call_postgres', {
        query,
        params: [user.id, treeSpecies, growthLevel, new Date().toISOString(), mode]
      })
    } catch (error) {
      console.error('Error adding tree growth:', error)
    }
  }

  const addMoodCheckin = async (moodRating, journalText = '') => {
    if (user.isGuest) return

    try {
      const query = `
        INSERT INTO newschema_79bfc72e90c740979d0bdbefe1997145.mood_checkins 
        (user_id, date, mood_rating, journal_text)
        VALUES ($1, $2, $3, $4)
        RETURNING *
      `
      
      await apiCall('/api_tools/templates/call_postgres', {
        query,
        params: [user.id, new Date().toISOString(), moodRating, journalText]
      })

      loadUserProgress()
    } catch (error) {
      console.error('Error adding mood check-in:', error)
    }
  }

  const getTreeSpeciesForMode = (mode) => {
    const species = {
      'calm-focus': 'Serenity Oak',
      'deep-sleep': 'Moonlight Willow',
      'focus-garden': 'Mindful Pine',
      'breathing': 'Zen Bamboo'
    }
    return species[mode] || 'Peace Tree'
  }

  const value = {
    userProgress,
    addMeditationSession,
    addMoodCheckin,
    loadUserProgress
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

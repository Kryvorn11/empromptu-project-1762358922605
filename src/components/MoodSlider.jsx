import React from 'react'
import { motion } from 'framer-motion'

const MoodSlider = ({ value, onChange }) => {
  return (
    <div className="relative">
      <input
        type="range"
        min="1"
        max="5"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="mood-slider w-full"
      />
      <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
        <span>😢</span>
        <span>😔</span>
        <span>😐</span>
        <span>😊</span>
        <span>😄</span>
      </div>
    </div>
  )
}

export default MoodSlider

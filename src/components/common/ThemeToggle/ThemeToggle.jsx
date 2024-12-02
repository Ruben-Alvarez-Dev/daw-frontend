import './ThemeToggle.css'
import { useState } from 'react'
import { MdLightMode, MdDarkMode } from 'react-icons/md'

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true)

  const toggleTheme = () => {
    setIsDark(prev => !prev)
  }

  return (
    <button 
      className={`theme-switch ${isDark ? 'dark' : 'light'}`}
      onClick={toggleTheme}
      title={isDark ? 'Dark Mode' : 'Light Mode'}
    >
      <div className="switch-track">
        <div className="switch-thumb">
          {isDark ? <MdDarkMode /> : <MdLightMode />}
        </div>
      </div>
    </button>
  )
}

export default ThemeToggle

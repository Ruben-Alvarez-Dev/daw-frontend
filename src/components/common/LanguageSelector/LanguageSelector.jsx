import './LanguageSelector.css'
import { useState } from 'react'
import { ES, US } from 'country-flag-icons/react/3x2'

const LanguageSelector = () => {
  const [currentLang, setCurrentLang] = useState('es')

  const toggleLanguage = () => {
    setCurrentLang(prev => prev === 'es' ? 'en' : 'es')
  }

  return (
    <button className="language-selector" onClick={toggleLanguage}>
      {currentLang === 'es' ? (
        <>
          <ES className="flag-icon" title="Español" />
          <span>ES</span>
        </>
      ) : (
        <>
          <US className="flag-icon" title="English" />
          <span>ENG</span>
        </>
      )}
    </button>
  )
}

export default LanguageSelector

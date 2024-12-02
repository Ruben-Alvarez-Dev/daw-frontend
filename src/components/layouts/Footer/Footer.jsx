import { useState, useEffect } from 'react'
import './Footer.css'

const Footer = () => {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatDate = (date) => {
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section left">
          <span className="copyright"> 2024 Restaurant Reservations</span>
        </div>
        <div className="footer-section middle"></div>
        <div className="footer-section right">
          <span className="date">{formatDate(currentTime)}</span>
          <span className="time">{formatTime(currentTime)}</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer

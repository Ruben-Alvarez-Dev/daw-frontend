import { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { 
  MdInfo, 
  MdCheckCircle, 
  MdWarning, 
  MdError 
} from 'react-icons/md'
import './Alert.css'

const Alert = ({ type = 'info', message, onClose }) => {
  const [isExiting, setIsExiting] = useState(false)

  const icons = {
    info: <MdInfo className="alert-icon" />,
    success: <MdCheckCircle className="alert-icon" />,
    warning: <MdWarning className="alert-icon" />,
    error: <MdError className="alert-icon" />
  }

  const handleClose = useCallback(() => {
    if (!isExiting) {
      setIsExiting(true)
      setTimeout(() => {
        onClose()
      }, 500) // Ajustado a 500ms para coincidir con la transición CSS
    }
  }, [isExiting, onClose])

  useEffect(() => {
    const timer = setTimeout(handleClose, 5000)
    return () => clearTimeout(timer)
  }, [handleClose])

  const handleClick = (e) => {
    e.stopPropagation()
    handleClose()
  }

  return (
    <div 
      className={`alert alert-${type} ${isExiting ? 'exiting' : ''}`}
      onClick={handleClick}
    >
      {icons[type]}
      <span className="alert-message">{message}</span>
    </div>
  )
}

Alert.propTypes = {
  type: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
}

export default Alert

import PropTypes from 'prop-types'
import './Button.css'

const Button = ({ 
  children, 
  variant = 'primary', 
  type = 'button', 
  onClick,
  isEnabled = true 
}) => {
  const handleClick = (e) => {
    if (isEnabled && onClick) {
      onClick(e)
    }
  }

  return (
    <button
      type={type}
      className={`button button-${variant} ${!isEnabled ? 'disabled' : ''}`}
      onClick={handleClick}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'success']),
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  onClick: PropTypes.func,
  isEnabled: PropTypes.bool
}

export default Button

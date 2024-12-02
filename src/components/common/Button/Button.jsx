import PropTypes from 'prop-types'
import './Button.css'

const Button = ({ children, type = 'button', variant = 'primary', onClick, className }) => {
  return (
    <button
      type={type}
      className={`button button-${variant} ${className || ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'success']),
  onClick: PropTypes.func,
  className: PropTypes.string
}

export default Button

import PropTypes from 'prop-types'
import './Card.css'

const Card = ({ children, className }) => {
  return (
    <div className={`card ${className || ''}`}>
      {children}
    </div>
  )
}

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
}

export default Card

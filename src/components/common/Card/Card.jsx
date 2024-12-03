import PropTypes from 'prop-types'
import './Card.css'

const Card = ({ title, body, footer, className }) => {
  return (
    <div className={`card container ${className || ''}`}>
      {title && <div className="card-title">{title}</div>}
      {body && <div className="card-body">{body}</div>}
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  )
}

Card.propTypes = {
  title: PropTypes.node,
  body: PropTypes.node,
  footer: PropTypes.node,
  className: PropTypes.string
}

export default Card

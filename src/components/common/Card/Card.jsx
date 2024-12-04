import PropTypes from 'prop-types'
import './Card.css'

const Card = ({ header, body, footer }) => {
  return (
  <div className="card">
    {header && <div className="card-header">{header}</div>}
    {body && <div className="card-body">{body}</div>}
    {footer && <div className="card-footer">{footer}</div>}
  </div>
  )
}

Card.propTypes = {
  header: PropTypes.node,
  body: PropTypes.node,
  footer: PropTypes.node
}

export default Card

import PropTypes from 'prop-types'
import Button from '../Button/Button'
import './Modal.css'

const Modal = ({ isOpen, onClose, onConfirm, title, restaurantName }) => {
  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{title}</h2>
        <div className="message-container">
          <span>Va a borrar el restaurante</span>
          <span className="restaurant-name">{restaurantName}</span>
          <span>¿está seguro?</span>
        </div>
        <div className="button-group">
          <Button 
            variant="danger"
            onClick={onConfirm}
          >
            Aceptar
          </Button>
          <Button 
            variant="secondary"
            onClick={onClose}
          >
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  )
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  restaurantName: PropTypes.string.isRequired
}

export default Modal

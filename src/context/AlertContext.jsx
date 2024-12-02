import { createContext, useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Alert from '../components/common/Alert/Alert'
import alertService from '../services/alertService'

const AlertContext = createContext()

export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([])

  useEffect(() => {
    // Suscribirse a los cambios en el servicio
    const unsubscribe = alertService.subscribe(newAlerts => {
      setAlerts([...newAlerts])
    })

    // Limpieza al desmontar
    return () => unsubscribe()
  }, [])

  return (
    <AlertContext.Provider value={alertService}>
      {children}
      <div className="alert-container">
        {alerts.map(alert => (
          <Alert
            key={alert.id}
            type={alert.type}
            message={alert.message}
            onClose={() => alertService.removeAlert(alert.id)}
          />
        ))}
      </div>
    </AlertContext.Provider>
  )
}

AlertProvider.propTypes = {
  children: PropTypes.node.isRequired
}

// Hook para usar dentro de componentes React
export const useAlert = () => {
  const context = useContext(AlertContext)
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider')
  }
  return context
}

// Exportar el servicio directamente para uso fuera de React
export const alert = alertService

let listeners = []

const alertService = {
  alerts: [],
  nextId: 1,

  subscribe(listener) {
    listeners.push(listener)
    return () => {
      listeners = listeners.filter(l => l !== listener)
    }
  },

  notify() {
    listeners.forEach(listener => listener(this.alerts))
  },

  addAlert(type, message) {
    const newAlert = {
      id: this.nextId++,
      type,
      message,
      timestamp: Date.now()
    }
    this.alerts.push(newAlert)
    this.notify()

    // Auto-remove after 5 seconds
    setTimeout(() => {
      this.removeAlert(newAlert.id)
    }, 5000)
  },

  removeAlert(id) {
    this.alerts = this.alerts.filter(alert => alert.id !== id)
    this.notify()
  },

  // Métodos de conveniencia para diferentes tipos de alerts
  success(message) {
    this.addAlert('success', message)
  },

  error(message) {
    this.addAlert('error', message)
  },

  warning(message) {
    this.addAlert('warning', message)
  },

  info(message) {
    this.addAlert('info', message)
  }
}

export default alertService

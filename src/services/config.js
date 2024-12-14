export const API_CONFIG = {
  development: {
    baseUrl: 'http://localhost:3000',
    idField: 'id'  // json-server usa 'id'
  },
  production: {
    baseUrl: '/api',  // Ajustar según tu API real
    idField: '_id'    // Ajustar según tu API real (ej: MongoDB usa '_id')
  }
}

export const getCurrentConfig = () => {
  const env = process.env.NODE_ENV || 'development'
  return API_CONFIG[env]
}

// Mapeo de nombres de campos entre json-server y API real
export const ID_MAPPING = {
  users: {
    jsonServer: 'id',
    real: 'user_id'
  },
  restaurants: {
    jsonServer: 'id',
    real: 'restaurant_id'
  },
  tables: {
    jsonServer: 'id',
    real: 'table_id'
  },
  reservations: {
    jsonServer: 'id',
    real: 'reservation_id'
  }
}

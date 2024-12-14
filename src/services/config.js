export const API_CONFIG = {
  development: {
    baseUrl: 'http://localhost:8000/api',
    idField: 'id'
  },
  production: {
    baseUrl: '/api',
    idField: 'id'
  }
}

export const getCurrentConfig = () => {
  const env = process.env.NODE_ENV || 'development'
  return API_CONFIG[env]
}

// Mapeo de campos para la API de Laravel
export const FIELD_MAPPING = {
  users: {
    id: 'id',
    name: 'name',
    email: 'email',
    password: 'password',
    role: 'role'
  },
  restaurants: {
    id: 'id',
    name: 'name',
    capacity: 'capacity',
    zones: 'zones'
  },
  tables: {
    id: 'id',
    number: 'number',
    zone: 'zone',
    capacity: 'capacity',
    restaurant_id: 'restaurant_id'
  },
  reservations: {
    id: 'id',
    guests: 'guests',
    date: 'date',
    time: 'time',
    table_id: 'table_id',
    user_id: 'user_id'
  }
}

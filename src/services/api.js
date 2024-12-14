import { getCurrentConfig, ID_MAPPING } from './config'

const config = getCurrentConfig()

const handleResponse = async (response) => {
  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`)
  }
  return response.json()
}

// Adapta los datos para el formato esperado por el servidor actual
const adaptDataForServer = (type, data, isCreate = false) => {
  const { jsonServer, real } = ID_MAPPING[type]
  
  if (process.env.NODE_ENV === 'development') {
    // Para json-server
    const adapted = { ...data }
    if (!isCreate && adapted[real]) {
      adapted[jsonServer] = adapted[jsonServer] || adapted[real]
    }
    return adapted
  } else {
    // Para API real
    const adapted = { ...data }
    if (!isCreate && adapted[jsonServer]) {
      adapted[real] = adapted[real] || adapted[jsonServer]
      delete adapted[jsonServer]
    }
    return adapted
  }
}

// Adapta los datos recibidos del servidor al formato de la aplicación
const adaptDataFromServer = (type, data) => {
  const { jsonServer, real } = ID_MAPPING[type]
  
  if (process.env.NODE_ENV === 'development') {
    // Desde json-server
    const adapted = { ...data }
    if (!adapted[real]) {
      adapted[real] = adapted[jsonServer]
    }
    return adapted
  } else {
    // Desde API real
    const adapted = { ...data }
    if (!adapted[jsonServer]) {
      adapted[jsonServer] = adapted[real]
    }
    return adapted
  }
}

// Obtiene el ID correcto según el entorno
const getEntityId = (type, data) => {
  if (process.env.NODE_ENV === 'development') {
    return data[ID_MAPPING[type].jsonServer]
  }
  return data[ID_MAPPING[type].real]
}

// API calls
export const api = {
  // Obtener lista de entidades
  async getList(type) {
    try {
      console.log(`Fetching ${type} from ${config.baseUrl}/${type}`)
      const response = await fetch(`${config.baseUrl}/${type}`)
      const data = await handleResponse(response)
      return data.map(item => adaptDataFromServer(type, item))
    } catch (error) {
      console.error(`Error fetching ${type}:`, error)
      throw error
    }
  },

  // Obtener una entidad por ID
  async getById(type, id) {
    try {
      const response = await fetch(`${config.baseUrl}/${type}/${id}`)
      const data = await handleResponse(response)
      return adaptDataFromServer(type, data)
    } catch (error) {
      console.error(`Error fetching ${type} ${id}:`, error)
      throw error
    }
  },

  // Crear nueva entidad
  async create(type, data) {
    try {
      const response = await fetch(`${config.baseUrl}/${type}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      return handleResponse(response)
    } catch (error) {
      console.error(`Error creating ${type}:`, error)
      throw error
    }
  },

  // Actualizar entidad existente
  async update(type, jsonServerId, data) {
    try {
      console.log(`Updating ${type} ${jsonServerId} with:`, data)
      const response = await fetch(`${config.baseUrl}/${type}/${jsonServerId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      return handleResponse(response)
    } catch (error) {
      console.error(`Error updating ${type} ${jsonServerId}:`, error)
      throw error
    }
  },

  // Eliminar entidad
  async delete(type, jsonServerId) {
    try {
      const response = await fetch(`${config.baseUrl}/${type}/${jsonServerId}`, {
        method: 'DELETE',
      })
      return handleResponse(response)
    } catch (error) {
      console.error(`Error deleting ${type} ${jsonServerId}:`, error)
      throw error
    }
  },
}

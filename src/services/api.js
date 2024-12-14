import { getCurrentConfig } from './config'

const config = getCurrentConfig()

const getAuthToken = () => {
  return localStorage.getItem('token')
}

const getHeaders = () => {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
  
  const token = getAuthToken()
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  
  return headers
}

const handleResponse = async (response) => {
  const data = await response.json()
  
  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    throw new Error(data.message || `Error: ${response.status}`)
  }
  
  return data
}

// API calls
export const api = {
  async register(userData) {
    const response = await fetch(`${config.baseUrl}/register`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({
        name: userData.name,
        email: userData.email,
        password: userData.password,
        password_confirmation: userData.password_confirmation
      })
    })
    return handleResponse(response)
  },

  async login(credentials) {
    const response = await fetch(`${config.baseUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      body: JSON.stringify(credentials)
    })
    const data = await handleResponse(response)
    if (data.token) {
      localStorage.setItem('token', data.token)
    }
    return data
  },

  async logout() {
    try {
      const response = await fetch(`${config.baseUrl}/logout`, {
        method: 'POST',
        headers: getHeaders()
      })
      await handleResponse(response)
    } finally {
      localStorage.removeItem('token')
    }
  },

  async refreshToken() {
    const response = await fetch(`${config.baseUrl}/refresh`, {
      method: 'GET',
      headers: getHeaders()
    })
    const data = await handleResponse(response)
    if (data.token) {
      localStorage.setItem('token', data.token)
    }
    return data
  },

  // CRUD Operations
  async getList(type) {
    const response = await fetch(`${config.baseUrl}/${type}`, {
      headers: getHeaders()
    })
    const data = await handleResponse(response)
    return data.data || data || []
  },

  async getById(type, id) {
    const response = await fetch(`${config.baseUrl}/${type}/${id}`, {
      headers: getHeaders()
    })
    const data = await handleResponse(response)
    return data.data || data
  },

  async create(type, data) {
    if (type === 'users') {
      // Primero registramos el usuario
      const registerResponse = await this.register(data);
      
      // Si se especifica un rol diferente a customer, actualizamos el rol
      if (data.role && data.role !== 'customer') {
        // Obtenemos el ID del usuario recién creado
        const users = await this.getList('users');
        const newUser = users.find(u => u.email === data.email);
        
        if (newUser) {
          // Actualizamos el rol
          await this.update('users', newUser.id, { role: data.role.toLowerCase() });
        }
      }
      return registerResponse;
    }

    const response = await fetch(`${config.baseUrl}/${type}`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data)
    })
    const responseData = await handleResponse(response)
    return responseData.data || responseData
  },

  async update(type, id, data) {
    let endpoint = '';
    if (type === 'users') {
      endpoint = `users/${id}`;
    } else {
      endpoint = `${type}/${id}`;
    }

    const response = await fetch(`${config.baseUrl}/${endpoint}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify({
        ...(data.name && { name: data.name }),
        ...(data.email && { email: data.email }),
        ...(data.role && { role: data.role.toLowerCase() }),
        ...(data.password && {
          password: data.password,
          password_confirmation: data.password_confirmation
        })
      })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al actualizar el usuario');
    }
    
    const responseData = await response.json();
    return responseData.data || responseData;
  },

  async delete(type, id) {
    const response = await fetch(`${config.baseUrl}/${type}/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
      body: JSON.stringify({
        _method: 'DELETE'
      })
    })
    return handleResponse(response)
  }
}

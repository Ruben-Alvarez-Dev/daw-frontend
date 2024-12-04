const API_URL = 'http://localhost:3000'

export const restaurantsService = {
  async getRestaurants() {
    const response = await fetch(`${API_URL}/restaurants`)
    if (!response.ok) {
      throw new Error('Error al cargar los restaurantes')
    }
    return response.json()
  },

  async createRestaurant(data) {
    const response = await fetch(`${API_URL}/restaurants`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    
    if (!response.ok) {
      throw new Error('Error al crear el restaurante')
    }
    
    return response.json()
  },

  async updateRestaurant(id, data) {
    const response = await fetch(`${API_URL}/restaurants/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error('Error al actualizar el restaurante')
    }

    return response.json()
  },

  async deleteRestaurant(id) {
    const response = await fetch(`${API_URL}/restaurants/${id}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      throw new Error('Error al eliminar el restaurante')
    }
  }
}

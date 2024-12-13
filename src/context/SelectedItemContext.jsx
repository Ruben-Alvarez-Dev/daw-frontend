import { createContext, useContext, useState } from 'react'

const SelectedItemContext = createContext()

export const SelectedItemProvider = ({ children }) => {
  const [selectedItems, setSelectedItems] = useState({
    user: null,
    restaurant: null,
    table: null,
    reservation: null
  })

  const selectItem = (type, item) => {
    setSelectedItems(prev => ({
      ...prev,
      [type]: item
    }))
  }

  const clearSelection = (type) => {
    if (type) {
      setSelectedItems(prev => ({
        ...prev,
        [type]: null
      }))
    } else {
      setSelectedItems({
        user: null,
        restaurant: null,
        table: null,
        reservation: null
      })
    }
  }

  return (
    <SelectedItemContext.Provider value={{ selectedItems, selectItem, clearSelection }}>
      {children}
    </SelectedItemContext.Provider>
  )
}

export const useSelectedItem = () => {
  const context = useContext(SelectedItemContext)
  if (!context) {
    throw new Error('useSelectedItem must be used within a SelectedItemProvider')
  }
  return context
}

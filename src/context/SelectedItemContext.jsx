import { createContext, useContext, useState } from 'react'

const SelectedItemContext = createContext()

export const SelectedItemProvider = ({ children }) => {
  const [selectedItem, setSelectedItem] = useState({
    type: null, // 'user', 'restaurant', 'table', 'reservation'
    item: null
  })

  const selectItem = (type, item) => {
    setSelectedItem({ type, item })
  }

  const clearSelection = () => {
    setSelectedItem({ type: null, item: null })
  }

  return (
    <SelectedItemContext.Provider value={{ selectedItem, selectItem, clearSelection }}>
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

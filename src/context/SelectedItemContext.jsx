import React, { createContext, useState, useContext } from 'react'

const SelectedItemContext = createContext()

export function SelectedItemProvider({ children }) {
  const [selectedItem, setSelectedItem] = useState({
    type: null, // 'user', 'restaurant', 'table', 'reservation'
    item: null
  })

  return (
    <SelectedItemContext.Provider value={{ selectedItem, setSelectedItem }}>
      {children}
    </SelectedItemContext.Provider>
  )
}

export function useSelectedItem() {
  return useContext(SelectedItemContext)
}

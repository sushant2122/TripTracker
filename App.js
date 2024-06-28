import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import AppNavigation from './Navigation/AppNavigation'
import { Provider } from 'react-redux'
import { store } from './redux/store'


function App() {
  return (
    <Provider store={store}>
      <AppNavigation />

    </Provider>

  )
}

export default App

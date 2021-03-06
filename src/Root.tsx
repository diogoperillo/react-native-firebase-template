import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import NavigationContainer from './navigation/NavigationContainer'
import AuthProvider from './contexts/Auth'
import FeedbackProvider from './contexts/Feedback'
import Layout from './contexts/Layout'

export default function Root() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <Layout>
          <FeedbackProvider>
            <NavigationContainer />
          </FeedbackProvider>
        </Layout>
      </AuthProvider>
    </SafeAreaProvider>
  )
}

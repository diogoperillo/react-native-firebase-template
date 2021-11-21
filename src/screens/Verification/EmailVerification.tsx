import Form from 'formact'
import React, { useEffect } from 'react'
import { Button, Paragraph, Title } from 'react-native-paper'

import SubmitButton from '../../components/form/SubmitButton'
import Box from '../../components/layout/Box'
import ScrollView from '../../components/layout/ScrollView'
import Spacer from '../../components/layout/Spacer'
import { sendVerificationLink, signOut } from '../../firebase/authentication'
import { useAuth } from '../../utils/contexts/Auth'
import { useFeedback } from '../../utils/contexts/Feedback'

export default function EmailVerificationScreen() {
  const giveFeedback = useFeedback()
  const { user, refreshUser } = useAuth()

  useEffect(() => {
    // refresh the user every 3 seconds to check if the email is validated
    const timer = setInterval(refreshUser, 3000)
    return () => {
      timer && clearInterval(timer)
    }
  }, [])

  const renderBottom = () => (
    <Box paddingX={1} paddingY={2}>
      <Form
        onSubmit={async (payload) => {
          try {
            await sendVerificationLink()
            giveFeedback('Email sent!')
          } catch (e: any) {
            giveFeedback(e.message.replace('Firebase:', ''), true)
          }
          payload.onFinish()
        }}>
        <SubmitButton mode="contained">Send new email</SubmitButton>
      </Form>
      <Spacer v={1} />
      <Button onPress={signOut}>Sign out</Button>
    </Box>
  )

  return (
    <ScrollView flex1 renderBottom={renderBottom}>
      <Box flex1 center paddingX={2}>
        <Title>Almost there!</Title>
        <Spacer v={2} />
        <Paragraph>
          We've sent an email to '{user?.email}' with a link to verify your
          email
        </Paragraph>
      </Box>
    </ScrollView>
  )
}

export const StackOptions = { headerTitle: 'Verify your email' }

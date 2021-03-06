import Form, { FormSubmitPayload } from 'formact'
import React from 'react'

import PhotoField from '../../components/form/PhotoField'
import SubmitButton from '../../components/form/SubmitButton'
import TextInput from '../../components/form/TextInput'
import Box from '../../components/layout/Box'
import ScrollView from '../../components/layout/ScrollView'
import { updateAvatar, updateName } from '../../firebase/authentication'
import { uploadUserFile } from '../../firebase/storage'
import localize from '../../localization/localize'
import { AppScreenProps } from '../../navigation/stacks/App/types'
import { useAuth } from '../../contexts/Auth'
import { useFeedback } from '../../contexts/Feedback'
import readFile from '../../utils/readFile'

type Props = AppScreenProps<'Profile'>

type ProfileForm = {
  avatar?: string
  name: string
  email: string
}

export default function ProfileScreen(props: Props) {
  const giveFeedback = useFeedback()
  const { user, refreshUser } = useAuth()

  const onSubmit = async (payload: FormSubmitPayload<ProfileForm>) => {
    if (payload.valid) {
      try {
        let photo = payload.values.avatar || ''

        if (photo && photo !== user?.photoURL) {
          const file = await readFile(photo, 'avatar.jpg', 'image/jpg')
          photo = await uploadUserFile(file, 'profile')
          await updateAvatar(photo)
        }

        await updateName(payload.values.name)
        await refreshUser()
        giveFeedback('Profile updated!')
        payload.onFinish()
        props.navigation.goBack()
        return
      } catch (e: any) {
        giveFeedback(e.message.replace('Firebase:', ''), true)
      }
    }
    payload.onFinish()
  }

  return (
    <Form<ProfileForm>
      initialValues={{
        avatar: user?.photoURL || '',
        email: user?.email || '',
        name: user?.displayName || '',
      }}
      onSubmit={onSubmit}>
      <ScrollView
        renderBottom={() => (
          <Box paddingX={1} paddingBottom={2}>
            <SubmitButton i18nKey="buttonSubmit" />
          </Box>
        )}>
        <Box padding={1} paddingBottom={2}>
          <PhotoField name="avatar" />
          <TextInput required name="email" disabled i18nKey="fieldEmail" />
          <TextInput required name="name" i18nKey="fieldName" />
        </Box>
      </ScrollView>
    </Form>
  )
}

export const ScreenOptions = {
  headerTitle: localize('profileHeader'),
}

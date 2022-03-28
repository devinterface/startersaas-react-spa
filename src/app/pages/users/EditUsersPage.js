import React, { useState } from 'react'
import { UpdateUser } from 'api/mutations'
import { User } from 'api/queries'
import { useMutation, useQueryClient, useQuery } from 'react-query'
import ConfirmAlert from 'libs/confirmAlert'
import { useTranslation } from 'react-i18next'
import { Form, Row, Col, Button } from 'react-bootstrap'
import Box from 'app/components/dashboard/Box'
import { useParams } from 'react-router-dom'
import UsersForm from './UsersForm'
import Loader from 'app/components/Loader'

const EditUsersPage = props => {
  const { t } = useTranslation()

  const { userId } = useParams()

  const [user, setUser] = useState(null)

  const queryClient = useQueryClient()

  const { isLoading, data } = useQuery(
    ['User', props.user.accountId],
    () => User(userId),
    {
      retry: false,
      onSuccess: data => {
        if (data.data.accountOwner) {
          props.history.push('/users')
        } else {
          setUser(data.data)
        }
      }
    }
  )

  const updateUserMutate = useMutation(UpdateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(['Users', props.user.accountId])
      queryClient.invalidateQueries(['User', props.user.accountId])
    }
  })

  const onSubmit = async data => {
    delete data.email
    try {
      const response = await updateUserMutate.mutateAsync({
        userId: userId,
        data: data
      })
      if (response) {
        ConfirmAlert.success(t('updateUsersPage.userUpdated'))
        props.history.push('/users')
      }
    } catch (error) {
      if (error.response?.data) {
        ConfirmAlert.error(error.response.data)
        return
      }
    }
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <Row>
      <Col xs={12}>
        <Box
          header={
            <div>
              <h1>{t('updateUsersPage.updatedUser')}</h1>
            </div>
          }
          body={
            <div>
              {user && (
                <UsersForm user={user} onSubmit={onSubmit} showEmail={false} />
              )}
            </div>
          }
        />
      </Col>
    </Row>
  )
}
export default EditUsersPage

import React, { } from 'react'
import { UpdateAccount } from 'api/mutations'
import { useMutation } from 'react-query'
import { useTranslation } from 'react-i18next'
import ConfirmAlert from 'libs/confirmAlert'
import { Col, Row } from 'react-bootstrap'
import Box from 'app/components/dashboard/Box'
import AccountForm from 'app/pages/user/AccountForm'

const EditAccountPage = (props) => {
  const { t } = useTranslation()

  const mutation = useMutation(UpdateAccount)

  const onSubmit = async data => {
    try {
      const response = await mutation.mutateAsync({ accountId: props.user.accountId, data: data })
      if (response) {
        ConfirmAlert.success(t('editAccountPage.detailsUpdated'))
      }
    } catch (error) {
    }
  }

  return (
    <Row>
      <Col xs={12}>
        <Box
          header={
            <h1>{t('editAccountPage.details')}</h1>
          }
          body={
            <AccountForm user={props.user} onSubmit={onSubmit} />
          }
        />

      </Col>
    </Row>
  )
}

export default EditAccountPage

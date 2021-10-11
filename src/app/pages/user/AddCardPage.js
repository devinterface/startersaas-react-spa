import React, { } from 'react'
import { STRIPE_CONF } from 'config'
import { StripeProvider, Elements } from 'react-stripe-elements'

import StripeCCForm from './StripeCCForm'
import { useTranslation } from 'react-i18next'
import { Form, Row, Col } from 'react-bootstrap'
import Box from 'app/components/dashboard/Box'

const AddCardPage = (props) => {
  const { t } = useTranslation()

  return (
    <Row>
      <Col xs={12}>
        <Box 
          header={
            <h1>{t('Credit card data')}</h1>
          }
          body={
            <StripeProvider apiKey={STRIPE_CONF.publicKey}>
              <Elements>
                <StripeCCForm />
              </Elements>
            </StripeProvider>
          }
        />
      </Col>
    </Row>
  )
}

export default AddCardPage

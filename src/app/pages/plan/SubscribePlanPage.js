import React, { useState } from 'react'
import { UpdateAccount } from 'api/mutations'
import { Plans } from 'api/queries'
import { useMutation, useQuery } from 'react-query'
import { StripeProvider, Elements } from 'react-stripe-elements'
import StripeForm from './StripeForm'
import { useTranslation } from 'react-i18next'
import { formatMoney } from 'libs/utils'
import { Col, Row } from 'react-bootstrap'
import Box from 'app/components/dashboard/Box'
import { selectedPlanState } from 'libs/atoms'
import { useRecoilValue } from 'recoil'
import Loader from 'app/components/Loader'
import AccountForm from 'app/pages/user/AccountForm'

const SubscribePlanPage = (props) => {
  const { t } = useTranslation()

  const planId = useRecoilValue(selectedPlanState)

  const [selectedPlan, setSelectedPlan] = useState(null)

  const mutation = useMutation(UpdateAccount)

  const [invoicingUpdated, setInvoicingUpdated] = useState(false)

  const onSubmit = async data => {
    try {
      await mutation.mutateAsync({ accountId: props.user.accountId, data: data })
      setInvoicingUpdated(true)
    } catch (error) {
      setInvoicingUpdated(false)
    }
  }

  const { isLoading: plansLoading, data: plansData } = useQuery('Plans', Plans, {
    retry: false,
    onSuccess: plansData => {
      const sp = plansData.data.plans.filter(p => p.id === planId)[0]
      setSelectedPlan(sp)
    }
  })

  if (plansLoading) {
    return <Loader />
  }

  return (
    <div>
      <Row>
        <Col xs={12}>
          <Box
            header={
              <div>
                <h1>{t('subscribePlanPage.billingDetails')}</h1>
              </div>
            }
            body={
              <AccountForm user={props.user} onSubmit={onSubmit} />
            }
          />
        </Col>
      </Row>
      {selectedPlan && (
        <Row>
          <Col xs={12} style={{ marginTop: '30px' }}>
            <Box
              header={
                <div>
                  <h1>{t('subscribePlanPage.yourOrder')}</h1>
                </div>
              }
              body={
                <div>
                  <div className='inline-data'><strong>{t('subscribePlanPage.plan')}</strong><span className='right'>{selectedPlan.title}</span></div>
                  <div className='inline-data'><strong>{t('subscribePlanPage.invoicing')}</strong><span className='right'>{selectedPlan.monthly ? t('subscribePlanPage.monthly') : t('subscribePlanPage.yearly')}</span></div>
                  <div className='inline-data'><strong>{t('subscribePlanPage.price')}</strong><span className='right'>{formatMoney('it', selectedPlan.currency, selectedPlan.price)}</span></div>
                </div>
              }
            />
          </Col>
        </Row>
      )}
      <Row>
        {invoicingUpdated && (
          <Col xs={12} style={{ marginTop: '30px' }}>
            <Box
              header={
                <div>
                  <h1>{t('subscribePlanPage.creditCard')}</h1>
                </div>
              }
              body={
                <div>
                  <StripeProvider apiKey={plansData.data.publicKey}>
                    <Elements>
                      <StripeForm planId={planId} selectedPlan={selectedPlan} user={props.user} />
                    </Elements>
                  </StripeProvider>
                </div>
              }
            />
          </Col>
        )}
      </Row>
    </div>
  )
}

export default SubscribePlanPage

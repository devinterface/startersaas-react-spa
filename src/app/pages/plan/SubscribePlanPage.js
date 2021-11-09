import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { UpdateAccount } from 'api/mutations'
import { Plans } from 'api/queries'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from 'react-query'
import { StripeProvider, Elements } from 'react-stripe-elements'
import StripeForm from './StripeForm'
import { useTranslation } from 'react-i18next'
import { formatMoney } from 'libs/utils'
import { Form, Button, Col, Row } from 'react-bootstrap'
import Box from 'app/components/dashboard/Box'
import { selectedPlanState } from 'libs/atoms'
import { useRecoilValue } from 'recoil'
import Loader from 'app/components/Loader'

const schema = yup.object().shape({
  companyName: yup.string().required(),
  companyPhone: yup.string().required(),
  companyBillingAddress: yup.string().required(),
  companyVat: yup.string().required(),
  companyEmail: yup.string().lowercase().email().required(),
  companySdi: yup.string(),
  companyPec: yup.string().lowercase().email().required()
})

const SubscribePlanPage = (props) => {
  const { t } = useTranslation()

  const planId = useRecoilValue(selectedPlanState)

  const [selectedPlan, setSelectedPlan] = useState(null)

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      companyName: props.user.account.companyName,
      companyPhone: props.user.account.companyPhone,
      companyBillingAddress: props.user.account.companyBillingAddress,
      companyVat: props.user.account.companyVat,
      companySdi: props.user.account.companySdi,
      companyPec: props.user.account.companyPec,
      companyEmail: props.user.account.companyEmail
    }
  })

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
                <h1>{t('Billing details')}</h1>
              </div>
            }
            body={
              <div>
                <Form id='email-form' name='email-form' data-name='Email Form' onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group controlId='formCompanyName'>
                    <Form.Label>{t('Company name')}</Form.Label>
                    <Form.Control type='text' maxLength='256' name='companyName' data-name='Compnay Name' placeholder='' id='companyName' ref={register} />
                    <span className='text-muted'>
                      {errors.companyName?.message}
                    </span>
                  </Form.Group>
                  <Form.Group controlId='formCompanyPhone'>
                    <Form.Label>{t('Phone number')}</Form.Label>
                    <Form.Control type='text' maxLength='256' name='companyPhone' data-name='Company Phone' placeholder='' id='companyPhone' ref={register} />
                    <span className='text-muted'>
                      {errors.companyPhone?.message}
                    </span>
                  </Form.Group>
                  <Form.Group controlId='formcompanyBillingAddress'>
                    <Form.Label>{t('Billing address')}</Form.Label>
                    <Form.Control type='text' maxLength='256' name='companyBillingAddress' data-name='Company Billing Address' placeholder='' id='companyBillingAddress' ref={register} />
                    <span className='text-muted'>
                      {errors.companyBillingAddress?.message}
                    </span>
                  </Form.Group>
                  <Form.Group controlId='formcompanyVat'>
                    <Form.Label>{t('VAT number')}</Form.Label>
                    <Form.Control type='text' maxLength='256' name='companyVat' data-name='Company Vat' placeholder='' id='companyVat' ref={register} />
                    <span className='text-muted'>
                      {errors.companyVat?.message}
                    </span>
                  </Form.Group>
                  <Form.Group controlId='formcompanyEmail'>
                    <Form.Label>{t('Email')}</Form.Label>
                    <Form.Control type='text' maxLength='256' name='companyEmail' data-name='Email' placeholder='' id='companyEmail' ref={register} />
                    <span className='text-muted'>
                      {errors.companyEmail?.message}
                    </span>
                  </Form.Group>
                  <Form.Group controlId='formcompanyPec'>
                    <Form.Label>{t('PEC')}</Form.Label>
                    <Form.Control type='text' maxLength='256' name='companyPec' data-name='Company Pec' placeholder='' id='companyPec' ref={register} />
                    <span className='text-muted'>
                      {errors.companyPec?.message}
                    </span>
                  </Form.Group>
                  <Form.Group controlId='formcompanySdi'>
                    <Form.Label>{t('SDI')}</Form.Label>
                    <Form.Control type='text' maxLength='256' name='companySdi' data-name='Company SDI' placeholder='' id='companySdi' ref={register} />
                    <span className='text-muted'>
                      {errors.companySdi?.message}
                    </span>
                  </Form.Group>

                  <Button type='submit' className='custom-btn green w-100-perc' data-wait='Please wait...' ref={register}>{t('Update billing details')}</Button>
                </Form>
              </div>
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
                  <h1>{t('Your order')}</h1>
                </div>
              }
              body={
                <div>
                  <div className='inline-data'><strong>{t('Plan')}</strong><span className='right'>{selectedPlan.title}</span></div>
                  <div className='inline-data'><strong>{t('Invoicing')}</strong><span className='right'>{selectedPlan.monthly ? t('Monthly') : t('Yearly')}</span></div>
                  <div className='inline-data'><strong>{t('Price')}</strong><span className='right'>{formatMoney('it', selectedPlan.currency, selectedPlan.price)}</span></div>
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
                  <h1>{t('Credit card data')}</h1>
                </div>
              }
              body={
                <div>
                  <StripeProvider apiKey={plansData.data.publicKey}>
                    <Elements>
                      <StripeForm planId={planId} user={props.user} />
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

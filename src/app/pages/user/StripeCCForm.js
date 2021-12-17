import React, { useState } from 'react'
import { injectStripe, CardElement } from 'react-stripe-elements'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { SetDefaultCreditCard, CreateSetupIntent } from 'api/mutations'
import { useTranslation } from 'react-i18next'
import ConfirmAlert from 'libs/confirmAlert'
import Loader from 'app/components/Loader'
import { Button, Form } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

const StripeCCForm = props => {
  const { t } = useTranslation()

  const history = useHistory()

  const { register, handleSubmit, formState: { errors } } = useForm({})

  const setupIntentMutation = useMutation(CreateSetupIntent)

  const setDefaultCreditCard = useMutation(SetDefaultCreditCard)

  const [loading, setLoading] = useState(false)

  const [cardElement, setCardElement] = useState(null)

  const handleReady = (element) => {
    setCardElement(element)
  }

  const onStripeSubmit = async data => {
    try {
      setLoading(true)
      const setupIntent = await setupIntentMutation.mutateAsync()

      const response = await props.stripe.confirmCardSetup(
        setupIntent.data.client_secret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: data.cardHolderName
            }
          }
        }
      )
      if (response) {
        await setDefaultCreditCard.mutate({ cardId: response.setupIntent.payment_method })
        setTimeout(function () {
          ConfirmAlert.success(t('stripeCCForm.cardAdded'))
          history.push('/')
        }, 1000)
      }
    } catch (error) {
      setLoading(false)
    }
  }

  return (
    <>
      <Form id='email-form' name='email-form' data-name='Email Form' method='get' onSubmit={handleSubmit(onStripeSubmit)}>
        {loading && (
          <Loader />
        )}
        <Form.Group controlId='formCard'>
          <Form.Label>{t('stripeCCForm.cardOwner')}</Form.Label>
          <Form.Control type='text' maxLength='256' name='cardHolderName' data-name={t('stripeCCForm.cardOwner')} placeholder='' id='cardHolderName' {...register('cardHolderName', { required: true })} />
          <span className='text-muted'>
            {errors.cardHolderName?.message}
          </span>
          <CardElement style={{ base: { fontSize: '18px', color: '#333', border: '1px solid #ccc' } }} onReady={handleReady} />
        </Form.Group>
        <Button type='submit' className='custom-btn green w-100-perc' data-wait='Please wait...'>{t('stripeCCForm.addCard')}</Button>
      </Form>
    </>
  )
}
export default injectStripe(StripeCCForm)

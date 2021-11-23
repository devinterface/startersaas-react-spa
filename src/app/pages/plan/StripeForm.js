import React, { useState } from 'react'
import { injectStripe, CardElement } from 'react-stripe-elements'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import { Subscribe } from 'api/mutations'
import { useTranslation } from 'react-i18next'
import ConfirmAlert from 'libs/confirmAlert'
import Loader from 'app/components/Loader'
import { Button, Form } from 'react-bootstrap'

const StripeForm = props => {
  const { t } = useTranslation()

  const queryClient = useQueryClient()

  const { register, handleSubmit, formState: { errors } } = useForm({})

  const [cardElement, setCardElement] = useState(null)

  const mutation = useMutation(Subscribe, {
    onSuccess: () => {

    }
  })

  const [loading, setLoading] = useState(false)

  const handleReady = (element) => {
    setCardElement(element)
  }

  const onStripeSubmit = async data => {
    const source = await props.stripe.createSource({ type: 'card' }, data.cardHolderName)
    if (source.error) {
      return
    }
    const paymentRequest = {
      sourceToken: source.source.id,
      planId: props.planId
    }
    try {
      setLoading(true)
      const response = await mutation.mutateAsync(paymentRequest)
      if (response.data.status === 'incomplete' && response.data.latest_invoice.payment_intent) {
        // handle intent
        const handleCardPaymentResul = await props.stripe.confirmCardPayment(
          response.data.latest_invoice.payment_intent.client_secret
        )
        if (handleCardPaymentResul.error) {
          throw new Error(handleCardPaymentResul.error.message)
        }
        queryClient.invalidateQueries(['Customer', props.user.accountId])
        queryClient.invalidateQueries(['CustomerInvoices', props.user.accountId])
        queryClient.invalidateQueries(['Me'])
        ConfirmAlert.success(t('Payment successfully completed'))
        setTimeout(function () {
          window.location.href = '/dashboard'
        }, 3000)
      } else {
        queryClient.invalidateQueries(['Customer', props.user.accountId])
        queryClient.invalidateQueries(['CustomerInvoices', props.user.accountId])
        queryClient.invalidateQueries(['Me'])
        // ConfirmAlert.success(response.data.message)
        setTimeout(function () {
          window.location.href = '/dashboard'
        }, 3000)
      }
    } catch (error) {
      console.log(error)
      ConfirmAlert.error(t('Payment failed'))
      setTimeout(function () {
        window.location.href = '/dashboard'
      }, 3000)
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
          <Form.Label>{t('Credit card owner')}</Form.Label>
          <Form.Control type='text' maxLength='256' name='cardHolderName' data-name='Card Holder' placeholder='' id='cardHolderName' {...register('cardHolderName', { required: true })} />
          <span className='text-muted'>
            {errors.cardHolderName?.message}
          </span>
          <CardElement style={{ base: { fontSize: '18px', color: '#333', border: '1px solid #ccc' } }} onReady={handleReady} />
        </Form.Group>
        {!loading && (
          <Button type='submit' className='custom-btn green w-100-perc' data-wait='Please wait...'>{t('Subscribe')}</Button>
        )}
      </Form>
    </>
  )
}
export default injectStripe(StripeForm)

import React, { useState } from 'react'
import { injectStripe, CardElement } from 'react-stripe-elements'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { AddCreditCard } from 'api/mutations'
import { useTranslation } from 'react-i18next'
import ConfirmAlert from 'libs/confirmAlert'
import Loader from 'app/components/Loader'
import { Button, Form } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

const StripeCCForm = props => {
  const { t } = useTranslation()

  const history = useHistory()

  const { register, handleSubmit, formState: { errors } } = useForm({})

  const mutation = useMutation(AddCreditCard)

  const [loading, setLoading] = useState(false)

  const [cardElement, setCardElement] = useState(null)

  const handleReady = (element) => {
    setCardElement(element)
  }

  const onStripeSubmit = async data => {
    const source = await props.stripe.createSource({ type: 'card' }, data.cardHolderName)
    if (source.error) {
      setLoading(false)
      return
    }
    const cardRequest = {
      sourceToken: source.source.id
    }
    try {
      setLoading(true)
      const response = await mutation.mutateAsync(cardRequest)
      if (response) {
        setTimeout(function () {
          ConfirmAlert.success(t('Card added successfully'))
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
          <Form.Label>{t('Credit card owner')}</Form.Label>
          <Form.Control type='text' maxLength='256' name='cardHolderName' data-name='Card Holder' placeholder='' id='cardHolderName' {...register('cardHolderName', { required: true })} />
          <span className='text-muted'>
            {errors.cardHolderName?.message}
          </span>
          <CardElement style={{ base: { fontSize: '18px', color: '#333', border: '1px solid #ccc' } }} onReady={handleReady} />
        </Form.Group>
        <Button type='submit' className='custom-btn green w-100-perc' data-wait='Please wait...'>{t('Add this card')}</Button>
      </Form>
    </>
  )
}
export default injectStripe(StripeCCForm)

import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Subscribe } from 'api/mutations'
import { useMutation, useQueryClient } from 'react-query'
import { injectStripe } from 'react-stripe-elements'
import Loader from 'app/components/Loader'
import ConfirmAlert from 'libs/confirmAlert'
import { formatMoney } from 'libs/utils'
import { confirmAlert } from 'react-confirm-alert' // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import { Card, Button, Image } from 'react-bootstrap'

const PlanCard = ({ plan, monthly, setSelectedPlan, currentSubscription, stripe }) => {
  const { t } = useTranslation()
  const mutation = useMutation(Subscribe)
  const [loading, setLoading] = useState(false)
  const queryClient = useQueryClient()

  console.log('currentSubscription', currentSubscription)

  const confirmUpdate = async planId => {
    confirmAlert({
      title: t('planCard.updateSubscription'),
      message: t('planCard.areYouSure'),
      buttons: [
        {
          label: t('planCard.yes'),
          onClick: () => onUpdatePlanSubmit(planId)
        },
        {
          label: t('planCard.no'),
          onClick: () => { }
        }
      ]
    })
  }

  const onUpdatePlanSubmit = async planId => {
    const paymentRequest = {
      planId: planId
    }
    try {
      setLoading(true)
      const response = await mutation.mutateAsync(paymentRequest)
      if (response.data.latest_invoice.payment_intent.client_secret) {
        const handleCardPaymentResult = await stripe.confirmCardPayment(
          response.data.latest_invoice.payment_intent.client_secret,
          {
            setup_future_usage: 'off_session'
          }
        )
        if (handleCardPaymentResult.error) {
          throw new Error(handleCardPaymentResult.error.message)
        }
        queryClient.invalidateQueries(['Me'])
        ConfirmAlert.success(t('planCard.planUpdated'))
        setTimeout(function () {
          window.location.href = '/dashboard'
        }, 3000)
      } else {
        queryClient.invalidateQueries(['Me'])
        ConfirmAlert.success(response.data.message)
        setTimeout(function () {
          window.location.href = '/dashboard'
        }, 3000)
      }
    } catch (error) {
      console.log('error', error)
      ConfirmAlert.error(t('stripeForm.paymentFailed'))
      setTimeout(function () {
        window.location.href = '/dashboard'
      }, 3000)
      setLoading(false)
    }
  }

  const renderButton = () => {
    if (currentSubscription !== undefined) {
      if (currentSubscription.status === 'active' && currentSubscription.plan.id === plan.id) {
        return (<Button className='custom-btn w-100-perc' onClick={() => { }}>{t('planCard.currentPlan')}</Button>)
      } else if (currentSubscription.status === 'past_due' && currentSubscription.plan.id === plan.id) {
        return (<Button className='custom-btn green w-100-perc' onClick={() => { }}>{t('planCard.toPay')}</Button>)
      } else if (currentSubscription.status === 'active' && currentSubscription.plan.id !== plan.id) {
        return (<Button className='custom-btn green w-100-perc' onClick={() => { confirmUpdate(plan.id) }}>{t('planCard.changePlan')}</Button>)
      }
    } else {
      return (<Button className='custom-btn green w-100-perc' onClick={() => { setSelectedPlan(plan.id) }}>{t('planCard.selectPlan')}</Button>)
    }
  }

  return (
    <Card>
      {loading
        ? (<Loader />)
        : (
          <div className='div-card-container'>
            <Card.Header className='blue'>
              <Card.Title>
                {plan.title}
                <br />
                {formatMoney('it', plan.currency, plan.price)}
                {monthly ? t('planCard.month') : t('planCard.year')}  (+IVA)
              </Card.Title>
            </Card.Header>
            <Card.Body>
              {plan.features.map((feature, i) =>
                <Card.Text key={`feature-${i}`}>
                  <span><Image src='/images/menuclick-check.svg' className='img-check' /></span><span>{t(feature)}</span>
                </Card.Text>
              )}
              {renderButton()}

            </Card.Body>
          </div>
          )}
    </Card>
  )
}

export default injectStripe(PlanCard)

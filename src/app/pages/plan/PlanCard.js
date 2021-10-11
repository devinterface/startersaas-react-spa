import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Subscribe } from 'api/mutations'
import { useMutation } from 'react-query'
import Loader from 'app/components/Loader'
import miniToastr from 'libs/minitoastr'
import { formatMoney } from 'libs/utils'
import { confirmAlert } from 'react-confirm-alert' // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import { Card, Button, Image } from 'react-bootstrap'

const PlanCard = ({ plan, monthly, setSelectedPlan, currentSubscription }) => {
  const { t } = useTranslation()
  const mutation = useMutation(Subscribe)
  const [loading, setLoading] = useState(false)

  const confirmUpdate = async planId => {
    confirmAlert({
      title: t('Update your subscription'),
      message: t('Are you sure tu update your plan?'),
      buttons: [
        {
          label: t('Yes'),
          onClick: () => onUpdatePlanSubmit(planId)
        },
        {
          label: t('No'),
          onClick: () => { }
        }
      ]
    })
  }

  const onUpdatePlanSubmit = async planId => {
    const paymentRequest = {
      sourceToken: 'fake',
      planId: planId
    }
    try {
      setLoading(true)
      const response = await mutation.mutateAsync(paymentRequest)
      if (response) {
        setTimeout(function () {
          miniToastr.success(t('Plan successfully updated'))
          window.location.href = '/'
        }, 1000)
      }
    } catch (error) {
      setLoading(false)
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
                {monthly ? t('/month') : t('/year')}  (+IVA)
              </Card.Title>
            </Card.Header>
            <Card.Body>
              {plan.features.map((feature, i) =>
                <Card.Text key={`feature-${i}`}>
                  <span><Image src='/images/menuclick-check.svg' className='img-check' /></span><span>{t(feature)}</span>
                </Card.Text>
              )}
              {currentSubscription && currentSubscription.status === 'active' && currentSubscription.plan.id === plan.id
                ? (<Button className='custom-btn w-100-perc' onClick={() => { }}>{t('Your curren plan')}</Button>)
                : (currentSubscription && currentSubscription.status === 'active'
                    ? (<Button className='custom-btn green w-100-perc' onClick={() => { confirmUpdate(plan.id) }}>{t('Change plan')}</Button>)
                    : (<Button className='custom-btn green w-100-perc' onClick={() => { setSelectedPlan(plan.id) }}>{t('Select this plan')}</Button>)
                  )}
            </Card.Body>
          </div>
          )}
    </Card>
  )
}

export default PlanCard

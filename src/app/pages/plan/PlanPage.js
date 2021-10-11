import React, { useState, useEffect } from 'react'
import { Customer } from 'api/queries'
import { useQuery } from 'react-query'
import { STRIPE_CONF } from 'config'
import PlanCard from './PlanCard'
import { Redirect } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Loader from 'app/components/Loader'
import { Row, Col, Button } from 'react-bootstrap'
import Box from 'app/components/dashboard/Box'
import { useRecoilState } from 'recoil'
import { selectedPlanState } from 'libs/atoms'

const PlanPage = (props) => {
  const { t } = useTranslation()

  const [selectedPlanRecurring, setSelectedPlanRecurring] = useState(1)

  const [selectedPlan, setSelectedPlan] = useRecoilState(selectedPlanState)

  const [redirectTo, setRedirectTo] = useState(false)

  useEffect(() => {
    // Storage.setItem('selectedPlan', selectedPlan)
    if (selectedPlan !== undefined) {
      setRedirectTo(true)
    }
  }, [selectedPlan, props])

  const { isLoading, error, data } = useQuery('Customer', Customer, {
    retry: false
  })

  if (isLoading) {
    return <Loader />
  }

  let currentSubscription

  if (data) {
    try {
      currentSubscription = data.data.subscriptions.data[0]
    } catch (error) {
    }
  }

  if (redirectTo) {
    return (
      <Redirect to='/plan/subscribe' />
    )
  }

  return (
    <Row>
      <Col xs={12}>
        <Box
          header={
            <div style={{ textAlign: 'center', minWidth: '300px', width: '50%', margin: '0 auto', marginTop: '20px' }}>
              <h1>{t('Select a plan')}</h1>
              <p>Attiva l’abbonamento che desideri e ricorda che puoi disdire quando vuoi.
                <br /><br />Non hai una carta di credito? Contattaci all’indirizzo <a href='mailto:info@mintmarketing.it'>info@mintmarketing.it</a> e provvederemo ad attivare il tuo account.
                <br /><br />
              </p>
              <p>
                Aiutaci a focalizzare meglio i tuoi obiettivi e necessità rispondendo a questo questionario
              </p>
            </div>
          }
          body={
            <div>
              {STRIPE_CONF.plans.filter(p => p.monthly).length > 0 && STRIPE_CONF.plans.filter(p => !p.monthly).length > 0 && (
                <Row>
                  <Col xs={12}>
                    <div className='contain-buttons-plan'>
                      <Button className={(selectedPlanRecurring === 1) ? 'button1' : 'button1 grey'} onClick={() => { setSelectedPlanRecurring(1) }}>{t('Monthly plan')}</Button>
                      <Button className={(selectedPlanRecurring === 2) ? 'button2' : 'button2 grey'} onClick={() => { setSelectedPlanRecurring(2) }}>{t('Yearly plan')}</Button>
                    </div>
                  </Col>
                </Row>
              )}
              <Row>
                {selectedPlanRecurring === 1 && (
                  <>
                    {STRIPE_CONF.plans.filter(p => p.monthly).map((plan, i) =>
                      <Col xs={12} md={4} key={i} className='contain-card-plan'>
                        <PlanCard plan={plan} monthly key={`montly-${i}`} setSelectedPlan={setSelectedPlan} currentSubscription={currentSubscription} />
                      </Col>
                    )}
                  </>
                )}
                {selectedPlanRecurring === 2 && STRIPE_CONF.plans.filter(p => !p.monthly).length > 0 && (
                  <>
                    {STRIPE_CONF.plans.filter(p => !p.monthly).map((plan, i) =>
                      <Col xs={12} md={4} key={i} className='contain-card-plan'>
                        <PlanCard plan={plan} monthly={false} key={`yearly-${i}`} setSelectedPlan={setSelectedPlan} currentSubscription={currentSubscription} />
                      </Col>
                    )}
                  </>
                )}
              </Row>
              <ul>
                <li>
                  <i>per "sponsorizzazioni sui social" si intende la
                    sponsorizzazione diretta di post pubblicati.
                  </i>
                </li>
                <li>
                  <i>per ideazione linea grafica su Instagram (IG) si intende la linea grafica
                    coerente da seguire nelle varie pubblicazioni (elemento base per gestire
                    professionalmente Instagram essendo un social visual)
                  </i>
                </li>
              </ul>
            </div>
          }
        />

      </Col>
    </Row>
  )
}
export default PlanPage

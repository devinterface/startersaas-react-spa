import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { Customer, CustomerCards, CustomerInvoices, Plans } from 'api/queries'
import { CancelSubscription, RemoveCreditCard, SetDefaultCreditCard } from 'api/mutations'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { confirmAlert } from 'react-confirm-alert' // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import Loader from 'app/components/Loader'
import { formatMoney, isFreeTrial, hasFailedPayment } from 'libs/utils'
import { Button, Col, Row, Table } from 'react-bootstrap'
import Box from 'app/components/dashboard/Box'

import TrialComponent from './TrialComponent'

const DashboardPage = ({ user }) => {
  const { t } = useTranslation()

  const [currentSubscription, setCurrentSubscription] = useState({})
  const [selectedPlan, setSelectedPlan] = useState({})

  const queryClient = useQueryClient()

  const cancelSubscriptionMutate = useMutation(CancelSubscription, {
    onSuccess: () => {
      queryClient.invalidateQueries(['Customer', user.accountId])
      queryClient.invalidateQueries(['CustomerInvoices', user.accountId])
    }
  })

  const removeCardMutate = useMutation(RemoveCreditCard, {
    onSuccess: () => {
      queryClient.invalidateQueries(['CustomerCards', user.accountId])
    }
  })

  const setDefaultCardMutate = useMutation(SetDefaultCreditCard, {
    onSuccess: () => {
      queryClient.invalidateQueries(['Customer', user.accountId])
    }
  })

  const cancelSubscription = async (subscriptionId) => {
    confirmAlert({
      title: t('dashboardPage.unsubscribe'),
      message: t('dashboardPage.areYouSureToUnsubscribe'),
      buttons: [
        {
          label: t('dashboardPage.yes'),
          onClick: async () => cancelSubscriptionMutate.mutate({ subscriptionId: subscriptionId })
        },
        {
          label: t('dashboardPage.no'),
          onClick: () => { }
        }
      ]
    })
  }

  const removeCard = async (cardId) => {
    confirmAlert({
      title: t('dashboardPage.removeCard'),
      message: t('dashboardPage.areYouSureToRemoveCard'),
      buttons: [
        {
          label: t('dashboardPage.yes'),
          onClick: async () => removeCardMutate.mutate({ cardId: cardId })
        },
        {
          label: t('dashboardPage.no'),
          onClick: () => { }
        }
      ]
    })
  }

  const setDefaultCard = async (cardId) => {
    confirmAlert({
      title: t('dashboardPage.makeDefault'),
      message: t('dashboardPage.areYouSureMakeDefault'),
      buttons: [
        {
          label: t('dashboardPage.yes'),
          onClick: async () => setDefaultCardMutate.mutate({ cardId: cardId })
        },
        {
          label: t('dashboardPage.no'),
          onClick: () => { }
        }
      ]
    })
  }

  const { isLoading: plansLoading, data: plansData } = useQuery('Plans', Plans, {
    retry: false
  })

  const { isLoading, data } = useQuery(['Customer', user.accountId], Customer, {
    retry: false,
    onSuccess: data => {
      if (!isFreeTrial(user.account)) {
        const cs = data.data.subscriptions.data[0]
        if (cs) {
          setCurrentSubscription(cs)
          const sp = plansData.data.plans.filter(p => p.id === cs.plan.id)[0]
          setSelectedPlan(sp)
        } else {
          window.location.href = '/plan'
        }
      }
    }
  })

  const { isLoading: cardsLoading, data: cardsData } = useQuery(['CustomerCards', user.accountId], CustomerCards, {
    retry: false
  })

  const { isLoading: invoicesLoading, data: invoicesData } = useQuery(['CustomerInvoices', user.accountId], CustomerInvoices, {
    retry: false
  })

  if (isLoading || plansLoading || cardsLoading || invoicesLoading) {
    return <Loader />
  }

  return (
    <div className='dashboard-page'>
      {isFreeTrial(user.account)
        ? (<TrialComponent user={user} />)
        : (
          <>
            <Row>
              <Col className='contain-box' sm={12}>
                <Box
                  color='blue'
                  header={
                    <div>
                      <h1>{user.email}</h1>
                    </div>
                  }
                  body={
                    <div>
                      <p />
                      {hasFailedPayment(user.account)
                        ? (<>
                          <p><strong>{t('dashboardPage.failedPaymentAt')} {moment(user.account.paymentFailedFirstAt).format('DD/MM/YYYY')}</strong><br /></p>
                          <p><strong>{t('dashboardPage.subscriptionDeactivateOn')} {moment(user.account.paymentFailedSubscriptionEndsAt).format('DD/MM/YYYY')}</strong></p>
                           </>)
                        : (<p>
                          {currentSubscription.canceled_at
                            ? (<p><strong>{t('dashboardPage.subscriptionDeactivateOn')} {moment.unix(currentSubscription.current_period_end).format('DD/MM/YYYY')}</strong></p>)
                            : (<p><strong>{t('dashboardPage.subscriptionRenewOn')} {moment.unix(currentSubscription.current_period_end).format('DD/MM/YYYY')}</strong></p>)}
                           </p>
                          )}
                      {currentSubscription.status === 'past_due' && (
                        <p><strong>{t('dashboardPage.checkYourPayments')}</strong></p>
                      )}
                    </div>
                  }
                />
              </Col>
            </Row>

            <Row>
              <Col className='contain-box' sm={6}>
                <Box
                  header={
                    <div>
                      <div className='semicircle blue' />
                      <h1>{t('dashboardPage.yourSubscription')}</h1>
                    </div>
                  }
                  body={
                    <div>
                      <div className='inline-data'><strong>{t('dashboardPage.plan')}</strong><span className='right'>{selectedPlan.title}</span></div>
                      <div className='inline-data'><strong>{t('dashboardPage.price')}</strong><span className='right'>{formatMoney('it', selectedPlan.currency, selectedPlan.price)}</span></div>
                      {currentSubscription.canceled_at
                        ? (<>
                          <div className='inline-data'>
                            <strong>{t('dashboardPage.canceledAt')}</strong>
                            <div className='right'>{moment.unix(currentSubscription.canceled_at).format('DD/MM/YYYY')}</div>
                          </div>
                          <div className='inline-data'>
                            <strong>{t('dashboardPage.willDeactivateAt')}</strong>
                            <div className='right'>{moment.unix(currentSubscription.current_period_end).format('DD/MM/YYYY')}</div>
                          </div>
                           </>)
                        : (
                          <div className='inline-data'>
                            <strong>{t('dashboardPage.willRenewOn')}</strong>
                            <div className='right'>{moment.unix(currentSubscription.current_period_end).format('DD/MM/YYYY')}</div>
                          </div>
                          )}
                      {hasFailedPayment(user.account) && (
                        <div className='inline-data'>
                          <strong>{t('dashboardPage.paymentFailedAt')}</strong>
                          <div className='right'>{moment(user.account.paymentFailedFirstAt).format('DD/MM/YYYY')}</div>
                        </div>
                      )}
                      <Row>
                        <Col xs={6}><Link to='/plan' className='custom-btn green'>{t('dashboardPage.changePlan')}</Link></Col>
                        {!currentSubscription.canceled_at && (
                          <Col xs={6}><Button className='custom-btn red w-100-perc' onClick={() => cancelSubscription(currentSubscription.id)}>{t('dashboardPage.deleteSubscription')}</Button></Col>
                        )}
                      </Row>
                    </div>
                  }
                />
              </Col>
              <Col className='contain-box' sm={6}>
                <Box
                  header={
                    <div>
                      <div className='semicircle green' />
                      <h1>{t('dashboardPage.paymentMethods')}</h1>
                    </div>
                  }
                  body={
                    <div>
                      {cardsData.data.map((cardData, i) =>
                        <div className='inline-data' key={i}>
                          <span>{cardData.card.brand}</span>
                          <span>... {cardData.card.last4}</span>
                          <span>{cardData.card.exp_month}/{cardData.card.exp_year}</span>
                          {cardsData.data.length > 1 && (
                            <span className='right'>
                              {cardData.id === data.data.invoice_settings.default_payment_method || cardData.id === data.data.invoice_settings.default_payment_method.id
                                ? (<Button className='custom-btn mini inline green' onClick={() => { }}>{t('dashboardPage.default')}</Button>)
                                : (<><Button className='custom-btn mini inline red' onClick={() => removeCard(cardData.id)}>{t('dashboardPage.remove')}</Button><Button className='custom-btn mini inline grey' onClick={() => setDefaultCard(cardData.id)}>{t('dashboardPage.default')}</Button></>)}
                            </span>
                          )}
                        </div>
                      )}
                      <Row>
                        <Col sm={6} xs={12}><Link to='/card/add' className='custom-btn green'>{t('dashboardPage.addCreditCard')}</Link></Col>
                      </Row>
                    </div>
                  }
                />
              </Col>
            </Row>

            <Row>
              <Col className='contain-box' sm={12}>
                <Box
                  header={
                    <div>
                      <div className='semicircle green' />
                      <h1>{t('dashboardPage.paymentHistory')}</h1>
                    </div>
                  }
                  body={
                    <div>
                      <Table responsive>
                        <thead>
                          <tr>
                            <th scope='col'>{t('dashboardPage.paymentId')}</th>
                            <th scope='col'>{t('dashboardPage.status')}</th>
                            <th scope='col'>{t('dashboardPage.date')}</th>
                            <th scope='col'>{t('dashboardPage.total')}</th>
                            <th scope='col'>{t('dashboardPage.actions')}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {invoicesData.data.filter(invoice => (invoice.status === 'paid' || invoice.status === 'open')).map((invoice, i) =>
                            <tr key={`invoice-${i}`}>
                              <td>{invoice.number}</td>
                              <td>{invoice.paid ? t('dashboardPage.paid') : t('dashboardPage.toPay')}</td>
                              <td>{moment.unix(invoice.created).format('DD/MM/YYYY')}</td>
                              <td>
                                {formatMoney('it', selectedPlan.currency, invoice.total / 100)}
                              </td>
                              <td>
                                {invoice.hosted_invoice_url && invoice.status === 'open' && (
                                  <strong><a href={invoice.hosted_invoice_url} className='custom-btn mini inline red' target='_blank' rel='noreferrer'>{t('dashboardPage.toPay')}</a></strong>
                                )}
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </Table>
                    </div>
                  }
                />
              </Col>
            </Row>
          </>
          )}
    </div>
  )
}
export default DashboardPage

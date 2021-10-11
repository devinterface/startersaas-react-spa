import React, { } from 'react'
import { useTranslation } from 'react-i18next'
import { STRIPE_CONF } from 'config'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { Customer, CustomerCards, CustomerInvoices } from 'api/queries'
import { CancelSubscription, RemoveCreditCard, SetDefaultCreditCard } from 'api/mutations'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { confirmAlert } from 'react-confirm-alert' // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import Loader from 'app/components/Loader'
import { formatMoney } from 'libs/utils'
import { Button, Col, Row, Table } from 'react-bootstrap'
import Box from 'app/components/dashboard/Box'

const DashboardPage = (props) => {
  const { t } = useTranslation()

  const queryClient = useQueryClient()

  const cancelSubscriptionMutate = useMutation(CancelSubscription, {
    onSuccess: () => {
      queryClient.invalidateQueries(['Customer', props.user.accountId])
      queryClient.invalidateQueries(['CustomerInvoices', props.user.accountId])
    }
  })

  const removeCardMutate = useMutation(RemoveCreditCard, {
    onSuccess: () => {
      queryClient.invalidateQueries(['CustomerCards', props.user.accountId])
    }
  })

  const setDefaultCardMutate = useMutation(SetDefaultCreditCard, {
    onSuccess: () => {
      queryClient.invalidateQueries(['Customer', props.user.accountId])
    }
  })

  const cancelSubscription = async (subscriptionId) => {
    confirmAlert({
      title: t('Unsubscribe'),
      message: t('Are you sure to unsubscribe? In any case, your subscriptin will be active until the end of the paid period'),
      buttons: [
        {
          label: 'Si',
          onClick: async () => cancelSubscriptionMutate.mutate({ subscriptionId: subscriptionId })
        },
        {
          label: 'No',
          onClick: () => { }
        }
      ]
    })
  }

  const removeCard = async (cardId) => {
    confirmAlert({
      title: t('Remove the card'),
      message: t('Are you sure to remove this card?'),
      buttons: [
        {
          label: t('Yes'),
          onClick: async () => removeCardMutate.mutate({ cardId: cardId })
        },
        {
          label: t('No'),
          onClick: () => { }
        }
      ]
    })
  }

  const setDefaultCard = async (cardId) => {
    confirmAlert({
      title: t('Make default'),
      message: t('Are you sure to make this card the default one?'),
      buttons: [
        {
          label: t('Yes'),
          onClick: async () => setDefaultCardMutate.mutate({ cardId: cardId })
        },
        {
          label: t('No'),
          onClick: () => { }
        }
      ]
    })
  }

  const { isLoading, data } = useQuery(['Customer', props.user.accountId], Customer, {
    retry: false
  })

  const { isLoading: cardsLoading, data: cardsData } = useQuery(['CustomerCards', props.user.accountId], CustomerCards, {
    retry: false
  })

  const { isLoading: invoicesLoading, data: invoicesData } = useQuery(['CustomerInvoices', props.user.accountId], CustomerInvoices, {
    retry: false
  })

  if (isLoading || cardsLoading || invoicesLoading) {
    return <Loader />
  }

  const currentSubscription = data.data.subscriptions.data[0]

  const selectedPlan = STRIPE_CONF.plans.filter(p => p.id === currentSubscription.plan.id)[0]

  return (
    <div className='dashboard-page'>
      <Row>
        <Col className='contain-box' sm={8}>
          <Box
            color='blue'
            image={<img src='/images/articoliesocial-2.svg' />}
            header={
              <div>
                <h1>{props.user.email}</h1>
              </div>
            }
            body={
              <div>
                <p>
                  {t('In this panel you can manage your subscription and check your payment history')}
                </p>
                <p>
                  {currentSubscription.canceled_at
                    ? (<strong>{t('Your subscription will automatically deactivate on')} {moment.unix(currentSubscription.current_period_end).format('DD/MM/YYYY')}</strong>)
                    : (<strong>{t('Your subscription will automatically renew on')} {moment.unix(currentSubscription.current_period_end).format('DD/MM/YYYY')}</strong>)}
                </p>
              </div>
            }
          />
        </Col>
        <Col className='contain-box' sm={4}>
          <Box
            header={
              <div>
                <div className='semicircle blue' />
                <h1>{t('Your subscription')}</h1>
              </div>
            }
            body={
              <div>
                <div className='inline-data'><strong>{t('Plan')}</strong><span className='right'>{selectedPlan.title}</span></div>
                <div className='inline-data'><strong>{t('Price')}</strong><span className='right'>{formatMoney('it', selectedPlan.currency, selectedPlan.price)}</span></div>
                {selectedPlan.freeTrial && moment(Date.now()).isAfter(moment().unix(currentSubscription.trial_end)) && (
                  <div>
                    <div className='inline-data'><strong>{t('Trial period discount')}</strong><span className='right'>{formatMoney('it', selectedPlan.currency, selectedPlan.price)}</span></div>
                    <div className='inline-data'><strong>{t('Trial period end')}</strong><span className='right'>{moment.unix(currentSubscription.trial_end).format('DD/MM/YYYY')}</span></div>
                    <div className='inline-data'><strong>{t('Total')}</strong><span className='right'>€ 0,00</span></div>
                  </div>
                )}
                {currentSubscription.canceled_at && (
                  <>
                    <div className='inline-data'>
                      <strong>{t('Canceled at')}</strong>
                      <div className='right'>{moment.unix(currentSubscription.canceled_at).format('DD/MM/YYYY')}</div>
                    </div>
                    <div className='inline-data'>
                      <strong>{t('Will deactivate at')}</strong>
                      <div className='right'>{moment.unix(currentSubscription.current_period_end).format('DD/MM/YYYY')}</div>
                    </div>
                  </>
                )}
                {currentSubscription.canceled_at
                  ? (<></>)
                  : (
                    <div className='inline-data'>
                      <strong>{t('Will renew on')}</strong>
                      <div className='right'>{moment.unix(currentSubscription.current_period_end).format('DD/MM/YYYY')}</div>
                    </div>
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
                <div className='semicircle green' />
                <h1>{t('Your payment methods')}</h1>
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
                        <Button className='custom-btn mini inline red' onClick={() => removeCard(cardData.id)}>{t('remove')}</Button>
                        {cardData.id !== data.data.default_source
                          ? (<Button className='custom-btn mini inline grey' onClick={() => setDefaultCard(cardData.id)}>{t('default')}</Button>)
                          : (<Button className='custom-btn mini inline green' onClick={() => { }}>{t('default')}</Button>)}
                      </span>
                    )}
                  </div>
                )}
                <Row>
                  <Col sm={6} xs={12}><Link to='/card/add' className='custom-btn green'>{t('Add a credit card')}</Link></Col>
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
                <h1>{t('Manage your plan')}</h1>
              </div>
            }
            body={
              <div>
                <div className='inline-data'><strong>{t('Plan')}</strong><span className='right'>{selectedPlan.title}</span></div>
                <div className='inline-data'><strong>{t('Auto renew')}</strong><span className='right'>{moment.unix(currentSubscription.current_period_end).format('DD/MM/YYYY')}</span></div>
                <div className='inline-data'><strong>{t('Price')}</strong><span className='right'>{formatMoney('it', selectedPlan.currency, selectedPlan.price)}</span></div>
                <Row>
                  <Col xs={6}><Link to='/plan' className='custom-btn green'>{t('Change plan')}</Link></Col>
                  {!currentSubscription.canceled_at && (
                    <Col xs={6}><Button className='custom-btn red w-100-perc' onClick={() => cancelSubscription(currentSubscription.id)}>{t('Delete subscription')}</Button></Col>
                  )}
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
                <h1>{t('Payment history')}</h1>
              </div>
            }
            body={
              <div>
                <Table responsive>
                  <thead>
                    <tr>
                      <th scope='col'>{t('Payment ID')}</th>
                      <th scope='col'>{t('Status')}</th>
                      <th scope='col'>{t('Date')}</th>
                      <th scope='col'>{t('Total')}</th>
                      {/* <th scope='col'>{t('Receipt')}</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {invoicesData.data.filter(invoice => (invoice.status === 'paid')).map((invoice, i) =>
                      <tr key={`invoice-${i}`}>
                        <td>{invoice.number}</td>
                        <td>{invoice.paid ? 'Pagato' : 'Da pagare'}</td>
                        <td>{moment.unix(invoice.created).format('DD/MM/YYYY')}</td>
                        <td>
                          {formatMoney('it', selectedPlan.currency, invoice.total / 100)}
                        </td>
                        {/* <td><a href={invoice.invoice_pdf}>pdf</a></td> */}
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            }
          />
        </Col>
      </Row>
    </div>
  )
}
export default DashboardPage

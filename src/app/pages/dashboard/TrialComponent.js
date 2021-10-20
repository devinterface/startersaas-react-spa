import React, { } from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { Row } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import Box from 'app/components/dashboard/Box'

const TrialComponent = ({ user }) => {
  const { t } = useTranslation()
  return (
    <Row>
      <Box
        color='blue'
        image={<img src='/images/articoliesocial-2.svg' />}
        header={
          <div>
            <h1>{user.email}</h1>
          </div>
        }
        body={
          <div>
            <p>
              {t('You are currently working on the trial version of Starter SAAS. Enjoy!')}
            </p>
            <strong>{t('Trial period end')} {moment(user.account.trialPeriodEndsAt).format('DD/MM/YYYY')}</strong>
            <Link to='/plan' className='custom-btn green'>{t('Go to plans')}</Link>
          </div>
        }
      />
    </Row>
  )
}

export default TrialComponent

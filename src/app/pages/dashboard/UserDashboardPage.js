import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { isFreeTrial } from 'libs/utils'
import { Button, Col, Row, Table } from 'react-bootstrap'
import Box from 'app/components/dashboard/Box'

import TrialComponent from './TrialComponent'

const DashboardPage = ({ user }) => {
  const { t } = useTranslation()

  return (
    <div className='dashboard-page'>
      {isFreeTrial(user.account) ? (
        <TrialComponent user={user} />
      ) : (
        <>
          <Row>IMPLEMENT ME</Row>
        </>
      )}
    </div>
  )
}
export default DashboardPage

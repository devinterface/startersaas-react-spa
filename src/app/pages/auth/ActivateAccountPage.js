import React, { useEffect, useState } from 'react'
import { Activate } from 'api/mutations'
import { useMutation } from 'react-query'
import { useParams, useHistory } from 'react-router-dom'
import miniToastr from 'libs/minitoastr'
import { useTranslation } from 'react-i18next'

const ActivateAccountPage = (props) => {
  const { t } = useTranslation()

  const { token } = useParams()
  const mutation = useMutation(Activate)

  const history = useHistory()

  useEffect(() => {
    async function activate() {
      const response = await mutation.mutateAsync({ token: token })
      if (response) {
        miniToastr.success(t('User has been activated'))
        setTimeout(function () {
          window.location.href = '/auth/login'
        }, 1000)
      }
    }
    activate()
  })

  return (
    <></>
  )
}
export default ActivateAccountPage

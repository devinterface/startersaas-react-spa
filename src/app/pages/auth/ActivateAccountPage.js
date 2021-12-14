import React, { } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Activate } from 'api/mutations'
import { useMutation } from 'react-query'
import { useParams, Link } from 'react-router-dom'
import ConfirmAlert from 'libs/confirmAlert'
import { useTranslation } from 'react-i18next'
import { Col, Form, FormGroup } from 'react-bootstrap'

const schema = yup.object().shape({
  token: yup.string().min(6).required('Token is required')
})

const ActivateAccountPage = (props) => {
  const { t } = useTranslation()

  const { email } = useParams()

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })
  const mutation = useMutation(Activate)

  const onSubmit = async data => {
    data = { email: email, token: data.token }
    try {
      const response = await mutation.mutateAsync(data)
      if (response) {
        ConfirmAlert.success(t('activateAccountPage.accountActivated'))
        props.history.push('/auth/login')
      }
    } catch (error) {
      ConfirmAlert.error('activateAccountPage.activationFailure')
    }
  }

  return (
    <div>
      <h3 className='m-20 m-b-30'>{t('activateAccountPage.activateAccount')}</h3>
      <Form id='email-form' name='email-form' data-name='Email Form' className='form' onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <small id='passwordHelp' className='form-text text-muted'>{errors.token?.message}</small>
          <input className='form-control custom-input' type='string' maxLength='256' name='token' data-name='Token' placeholder={t('Token')} id='token' required='' {...register('token', { required: true })} />
        </FormGroup>
        <input type='submit' value={t('activateAccountPage.activate')} className='btn btn-primary' />
      </Form>
      <Col sm={12} className='text-center m-t-20'>
        <Link to='/auth/login'>{t('activateAccountPage.back')}</Link><br />
      </Col>
    </div>

  )
}
export default ActivateAccountPage

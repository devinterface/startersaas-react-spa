import React, { } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { ResendActivation } from 'api/mutations'
import { useMutation } from 'react-query'
import { Link } from 'react-router-dom'
import ConfirmAlert from 'libs/confirmAlert'
import { useTranslation } from 'react-i18next'
import { Col, Form, FormGroup } from 'react-bootstrap'

const schema = yup.object().shape({
  email: yup.string().email().required()
})

const ResendActivationPage = (props) => {
  const { t } = useTranslation()

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })
  const mutation = useMutation(ResendActivation)

  const onSubmit = async data => {
    try {
      const response = await mutation.mutateAsync(data)
      if (response) {
        ConfirmAlert.success('resendActivationPage.emailSent')
        props.history.push(`/auth/activate/${data.email}`)
      }
    } catch (error) {
      ConfirmAlert.error('resendActivationPage.invalidEmail')
    }
  }

  return (
    <div>
      <h3 className='m-20 m-b-30'>{t('resendActivationPage.resendActivationCode')}</h3>
      <Form id='email-form' name='email-form' data-name='Email Form' className='form' onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <small id='emailHelp' className='form-text text-muted'>{errors.email?.message}</small>
          <input type='email' className='form-control custom-input' maxLength='256' aria-describedby='emailHelp' name='email' data-name='Email' placeholder='Email' id='email' {...register('email', { required: true })} />
        </FormGroup>
        <input type='submit' value={t('resendActivationPage.confirm')} className='btn btn-primary m-t-20' />
      </Form>
      <Col sm={12} className='text-center m-t-20'>
        <Link to='/auth/login'>{t('resendActivationPage.back')}</Link><br />
      </Col>
    </div>
  )
}
export default ResendActivationPage

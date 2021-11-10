import React, { } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { ResetPassword } from 'api/mutations'
import { useMutation } from 'react-query'
import { useParams, Link } from 'react-router-dom'
import miniToastr from 'libs/minitoastr'
import { useTranslation } from 'react-i18next'
import { Col, Form, FormGroup } from 'react-bootstrap'


const schema = yup.object().shape({
  password: yup.string().min(8).required('Password is required')
})

const ResetPasswordPage = (props) => {
  const { t } = useTranslation()

  const { email } = useParams()

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema)
  })
  const mutation = useMutation(ResetPassword)

  const onSubmit = async data => {
    data = { email: email, passwordResetToken: data.passwordResetToken, password: data.password }
    try {
      const response = await mutation.mutateAsync(data)
      if (response) {
        miniToastr.success(t('Your password has been successfully updated'))
        props.history.push('/auth/login')
      }
    } catch (error) {
      miniToastr.error('Reset password went wrong, please retry')
    }
  }

  return (
    <div>
      <h3 className='m-20 m-b-30'>{t('Change password')}</h3>
      <Form id='email-form' name='email-form' data-name='Email Form' className='form' onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <small id='passwordResetTokenHelp' className='form-text text-muted'>{errors.passwordResetToken?.message}</small>
          <input className='form-control custom-input' type='string' maxLength='256' name='passwordResetToken' data-name='Token' placeholder='passwordResetToken' id='passwordResetToken' required='' ref={register} />
          <p>{errors.passwordResetToken?.message}</p>
        </FormGroup>
        <FormGroup>
          <small id='passwordHelp' className='form-text text-muted'>{errors.password?.message}</small>
          <input className='form-control custom-input' type='password' maxLength='256' name='password' data-name='Password' placeholder='Password' id='password' required='' ref={register} />
          <p>{errors.password?.message}</p>
        </FormGroup>
        <input type='submit' value={t('Update password')} className='btn btn-primary' />
      </Form>
      <Col sm={12} className='text-center m-t-20'>
        <Link to='/auth/login'>{t('Back to login page')}</Link><br />
      </Col>
    </div>

  )
}
export default ResetPasswordPage

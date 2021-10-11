import React, { } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { ResetPassword } from 'api/mutations'
import { useMutation } from 'react-query'
import { useParams } from 'react-router-dom'
import miniToastr from 'libs/minitoastr'
import { useTranslation } from 'react-i18next'
import { Form, FormGroup } from 'react-bootstrap'

const schema = yup.object().shape({
  password: yup.string().min(8).required('Password is required'),
  passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], "Passwords don't match").required('Confirm Password is required')
})

const ResetPasswordPage = (props) => {
  const { t } = useTranslation()

  const { passwordResetToken } = useParams()

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema)
  })
  const mutation = useMutation(ResetPassword)

  const onSubmit = async data => {
    data = { passwordResetToken: passwordResetToken, password: data.password }
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
          <small id='passwordHelp' className='form-text text-muted'>{errors.password?.message}</small>
          <input className='form-control custom-input' type='password' maxLength='256' name='password' data-name='Password' placeholder='Password' id='password' required='' ref={register} />
          <p>{errors.password?.message}</p>
        </FormGroup>
        <FormGroup>
          <small id='passwordHelp' className='form-text text-muted'>{errors.passwordConfirmation?.message}</small>
          <input className='form-control custom-input' type='password' maxLength='256' name='passwordConfirmation' data-name='Password Confirmation' placeholder={t('Password confirmation')} id='passwordConfirmation' required='' ref={register} />
        </FormGroup>
        <input type='submit' value={t('Update password')} className='btn btn-primary' />
      </Form>
    </div>

  )
}
export default ResetPasswordPage

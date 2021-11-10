import React, { } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Register } from 'api/mutations'
import { useMutation } from 'react-query'
import { Link } from 'react-router-dom'
import miniToastr from 'libs/minitoastr'
import { useTranslation } from 'react-i18next'
import { v4 as uuidv4 } from 'uuid'
import { Col, Form, FormGroup } from 'react-bootstrap'

const RegisterPage = (props) => {
  const mutation = useMutation(Register)
  const { t } = useTranslation()

  const schema = yup.object().shape({
    subdomain: yup.string().matches(/^[a-z0-9](-?[a-z0-9])*$/, { excludeEmptyString: false, message: t('Invalid subdomain format') }).lowercase().required(),
    email: yup.string().lowercase().email().required(),
    password: yup.string().min(8).required(),
    policy: yup.boolean()
      .required(t('The terms and conditions must be accepted.'))
      .oneOf([true], t('The terms and conditions must be accepted.'))
  })

  const slugify = value => {
    const slug = value.toString().toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[^\w\-]+/g, '') // Remove all non-word chars
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
    setValue('subdomain', slug)
  }

  const { register, handleSubmit, errors, setValue } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async data => {
    delete data.policy
    try {
      const response = await mutation.mutateAsync(data)
      if (response) {
        miniToastr.success(t('An email with the activation token has been sent. Check your inbox.'))
        props.history.push(`/auth/activate/${data.email}`)
      }
    } catch (error) {
      miniToastr.error(t('Email or password invalid'))
    }
  }

  return (
    <div>
      <h3 className='m-20 m-b-30'>{t('Register')}</h3>
      <Form id='email-form' name='email-form' data-name='Email Form' className='form' onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <small id='subdomainHelp' className='form-text text-muted'>{errors.subdomain?.message}</small>
          <input type='subdomain' className='form-control custom-input' maxLength='256' aria-describedby='subdomainHelp' name='subdomain' data-name='Subdomain' placeholder='Subdomain' id='subdomain' ref={register} onChange={e => slugify(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <small id='emailHelp' className='form-text text-muted'>{errors.email?.message}</small>
          <input type='email' className='form-control custom-input' maxLength='256' aria-describedby='emailHelp' name='email' data-name='Email' placeholder='E-mail' id='email' ref={register} />
        </FormGroup>
        <FormGroup>
          <small id='passwordHelp' className='form-text text-muted'>{errors.password?.message}</small>
          <input type='password' className='form-control custom-input' maxLength='256' name='password' data-name='Password' placeholder='Password' id='password' required='' ref={register} />
        </FormGroup>
        <FormGroup>
          <small id='policyHelp' className='form-text text-muted'>{errors.policy?.message}</small>
          <input
            type='checkbox' id='policy' name='policy' data-name='Checkbox'
            className='w-checkbox-input checkbox'
            ref={register}
            aria-describedby='policyHelp'
          />
          <span className='checkbox-label w-form-label'>{t("By clicking on the 'Register' button I consent the terms and conditions of the service and I understand that my account's informations will be used according to the privacy policy.")}</span>
          <br />
          <a href='/' target='_blank'>{t('Terms and Conditions')}</a>
          <br />
          <a href='/' target='_blank'>{t('Privacy and Policy')}</a>
        </FormGroup>
        <input type='submit' value='Conferma' className='btn btn-primary m-t-20' />
      </Form>
      <Col sm={12} className='text-center m-t-20'>
        <Link to='/auth/login'>{t('Already registered?')}</Link><br />
        <Link to={{ pathname: '/auth/resend-activation' }}>{t('Didn\'t receive the activation email?')}</Link><br />
      </Col>
    </div>
  )
}
export default RegisterPage

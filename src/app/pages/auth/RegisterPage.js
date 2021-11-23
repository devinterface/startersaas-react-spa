import React, { } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Register } from 'api/mutations'
import { useMutation } from 'react-query'
import { Link } from 'react-router-dom'
import ConfirmAlert from 'libs/confirmAlert'
import { useTranslation } from 'react-i18next'
import { Col, Form, FormGroup } from 'react-bootstrap'

const RegisterPage = (props) => {
  const mutation = useMutation(Register)
  const { t } = useTranslation()

  const schema = yup.object().shape({
    subdomain: yup.string().matches(/^[a-z0-9](-?[a-z0-9])*$/, { excludeEmptyString: false, message: t('Invalid subdomain format') }).lowercase().required(),
    email: yup.string().lowercase().email().required(),
    password: yup.string().min(8).required(),
    privacyAccepted: yup.boolean()
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

  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async data => {
    try {
      const response = await mutation.mutateAsync(data)
      if (response) {
        ConfirmAlert.success(t('An email with the activation token has been sent. Check your inbox.'))
        props.history.push(`/auth/activate/${data.email}`)
      }
    } catch (error) {
      ConfirmAlert.error(t('Email or password invalid'))
    }
  }

  return (
    <div>
      <h3 className='m-20 m-b-30'>{t('Register')}</h3>
      <Form id='email-form' name='email-form' data-name='Email Form' className='form' onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <small id='subdomainHelp' className='form-text text-muted'>{errors.subdomain?.message}</small>
          <input type='subdomain' className='form-control custom-input' maxLength='256' aria-describedby='subdomainHelp' name='subdomain' data-name='Subdomain' placeholder='Subdomain' id='subdomain' {...register('subdomain', { required: true })} onChange={e => slugify(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <small id='emailHelp' className='form-text text-muted'>{errors.email?.message}</small>
          <input type='email' className='form-control custom-input' maxLength='256' aria-describedby='emailHelp' name='email' data-name='Email' placeholder='E-mail' id='email' {...register('email', { required: true })} />
        </FormGroup>
        <FormGroup>
          <small id='passwordHelp' className='form-text text-muted'>{errors.password?.message}</small>
          <input type='password' className='form-control custom-input' maxLength='256' name='password' data-name='Password' placeholder='Password' id='password' required='' {...register('password', { required: true })} />
        </FormGroup>
        <FormGroup>
          <small id='privacyAcceptedHelp' className='form-text text-muted'>{errors.privacyAccepted?.message}</small>
          <input
            type='checkbox' id='privacyAccepted' name='policy' data-name='Checkbox'
            className='w-checkbox-input checkbox'
            {...register('privacyAccepted', { required: true })}
            aria-describedby='privacyAcceptedHelp'
          />
          <span className='checkbox-label w-form-label text-justify'>&nbsp;{t("By clicking on the 'Register' button I consent the terms and conditions of the service and I understand that my account's informations will be used according to the privacy policy.")}</span>
          <br />
          <a href='/' target='_blank'>{t('Terms and Conditions')}</a>
          <br />
          <a href='/' target='_blank'>{t('Privacy and Policy')}</a>
        </FormGroup>
        <FormGroup>
          <small id='marketingAcceptedHelp' className='form-text text-muted'>{errors.marketingAccepted?.message}</small>
          <input
            type='checkbox' id='marketingAccepted' name='policy' data-name='Checkbox'
            className='w-checkbox-input checkbox'
            {...register('marketingAccepted')}
            aria-describedby='marketingAcceptedHelp'
          />
          <span className='checkbox-label w-form-label text-justify'>&nbsp;{t('Starter SAAS is committed to protecting and respecting your privacy, and will only use your personal information to administer your account and to provide the service you have requested. From time to time, we would like to contact you about our products and services, as well as other content that may be of interest to you.')}</span>
        </FormGroup>
        <input type='submit' value='Conferma' className='btn btn-primary m-t-20' />
      </Form>
      <Col sm={12} className='text-justify m-t-20'>
        <Link to='/auth/login'>{t('Already registered?')}</Link><br />
        <Link to={{ pathname: '/auth/resend-activation' }}>{t('Didn\'t receive the activation email?')}</Link><br />
      </Col>
    </div>
  )
}
export default RegisterPage

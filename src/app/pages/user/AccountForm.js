import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useTranslation } from 'react-i18next'
import { Form, Button } from 'react-bootstrap'
import { countries } from 'libs/countries'

const schema = yup.object().shape({
  companyName: yup.string().required(),
  companyPhone: yup.string().required(),
  companyBillingAddress: yup.string().required(),
  companyCountry: yup.string().required(),
  companyVat: yup.string().required(),
  companyEmail: yup
    .string()
    .lowercase()
    .email()
    .required(),
  companySdi: yup.string(),
  companyPec: yup
    .string()
    .lowercase()
    .email()
    .required()
})

const AccountForm = ({ user, onSubmit }) => {
  const { t } = useTranslation()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      companyName: user.account.companyName,
      companyPhone: user.account.companyPhone,
      companyBillingAddress: user.account.companyBillingAddress,
      companyVat: user.account.companyVat,
      companySdi: user.account.companySdi,
      companyPec: user.account.companyPec,
      companyEmail: user.account.companyEmail,
      companyCountry: user.account.companyCountry
    }
  })

  return (
    <Form
      id='email-form'
      name='email-form'
      data-name='Email Form'
      onSubmit={handleSubmit(onSubmit)}
    >
      <Form.Group controlId='formCompanyName'>
        <Form.Label>{t('accountForm.companyName')}</Form.Label>
        <Form.Control
          type='text'
          maxLength='256'
          name='companyName'
          data-name='Compnay Name'
          placeholder=''
          id='companyName'
          {...register('companyName', { required: true })}
        />
        <span className='text-muted'>{errors.companyName?.message}</span>
      </Form.Group>
      <Form.Group controlId='formCompanyPhone'>
        <Form.Label>{t('accountForm.phoneNumber')}</Form.Label>
        <Form.Control
          type='text'
          maxLength='256'
          name='companyPhone'
          data-name='Company Phone'
          placeholder=''
          id='companyPhone'
          {...register('companyPhone', { required: true })}
        />
        <span className='text-muted'>{errors.companyPhone?.message}</span>
      </Form.Group>
      <Form.Group controlId='formcompanyBillingAddress'>
        <Form.Label>{t('accountForm.billingAddress')}</Form.Label>
        <Form.Control
          type='text'
          maxLength='256'
          name='companyBillingAddress'
          data-name='Company Billing Address'
          placeholder=''
          id='companyBillingAddress'
          {...register('companyBillingAddress', { required: true })}
        />
        <span className='text-muted'>
          {errors.companyBillingAddress?.message}
        </span>
      </Form.Group>
      <Form.Group controlId='formcompanyCountry'>
        <Form.Label>{t('accountForm.companyCountry')}</Form.Label>
        <Form.Control
          as='select'
          id='companyCountry'
          {...register('companyCountry', { required: true })}
        >
          <option>{t('accountForm.selectOne')}</option>
          {countries.map((value, index) => {
            return (
              <option key={index} value={value.code}>
                {value.name} {value.flag}
              </option>
            )
          })}
        </Form.Control>
        <span className='text-muted'>{errors.companyCountry?.message}</span>
      </Form.Group>
      <Form.Group controlId='formcompanyVat'>
        <Form.Label>{t('accountForm.vatNumber')}</Form.Label>
        <Form.Control
          type='text'
          maxLength='256'
          name='companyVat'
          data-name='Company Vat'
          placeholder=''
          id='companyVat'
          {...register('companyVat', { required: true })}
        />
        <span className='text-muted'>{errors.companyVat?.message}</span>
      </Form.Group>
      <Form.Group controlId='formcompanyEmail'>
        <Form.Label>{t('Email')}</Form.Label>
        <Form.Control
          type='text'
          maxLength='256'
          name='companyEmail'
          data-name='Email'
          placeholder=''
          id='companyEmail'
          {...register('companyEmail', { required: true })}
        />
        <span className='text-muted'>{errors.companyEmail?.message}</span>
      </Form.Group>
      <Form.Group controlId='formcompanyPec'>
        <Form.Label>{t('PEC')}</Form.Label>
        <Form.Control
          type='text'
          maxLength='256'
          name='companyPec'
          data-name='Company Pec'
          placeholder=''
          id='companyPec'
          {...register('companyPec')}
        />
        <span className='text-muted'>{errors.companyPec?.message}</span>
      </Form.Group>
      <Form.Group controlId='formcompanySdi'>
        <Form.Label>{t('SDI')}</Form.Label>
        <Form.Control
          type='text'
          maxLength='256'
          name='companySdi'
          data-name='Company SDI'
          placeholder=''
          id='companySdi'
          {...register('companySdi')}
        />
        <span className='text-muted'>{errors.companySdi?.message}</span>
      </Form.Group>

      <Button
        type='submit'
        className='custom-btn green w-100-perc'
        data-wait='Please wait...'
      >
        {t('accountForm.update')}
      </Button>
    </Form>
  )
}

export default AccountForm

import React, { } from 'react'
import { useForm } from 'react-hook-form'
import { UpdateAccount } from 'api/mutations'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from 'react-query'
import { useTranslation } from 'react-i18next'
import miniToastr from 'libs/minitoastr'
import { Col, Row, Form, Button } from 'react-bootstrap'
import Box from 'app/components/dashboard/Box'

const schema = yup.object().shape({
  companyName: yup.string().required(),
  companyPhone: yup.string().required(),
  companyBillingAddress: yup.string().required(),
  companyVat: yup.string().required(),
  companyEmail: yup.string().lowercase().email().required(),
  companySdi: yup.string(),
  companyPec: yup.string().lowercase().email().required()
})

const EditAccountPage = (props) => {
  const { t } = useTranslation()

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      companyName: props.user.account.companyName,
      companyPhone: props.user.account.companyPhone,
      companyBillingAddress: props.user.account.companyBillingAddress,
      companyVat: props.user.account.companyVat,
      companySdi: props.user.account.companySdi,
      companyPec: props.user.account.companyPec,
      companyEmail: props.user.account.companyEmail
    }
  })

  const mutation = useMutation(UpdateAccount)

  const onSubmit = async data => {
    try {
      const response = await mutation.mutateAsync({ accountId: props.user.accountId, data: data })
      if (response) {
        miniToastr.success(t('Billing details have been successfully updated'))
      }
    } catch (error) {
    }
  }

  return (
    <Row>
      <Col xs={12}>
        <Box
          header={
            <h1>{t('Billing details')}</h1>
          }
          body={
            <div>
              <Form id='email-form' name='email-form' data-name='Email Form' onSubmit={handleSubmit(onSubmit)}>
                <Form.Group controlId='formCompanyName'>
                  <Form.Label>{t('Company name')}</Form.Label>
                  <Form.Control type='text' maxLength='256' name='companyName' data-name='Company Name' placeholder='' id='companyName' ref={register} />
                  <span className='text-muted'>
                    {errors.companyName?.message}
                  </span>
                </Form.Group>
                <Form.Group controlId='formCompanyPhone'>
                  <Form.Label>{t('Phone number')}</Form.Label>
                  <Form.Control type='text' maxLength='256' name='companyPhone' data-name='Company Phone' placeholder='' id='companyPhone' ref={register} />
                  <span className='text-muted'>
                    {errors.companyPhone?.message}
                  </span>
                </Form.Group>
                <Form.Group controlId='formcompanyBillingAddress'>
                  <Form.Label>{t('Billing address')}</Form.Label>
                  <Form.Control type='text' maxLength='256' name='companyBillingAddress' data-name='Company Billing Address' placeholder='' id='companyBillingAddress' ref={register} />
                  <span className='text-muted'>
                    {errors.companyBillingAddress?.message}
                  </span>
                </Form.Group>
                <Form.Group controlId='formcompanyVat'>
                  <Form.Label>{t('VAT number')}</Form.Label>
                  <Form.Control type='text' maxLength='256' name='companyVat' data-name='Company Vat' placeholder='' id='companyVat' ref={register} />
                  <span className='text-muted'>
                    {errors.companyVat?.message}
                  </span>
                </Form.Group>
                <Form.Group controlId='formcompanyEmail'>
                  <Form.Label>{t('Email')}</Form.Label>
                  <Form.Control type='text' maxLength='256' name='companyEmail' data-name='Email' placeholder='' id='companyEmail' ref={register} />
                  <span className='text-muted'>
                    {errors.companyEmail?.message}
                  </span>
                </Form.Group>
                <Form.Group controlId='formcompanyPec'>
                  <Form.Label>{t('PEC')}</Form.Label>
                  <Form.Control type='text' maxLength='256' name='companyPec' data-name='Company Pec' placeholder='' id='companyPec' ref={register} />
                  <span className='text-muted'>
                    {errors.companyPec?.message}
                  </span>
                </Form.Group>
                <Form.Group controlId='formcompanySdi'>
                  <Form.Label>{t('SDI')}</Form.Label>
                  <Form.Control type='text' maxLength='256' name='companySdi' data-name='Company SDI' placeholder='' id='companySdi' ref={register} />
                  <span className='text-muted'>
                    {errors.companySdi?.message}
                  </span>
                </Form.Group>

                <Button type='submit' className='custom-btn green w-100-perc' data-wait='Please wait...' ref={register}>{t('Update billing details')}</Button>
              </Form>
            </div>
          }
        />

      </Col>
    </Row>
  )
}

export default EditAccountPage

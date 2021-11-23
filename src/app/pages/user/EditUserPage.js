import React, { } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { ChangePassword } from 'api/mutations'
import { useMutation } from 'react-query'
import ConfirmAlert from 'libs/confirmAlert'
import { useTranslation } from 'react-i18next'
import { Form, Row, Col, Button } from 'react-bootstrap'
import Box from 'app/components/dashboard/Box'

const schema = yup.object().shape({
  password: yup.string().min(8).required('Password is required')
})

const EditUserPage = (props) => {
  const { t } = useTranslation()

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })
  const mutation = useMutation(ChangePassword)

  const onSubmit = async data => {
    data = { password: data.password }
    const response = await mutation.mutateAsync(data)
    if (response) {
      ConfirmAlert.success(t('Your password has been successfully updated'))
      props.history.push('/')
    }
  }

  return (
    <Row>
      <Col xs={12}>
        <Box
          header={
            <div>
              <h1>{t('Change password')}</h1>
              <p>{t('Insert the new password')}</p>
            </div>
          }
          body={
            <div>
              <Form id='email-form' name='email-form' data-name='Reset Password Form' onSubmit={handleSubmit(onSubmit)}>
                <Form.Group controlId='formPassword'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control type='password' maxLength='256' name='password' data-name='password' placeholder='' id='password' {...register('password', { required: true })} />
                  <span className='text-muted'>
                    {errors.password?.message}
                  </span>
                </Form.Group>
                <Button type='submit' className='custom-btn green w-100-perc' data-wait='Please wait...'>{t('Update password')}</Button>
              </Form>
            </div>
          }
        />
      </Col>
    </Row>
  )
}
export default EditUserPage

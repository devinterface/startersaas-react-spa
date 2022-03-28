import React from 'react'
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
  name: yup.string().required(),
  surname: yup.string().required(),
  email: yup
    .string()
    .lowercase()
    .email()
    .required()
})

const UsersForm = ({ user, onSubmit, showEmail }) => {
  const { t } = useTranslation()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: user.name,
      surname: user.surname,
      email: user.email,
      language: user.language,
      role: user.role
    }
  })

  return (
    <Form
      id='users-form'
      name='users-form'
      data-name='Users Form'
      onSubmit={handleSubmit(onSubmit)}
    >
      <Form.Group controlId='formUserName'>
        <Form.Label>{t('usersForm.name')}</Form.Label>
        <Form.Control
          type='text'
          maxLength='256'
          name='name'
          data-name='name'
          placeholder=''
          id='name'
          {...register('name', { required: true })}
        />
        <span className='text-muted'>{errors.name?.message}</span>
      </Form.Group>
      <Form.Group controlId='formUserSurname'>
        <Form.Label>{t('usersForm.surname')}</Form.Label>
        <Form.Control
          type='text'
          maxLength='256'
          name='surname'
          data-name='surname'
          placeholder=''
          id='surname'
          {...register('surname', { required: true })}
        />
        <span className='text-muted'>{errors.surname?.message}</span>
      </Form.Group>
      {showEmail && (
        <Form.Group controlId='formUserEmail'>
          <Form.Label>{t('usersForm.email')}</Form.Label>
          <Form.Control
            type='email'
            maxLength='256'
            name='email'
            data-name='email'
            placeholder=''
            id='email'
            {...register('email', { required: true })}
          />
          <span className='text-muted'>{errors.surname?.message}</span>
        </Form.Group>
      )}
      <Form.Group controlId='formUserLanguage'>
        <Form.Label>{t('usersForm.language')}</Form.Label>
        <Form.Control
          size='lg'
          name='language'
          data-name='language'
          id='language'
          as='select'
          {...register('language', { required: true })}
        >
          <option value='en'>en</option>
          <option value='it'>it</option>
        </Form.Control>
        <span className='text-muted'>{errors.language?.message}</span>
      </Form.Group>
      <Form.Group controlId='formUserRole'>
        <Form.Label>{t('usersForm.role')}</Form.Label>
        <Form.Control
          size='lg'
          name='role'
          data-name='role'
          id='role'
          as='select'
          {...register('role', { required: true })}
        >
          <option value='user'>{t('usersForm.user')}</option>
          <option value='admin'>{t('usersForm.admin')}</option>
        </Form.Control>
        <span className='text-muted'>{errors.role?.message}</span>
      </Form.Group>
      <Button
        type='submit'
        className='custom-btn green w-100-perc'
        data-wait='Please wait...'
      >
        {t('usersForm.save')}
      </Button>
    </Form>
  )
}
export default UsersForm

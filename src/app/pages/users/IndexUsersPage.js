import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { Users } from 'api/queries'
import { CreateUser, UpdateUser, DeleteUser } from 'api/mutations'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { confirmAlert } from 'react-confirm-alert' // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import Loader from 'app/components/Loader'
import { Button, Col, Row, Table } from 'react-bootstrap'
import Box from 'app/components/dashboard/Box'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'

const IndexUsersPage = ({ user }) => {
  const { t } = useTranslation()

  const queryClient = useQueryClient()

  const deleteUserMutate = useMutation(DeleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(['Users', user.accountId])
    }
  })

  const deleteUser = async userId => {
    confirmAlert({
      title: t('indexUsersPage.deleteUser'),
      message: t('indexUsersPage.areYouSureToDelete'),
      buttons: [
        {
          label: t('indexUsersPage.yes'),
          onClick: async () => deleteUserMutate.mutate(userId)
        },
        {
          label: t('indexUsersPage.no'),
          onClick: () => {}
        }
      ]
    })
  }

  const { isLoading, data } = useQuery(['Users', user.accountId], Users, {
    retry: false
  })

  if (isLoading) {
    return <Loader />
  }

  return (
    <Row>
      <Col cs={12}>
        <Box
          header={
            <div>
              <div className='semicircle green' />
              <h1>{t('indexUsersPage.users')}</h1>
            </div>
          }
          body={
            <div>
              <Table responsive>
                <thead>
                  <tr>
                    <th scope='col'>{t('indexUsersPage.name')}</th>
                    <th scope='col'>{t('indexUsersPage.surname')}</th>
                    <th scope='col'>{t('indexUsersPage.email')}</th>
                    <th scope='col'>{t('indexUsersPage.role')}</th>
                    <th scope='col'>{t('indexUsersPage.actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {data.data.map((user, i) => (
                    <tr key={`user-${i}`}>
                      <td>{user.name}</td>
                      <td>{user.surname}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>
                        {!user.accountOwner && (
                          <Link
                            to={`/edit-user/${user.id}`}
                            className='mr-2'
                            id='user-edit'
                            title={t('indexUsersPage.editUser')}
                          >
                            <FontAwesomeIcon icon={faEdit} />
                            <span className='only-mobile'>
                              {t('indexUsersPage.editUser')}
                            </span>
                          </Link>
                        )}
                        {!user.accountOwner && (
                          <Link
                            onClick={() => deleteUser(user.id)}
                            id='user-edit'
                            title={t('indexUsersPage.deleteUser')}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                            <span className='only-mobile'>
                              {t('indexUsersPage.deleteUser')}
                            </span>
                          </Link>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Link to='/create-user' className='custom-btn green w-100-perc'>
                {t('indexUsersPage.addUser')}
              </Link>
            </div>
          }
        />
      </Col>
    </Row>
  )
}
export default IndexUsersPage

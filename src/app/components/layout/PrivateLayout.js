import BaseFooter from 'app/components/layout/BaseFooter'
import { useTranslation } from 'react-i18next'
import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Logout, UpdateMe } from 'api/mutations'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSignOutAlt,
  faUserEdit,
  faMoneyBill
} from '@fortawesome/free-solid-svg-icons'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import { Container, Col, Form, FormGroup } from 'react-bootstrap'
import { selectedPlanState } from 'libs/atoms'
import { useRecoilState } from 'recoil'
import '../../../css/privateLayout/private.css'

const PrivateLayout = ({ children, user }) => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  const [selectedPlan, setSelectedPlan] = useRecoilState(selectedPlanState)

  const history = useHistory()

  const goToHome = () => {
    setSelectedPlan(undefined)
    history.push('/dashboard')
  }

  const logout = () => {
    Logout()
    window.location.href = '/auth/login'
  }

  const { register, handleSubmit } = useForm({
    defaultValues: { language: user.language }
  })
  const mutation = useMutation(UpdateMe, {
    onSuccess: () => {
      queryClient.invalidateQueries(['Me'])
    }
  })

  const onSubmit = async data => {
    data = { language: data.language }
    await mutation.mutateAsync(data)
  }

  return (
    <div className='d-flex flex-column' id='h100'>
      <div id='page-content'>
        <header>
          <div className='container-fluid'>
            <div className='row d-lg-flex justify-content-lg-center'>
              <div className='col-md-12 col-lg-12 col-xl-8'>
                <nav className='navbar navbar-light navbar-expand-md sticky-top d-xl-flex'>
                  <div className='container-fluid'>
                    <a className='navbar-brand' onClick={goToHome}>
                      <img
                        className='logo'
                        src='/images/logo-startersaas.svg'
                      />
                    </a>
                    <button
                      data-toggle='collapse'
                      className='navbar-toggler'
                      data-target='#navcol-1'
                    >
                      <span className='sr-only'>
                        {t('privateLayout.toggle')}
                      </span>
                      <span className='navbar-toggler-icon' />
                    </button>
                    <div
                      className='collapse navbar-collapse d-md-flex d-lg-flex justify-content-md-start justify-content-lg-end'
                      id='navcol-1'
                    >
                      <ul className='navbar-nav d-md-flex flex-grow-1 justify-content-md-end flex-lg-grow-0 justify-content-xl-end'>
                        <li className='nav-item'>
                          <form onChange={handleSubmit(onSubmit)}>
                            <select {...register('language')}>
                              <option value='it'>IT</option>
                              <option value='en'>EN</option>
                            </select>
                          </form>
                        </li>
                        {user.role === 'admin' && (
                          <li className='nav-item'>
                            <Link
                              to='/account/edit'
                              className='menu-link'
                              id='account-edit'
                              title={t('privateLayout.billingDetails')}
                            >
                              <FontAwesomeIcon icon={faMoneyBill} />
                              <span className='only-mobile'>
                                {t('privateLayout.billingDetails')}
                              </span>
                            </Link>
                          </li>
                        )}
                        <li className='nav-item'>
                          <Link
                            to='/user/edit'
                            className='menu-link'
                            id='user-edit'
                            title={t('privateLayout.editUser')}
                          >
                            <FontAwesomeIcon icon={faUserEdit} />
                            <span className='only-mobile'>
                              {t('privateLayout.editUser')}
                            </span>
                          </Link>
                        </li>
                        <li className='nav-item'>
                          <a
                            href='#'
                            onClick={logout}
                            className='menu-link'
                            id='logout'
                            title={t('privateLayout.logout')}
                          >
                            <FontAwesomeIcon icon={faSignOutAlt} />
                            <span className='only-mobile'>
                              {t('privateLayout.logout')}
                            </span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </header>
        <Container className='first-container'>{children}</Container>
      </div>
      <BaseFooter />
    </div>
  )
}

export default PrivateLayout

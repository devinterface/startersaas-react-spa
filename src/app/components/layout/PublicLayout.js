import BaseFooter from 'app/components/layout/BaseFooter'
import React from 'react'
import '../../../css/publicLayout/public.css'

const PublicLayout = ({ children }) => {
  return (
    <div>
      <header>
        <div className='container-fluid'>
          <div className='row d-lg-flex justify-content-lg-center'>
            <div className='col-md-12 col-lg-12 col-xl-8'>
              <nav className='navbar navbar-light navbar-expand-md sticky-top d-xl-flex'>
                <div className='container-fluid'><a className='navbar-brand'>
                  <div><img className='logo' src='/images/logo-startersaas.svg' /></div>
                </a><button data-toggle='collapse' className='navbar-toggler' data-target='#navcol-1'><span className='sr-only'>Toggle navigation</span><span className='navbar-toggler-icon' /></button>
                  <div className='collapse navbar-collapse d-md-flex d-lg-flex justify-content-md-start justify-content-lg-end' id='navcol-1'>
                    <ul className='navbar-nav d-md-flex flex-grow-1 justify-content-md-end flex-lg-grow-0 justify-content-xl-end'>
                      <li className='nav-item'><a className='nav-link active' href='#vantaggi'>Vantaggi</a></li>
                      <li className='nav-item'><a className='nav-link active' href='#prezzi'>Prezzi</a></li>
                      <li className='nav-item'><a className='nav-link active' href='#chi-siamo'>Chi siamo</a></li>
                      <li className='nav-item'><a className='nav-link active' href='#servizi'>Servizi</a></li>
                      <li className='nav-item'><a className='nav-link active' href='#contatti'>Contattaci</a></li>
                      <li className='nav-item'><a className='nav-link active' href='/auth/login'>Accedi</a></li>
                    </ul>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>
      {children}
      <BaseFooter />
    </div>
  )
}

export default PublicLayout

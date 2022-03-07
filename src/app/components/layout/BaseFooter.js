import React from 'react'

const BaseFooter = () => {
  return (
    <footer id='sticky-footer' className='flex-shrink-0 py-4 bg-white text-dark-50'>
      {/* <div className='container d-flex justify-content-evenly'> */}
      <div className='container'>
        <div class='row'>
          <div class='col-12 col-sm-6 text-center pb-3 pb-sm-0'>
            <span>Made with love by </span>

            <a href='https://www.devinterface.com' title='DevInterface Digital Agency Verona' target='_blank' rel='noopener noreferrer'>
              <img src='/images/logo-devinterface.svg' alt='Logo DevInterface' />
            </a>
          </div>
          <div class='col-12 col-sm-6 text-center pb-3 pb-sm-0'>
            <span>Powered by </span>
            <a href='https://www.startersaas.com' title='The Go / Node + React powered SaaS Template' target='_blank' rel='noopener noreferrer'>
              <img src='/images/logo-startersaas.svg' alt='Logo StarterSaas' />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default BaseFooter

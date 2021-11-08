import React from 'react'
import * as SVGLoaders from 'svg-loaders-react'

const Loader = ({ children }) => {
  return (
    <div className='section'>
      <div className='loader center-div'>
        <SVGLoaders.Bars fill='#007bff' stroke='#007bff' />
      </div>
    </div>
  )
}

export default Loader

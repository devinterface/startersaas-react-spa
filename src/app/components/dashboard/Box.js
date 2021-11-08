import React from 'react'
import { Row, Col } from 'react-bootstrap'

const Box = ({ header, body, color, image }) => {
  if (color) {
    return (
      <div className={'dashboard-box color-box ' + color}>
        {(image)
          ? <Row>
            <Col sm={6}>
              <div className='header-box'>
                {header}
              </div>
              <div className='body-box'>
                {body}
              </div>
            </Col>
            <Col sm={6} className='image-contain'>
              {image}
            </Col>
            </Row>
          : <div>
            <div className='header-box'>
              {header}
            </div>
            <div className='body-box'>
              {body}
            </div>
            </div>}
      </div>
    )
  }

  return (
    <div className='dashboard-box'>
      <div className='header-box'>
        {header}
      </div>
      <div className='body-box'>
        {body}
      </div>
    </div>
  )
}

export default Box

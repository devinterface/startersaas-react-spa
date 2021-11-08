import React from 'react'
import { Carousel, Container, Image, Col, Row, Card } from 'react-bootstrap'
import '../../../css/authLayout/auth.css'

const AuthLayout = ({ children }) => {
  return (
    <Container>
      <Card className='card-auth center-div shadow-box'>
        <Row>
          <Col lg={6} md={12} sm={12}>
            <div className='card-body text-center'>
              <Image rounded='true' src='/images/articoliesocial-1.svg' alt='Articoliesocial Subscription' />
            </div>
          </Col>
          <Col lg={6} md={10} sm={12}>
            <div className='card-body text-center'>
              <Image className='logo m-b-40' src='/images/logo-startersaas.svg' alt='Articoliesocial Logo' />
              {children}
            </div>
          </Col>
        </Row>
      </Card>
    </Container>
  )
}

export default AuthLayout

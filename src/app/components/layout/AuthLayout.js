import BaseFooter from "app/components/layout/BaseFooter";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import "../../../css/authLayout/auth.css";

const AuthLayout = ({ children }) => {
  return (
    <div className="d-flex flex-column" id="h100">
      <div id="page-content" className="auth-content">
        <Container>
          <Card className="card-auth center-div shadow-box">
            <Row>
              <Col lg={6} md={12} sm={12}>
                <div className="card-body text-center">
                  <Image
                    rounded="true"
                    src="/images/articoliesocial-1.svg"
                    alt="Articoliesocial Subscription"
                  />
                </div>
              </Col>
              <Col lg={6} md={10} sm={12}>
                <div className="card-body text-center">
                  <Image
                    className="logo m-b-40"
                    src="/images/logo-startersaas.svg"
                    alt="Articoliesocial Logo"
                  />
                  {children}
                </div>
              </Col>
            </Row>
          </Card>
        </Container>
      </div>
      <BaseFooter />
    </div>
  );
};

export default AuthLayout;

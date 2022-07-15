import { Plans } from "api/queries";

import { useQuery } from "react-query";
import { Elements, StripeProvider } from "react-stripe-elements";

import Box from "app/components/dashboard/Box";
import Loader from "app/components/Loader";
import { Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import StripeCCForm from "./StripeCCForm";

const AddCardPage = (props) => {
  const { t } = useTranslation();

  const { isLoading: plansLoading, data: plansData } = useQuery(
    "Plans",
    Plans,
    {
      retry: false,
    }
  );

  if (plansLoading) {
    return <Loader />;
  }

  return (
    <Row>
      <Col xs={12}>
        <Box
          header={<h1>{t("addCardPage.creditCard")}</h1>}
          body={
            <StripeProvider apiKey={plansData.data.publicKey}>
              <Elements>
                <StripeCCForm />
              </Elements>
            </StripeProvider>
          }
        />
      </Col>
    </Row>
  );
};

export default AddCardPage;

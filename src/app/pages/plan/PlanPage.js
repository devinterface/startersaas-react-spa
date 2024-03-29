import { Customer, CustomerCards, Plans } from "api/queries";
import Box from "app/components/dashboard/Box";
import Loader from "app/components/Loader";
import { isAccountActive, isFreeTrial } from "libs/utils";
import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { Redirect } from "react-router-dom";
import { Elements, StripeProvider } from "react-stripe-elements";
import PlanCard from "./PlanCard";

const PlanPage = (props) => {
  const { t } = useTranslation();

  const [selectedPlanRecurring, setSelectedPlanRecurring] = useState(1);

  const [selectedPlan, setSelectedPlan] = useState(undefined);

  const [redirectTo, setRedirectTo] = useState(false);

  const [currentSubscription, setCurrentSubscription] = useState();

  useEffect(() => {
    if (selectedPlan !== undefined) {
      setRedirectTo(true);
    }
  }, [selectedPlan, props]);

  const { isLoading, error, data } = useQuery("Customer", Customer, {
    retry: false,
    onSuccess: (data) => {
      if (!isFreeTrial(props.user.account)) {
        try {
          const cs = data.data.subscriptions.data[0];
          if (cs) {
            setCurrentSubscription(cs);
          }
        } catch (e) {}
      }
    },
  });

  const { isLoading: plansLoading, data: plansData } = useQuery(
    "Plans",
    Plans,
    {
      retry: false,
    }
  );

  const { isLoading: cardsLoading, data: cardsData } = useQuery(
    ["CustomerCards", props.user.accountId],
    CustomerCards,
    {
      retry: false,
    }
  );

  if (isLoading || plansLoading || cardsLoading) {
    return <Loader />;
  }

  if (redirectTo) {
    return <Redirect to={`/plan/${selectedPlan}/subscribe`} />;
  }

  return (
    <Row>
      <Col xs={12}>
        <Box
          header={
            <div
              style={{
                textAlign: "center",
                minWidth: "300px",
                width: "50%",
                margin: "0 auto",
                marginTop: "20px",
              }}
            >
              <h1>{t("planPage.selectaPlan")}</h1>
              {!isAccountActive(props.user.account) && (
                <p>{t("planPage.deactivatedAccountNotice")}</p>
              )}
            </div>
          }
          body={
            <StripeProvider apiKey={plansData.data.publicKey}>
              <Elements>
                <div>
                  {plansData.data.plans.filter((p) => p.monthly).length > 0 &&
                    plansData.data.plans.filter((p) => !p.monthly).length >
                      0 && (
                      <Row>
                        <Col xs={12}>
                          <div className="contain-buttons-plan">
                            <Button
                              className={
                                selectedPlanRecurring === 1
                                  ? "button1"
                                  : "button1 grey"
                              }
                              onClick={() => {
                                setSelectedPlanRecurring(1);
                              }}
                            >
                              {t("planPage.monthly")}
                            </Button>
                            <Button
                              className={
                                selectedPlanRecurring === 2
                                  ? "button2"
                                  : "button2 grey"
                              }
                              onClick={() => {
                                setSelectedPlanRecurring(2);
                              }}
                            >
                              {t("planPage.yearly")}
                            </Button>
                          </div>
                        </Col>
                      </Row>
                    )}
                  <Row>
                    {selectedPlanRecurring === 1 && (
                      <>
                        {plansData.data.plans
                          .filter((p) => p.monthly)
                          .map((plan, i) => (
                            <Col
                              xs={12}
                              md={4}
                              key={i}
                              className="contain-card-plan"
                            >
                              <PlanCard
                                plan={plan}
                                monthly
                                key={`montly-${i}`}
                                setSelectedPlan={setSelectedPlan}
                                currentSubscription={currentSubscription}
                                cardsData={cardsData.data}
                              />
                            </Col>
                          ))}
                      </>
                    )}
                    {selectedPlanRecurring === 2 &&
                      plansData.data.plans.filter((p) => !p.monthly).length >
                        0 && (
                        <>
                          {plansData.data.plans
                            .filter((p) => !p.monthly)
                            .map((plan, i) => (
                              <Col
                                xs={12}
                                md={4}
                                key={i}
                                className="contain-card-plan"
                              >
                                <PlanCard
                                  plan={plan}
                                  monthly={false}
                                  key={`yearly-${i}`}
                                  setSelectedPlan={setSelectedPlan}
                                  currentSubscription={currentSubscription}
                                  cardsData={cardsData.data}
                                />
                              </Col>
                            ))}
                        </>
                      )}
                  </Row>
                </div>
              </Elements>
            </StripeProvider>
          }
        />
      </Col>
    </Row>
  );
};
export default PlanPage;

import Box from "app/components/dashboard/Box";
import moment from "moment";

import { Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const TrialComponent = ({ user }) => {
  const { t } = useTranslation();
  return (
    <Row>
      <Box
        color="white"
        image={<img src="/images/articoliesocial-2.svg" />}
        header={
          <div>
            <h1>{user.email}</h1>
          </div>
        }
        body={
          <div className="text-dark">
            <p>{t("trialComponent.youAreOnTrial")}</p>
            <strong>
              {t("trialComponent.trialEndsAt")}{" "}
              {moment(user.account.trialPeriodEndsAt).format("DD/MM/YYYY")}
            </strong>
            <Link to="/plan" className="custom-btn green">
              {t("trialComponent.goToPlans")}
            </Link>
          </div>
        }
      />
    </Row>
  );
};

export default TrialComponent;

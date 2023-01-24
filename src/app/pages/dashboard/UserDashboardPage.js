import { isFreeTrial } from "libs/utils";
import { Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import TrialComponent from "./TrialComponent";

const DashboardPage = ({ user }) => {
  const { t } = useTranslation();

  return (
    <div className="dashboard-page">
      <>
        <Row>IMPLEMENT ME</Row>
      </>
    </div>
  );
};
export default DashboardPage;

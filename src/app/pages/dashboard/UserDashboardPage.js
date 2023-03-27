import { isFreeTrial } from "libs/utils";
import { Alert, Modal, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import TrialComponent from "./TrialComponent";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const DashboardPage = ({ user }) => {
  const { t } = useTranslation();

  const location = useLocation();

  const [notAllowed, setNotAllowed] = useState(false);

  useEffect(() => {
    console.log(location.state?.from?.pathname);
    if (location.state?.from?.pathname) {
      setNotAllowed(true);
    }
  }, []);

  return (
    <>
      <Modal
        className="m-0"
        centered
        show={notAllowed}
        onHide={() => setNotAllowed(false)}
      >
        <Modal.Header closeButton className="d-block position-relative p-0">
          <Alert className="m-0" variant={"warning"}>
            <Alert.Heading>Error:</Alert.Heading>
            <p>{t("dashboardPage.noAccess")}</p>
          </Alert>
        </Modal.Header>
      </Modal>
      <div className="dashboard-page">
        {isFreeTrial(user.account) ? (
          <TrialComponent user={user} />
        ) : (
          <>
            <Row>Dashboard</Row>
          </>
        )}
      </div>
    </>
  );
};
export default DashboardPage;

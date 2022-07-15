import { CreateUser } from "api/mutations";
import Box from "app/components/dashboard/Box";
import ConfirmAlert from "libs/confirmAlert";
import { Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "react-query";
import UsersForm from "./UsersForm";

const CreateUsersPage = (props) => {
  const { t } = useTranslation();

  const queryClient = useQueryClient();

  const createUserMutate = useMutation(CreateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(["Users", user.accountId]);
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await createUserMutate.mutateAsync(data);
      if (response) {
        ConfirmAlert.success(t("createUsersPage.userCreated"));
        props.history.push("/users");
      }
    } catch (error) {
      if (error.response?.data) {
        ConfirmAlert.error(error.response.data);
        return;
      }
    }
  };

  const user = {
    name: "",
    surname: "",
    email: "",
    language: "en",
    role: "user",
  };

  return (
    <Row>
      <Col xs={12}>
        <Box
          header={
            <div>
              <h1>{t("createUsersPage.createUser")}</h1>
            </div>
          }
          body={
            <div>
              <UsersForm user={user} onSubmit={onSubmit} showEmail />
            </div>
          }
        />
      </Col>
    </Row>
  );
};
export default CreateUsersPage;

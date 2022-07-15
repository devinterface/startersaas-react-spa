import { yupResolver } from "@hookform/resolvers/yup";
import { ChangePassword } from "api/mutations";
import Box from "app/components/dashboard/Box";
import ConfirmAlert from "libs/confirmAlert";

import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import * as yup from "yup";

const schema = yup.object().shape({
  password: yup.string().min(8).required("editUserPage.passwordRequired"),
});

const EditUserPage = (props) => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const mutation = useMutation(ChangePassword);

  const onSubmit = async (data) => {
    data = { password: data.password };
    const response = await mutation.mutateAsync(data);
    if (response) {
      ConfirmAlert.success(t("editUserPage.passwordUpdated"));
      props.history.push("/");
    }
  };

  return (
    <Row>
      <Col xs={12}>
        <Box
          header={
            <div>
              <h1>{t("editUserPage.changePassword")}</h1>
              <p>{t("editUserPage.insertNewPassword")}</p>
            </div>
          }
          body={
            <div>
              <Form
                id="email-form"
                name="email-form"
                data-name="Reset Password Form"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Form.Group controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    maxLength="256"
                    name="password"
                    data-name="password"
                    placeholder=""
                    id="password"
                    {...register("password", { required: true })}
                  />
                  <span className="text-muted">{errors.password?.message}</span>
                </Form.Group>
                <Button
                  type="submit"
                  className="custom-btn green w-100-perc"
                  data-wait="Please wait..."
                >
                  {t("editUserPage.updatePassword")}
                </Button>
              </Form>
            </div>
          }
        />
      </Col>
    </Row>
  );
};
export default EditUserPage;

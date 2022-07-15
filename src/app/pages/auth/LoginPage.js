import { yupResolver } from "@hookform/resolvers/yup";
import { Login } from "api/mutations";
import ConfirmAlert from "libs/confirmAlert";

import { Col, Form, FormGroup } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
});

const LoginPage = (props) => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const mutation = useMutation(Login);

  const onSubmit = async (data) => {
    try {
      await mutation.mutateAsync(data);
    } catch (error) {
      ConfirmAlert.error(t("loginPage.emailPasswordInvalid"));
    }
    props.history.push("/dashboard");
  };

  return (
    <div>
      <h3 className="m-20 m-b-30">{t("loginPage.access")}</h3>
      <Form
        id="email-form"
        name="email-form"
        data-name="Email Form"
        className="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormGroup>
          <small id="emailHelp" className="form-text text-muted">
            {errors.email?.message}
          </small>
          <input
            className="form-control custom-input"
            type="text"
            name="email"
            aria-describedby="emailHelp"
            placeholder="Email"
            maxLength="256"
            data-name="Email"
            id="email"
            {...register("email", { required: true })}
          />
        </FormGroup>
        <FormGroup>
          <small id="passwordHelp" className="form-text text-muted">
            {errors.password?.message}
          </small>
          <input
            className="form-control custom-input"
            type="password"
            maxLength="256"
            name="password"
            data-name="Password"
            placeholder="Password"
            id="password"
            required=""
            {...register("password", { required: true })}
          />
        </FormGroup>
        <input
          type="submit"
          value={t("loginPage.confirm")}
          className="btn btn-primary"
        />
      </Form>
      <Col sm={12} className="text-center m-t-20">
        <Link to={{ pathname: "/auth/register" }}>
          {t("loginPage.register")}
        </Link>
        <br />
        <Link to={{ pathname: "/auth/forgot-password" }}>
          {t("loginPage.forgotPassword")}
        </Link>
        <br />
        <Link to={{ pathname: "/auth/resend-activation" }}>
          {t("loginPage.didntReceivedActivationEmail")}
        </Link>
        <br />
      </Col>
    </div>
  );
};
export default LoginPage;

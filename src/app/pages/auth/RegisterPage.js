import { yupResolver } from "@hookform/resolvers/yup";
import { Register } from "api/mutations";
import { SIGNUP_WITH_ACTIVATE } from "config";
import ConfirmAlert from "libs/confirmAlert";
import i18next from "libs/i18n";

import { Col, Form, FormGroup } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import * as yup from "yup";

const RegisterPage = (props) => {
  const mutation = useMutation(Register);
  const { t } = useTranslation();

  const schema = yup.object().shape({
    subdomain: yup
      .string()
      .matches(/^[a-z0-9](-?[a-z0-9])*$/, {
        excludeEmptyString: false,
        message: t("registerPage.invalidSubdomain"),
      })
      .lowercase()
      .required(),
    email: yup.string().lowercase().email().required(),
    password: yup.string().min(8).required(),
    privacyAccepted: yup
      .boolean()
      .required(t("registerPage.termsAccepted"))
      .oneOf([true], t("registerPage.termsAccepted")),
  });

  const slugify = (value) => {
    const slug = value
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(/[^\w\-]+/g, "") // Remove all non-word chars
      .replace(/\-\-+/g, "-") // Replace multiple - with single -
      .replace(/^-+/, ""); // Trim - from start of text
    setValue("subdomain", slug);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      data.language = i18next.language;
      const response = await mutation.mutateAsync(data);
      if (response) {
        if (SIGNUP_WITH_ACTIVATE) {
          props.history.push("/dashboard");
        } else {
          ConfirmAlert.success(t("registerPage.confirmEmailSent"));
          props.history.push(`/auth/activate/${data.email}`);
        }
      }
    } catch (error) {
      ConfirmAlert.error(t("registerPage.emailPasswordInvalid"));
    }
  };

  return (
    <div>
      <h3 className="m-20 m-b-30">{t("registerPage.register")}</h3>
      <Form
        id="email-form"
        name="email-form"
        data-name="Email Form"
        className="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormGroup>
          <small id="subdomainHelp" className="form-text text-muted">
            {errors.subdomain?.message}
          </small>
          <input
            type="subdomain"
            className="form-control custom-input"
            maxLength="256"
            aria-describedby="subdomainHelp"
            name="subdomain"
            data-name="Subdomain"
            placeholder={t("registerPage.subdomain")}
            id="subdomain"
            {...register("subdomain", { required: true })}
            onChange={(e) => slugify(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <small id="emailHelp" className="form-text text-muted">
            {errors.email?.message}
          </small>
          <input
            type="email"
            className="form-control custom-input"
            maxLength="256"
            aria-describedby="emailHelp"
            name="email"
            data-name="Email"
            placeholder="Email"
            id="email"
            {...register("email", { required: true })}
          />
        </FormGroup>
        <FormGroup>
          <small id="passwordHelp" className="form-text text-muted">
            {errors.password?.message}
          </small>
          <input
            type="password"
            className="form-control custom-input"
            maxLength="256"
            name="password"
            data-name="Password"
            placeholder="Password"
            id="password"
            required=""
            {...register("password", { required: true })}
          />
        </FormGroup>
        <FormGroup>
          <small id="privacyAcceptedHelp" className="form-text text-muted">
            {errors.privacyAccepted?.message}
          </small>
          <input
            type="checkbox"
            id="privacyAccepted"
            name="policy"
            data-name="Checkbox"
            className="w-checkbox-input checkbox"
            {...register("privacyAccepted", { required: true })}
            aria-describedby="privacyAcceptedHelp"
          />
          <span className="checkbox-label w-form-label text-justify">
            &nbsp;{t("registerPage.registerConsent")}
          </span>
          <br />
          <a href="/" target="_blank">
            {t("registerPage.terms")}
          </a>
          <br />
          <a href="/" target="_blank">
            {t("registerPage.privacy")}
          </a>
        </FormGroup>
        <FormGroup>
          <small id="marketingAcceptedHelp" className="form-text text-muted">
            {errors.marketingAccepted?.message}
          </small>
          <input
            type="checkbox"
            id="marketingAccepted"
            name="policy"
            data-name="Checkbox"
            className="w-checkbox-input checkbox"
            {...register("marketingAccepted")}
            aria-describedby="marketingAcceptedHelp"
          />
          <span className="checkbox-label w-form-label text-justify">
            &nbsp;{t("registerPage.marketingConsent")}
          </span>
        </FormGroup>
        <input
          type="submit"
          value={t("registerPage.confirm")}
          className="btn btn-primary m-t-20"
        />
      </Form>
      <Col sm={12} className="text-justify m-t-20">
        <Link to="/auth/login">{t("registerPage.alreadyRegistered")}</Link>
        <br />
        <Link to={{ pathname: "/auth/resend-activation" }}>
          {t("registerPage.didntReceivedActivationEmail")}
        </Link>
        <br />
      </Col>
    </div>
  );
};
export default RegisterPage;

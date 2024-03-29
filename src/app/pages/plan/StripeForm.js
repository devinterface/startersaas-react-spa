import { SetDefaultCreditCard, Subscribe } from "api/mutations";
import Loader from "app/components/Loader";
import ConfirmAlert from "libs/confirmAlert";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "react-query";
import { CardElement, injectStripe } from "react-stripe-elements";

const StripeForm = (props) => {
  const { t } = useTranslation();

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const [cardElement, setCardElement] = useState(null);

  const mutation = useMutation(Subscribe);

  const setDefaultCreditCard = useMutation(SetDefaultCreditCard);

  const [loading, setLoading] = useState(false);

  const handleReady = (element) => {
    setCardElement(element);
  };

  const onStripeSubmit = async (data) => {
    const paymentRequest = {
      planId: props.planId,
    };
    try {
      setLoading(true);
      const response = await mutation.mutateAsync(paymentRequest);

      if (
        response.data.latest_invoice.payment_intent &&
        response.data.latest_invoice.payment_intent.client_secret
      ) {
        // handle intent
        const handleCardPaymentResult = await props.stripe.confirmCardPayment(
          response.data.latest_invoice.payment_intent.client_secret,
          {
            setup_future_usage: "off_session",
            payment_method: {
              card: cardElement,
              billing_details: {
                name: data.cardHolderName,
              },
            },
          }
        );
        if (handleCardPaymentResult.error) {
          throw new Error(handleCardPaymentResult.error.message);
        }
        await setDefaultCreditCard.mutate({
          cardId: handleCardPaymentResult.paymentIntent.payment_method,
        });
        queryClient.invalidateQueries(["Customer", props.user.accountId]);
        queryClient.invalidateQueries([
          "CustomerInvoices",
          props.user.accountId,
        ]);
        queryClient.invalidateQueries(["Me"]);
        ConfirmAlert.success(t("stripeForm.paymentCompleted"));
        setTimeout(function () {
          window.location.href = "/dashboard";
        }, 3000);
      } else if (response.data.latest_invoice.paid) {
        queryClient.invalidateQueries(["Customer", props.user.accountId]);
        queryClient.invalidateQueries([
          "CustomerInvoices",
          props.user.accountId,
        ]);
        queryClient.invalidateQueries(["Me"]);
        ConfirmAlert.success(t("stripeForm.paymentCompleted"));
        setTimeout(function () {
          window.location.href = "/dashboard";
        }, 3000);
      } else {
        queryClient.invalidateQueries(["Customer", props.user.accountId]);
        queryClient.invalidateQueries([
          "CustomerInvoices",
          props.user.accountId,
        ]);
        queryClient.invalidateQueries(["Me"]);
        ConfirmAlert.success(response.data.message);
        setTimeout(function () {
          window.location.href = "/dashboard";
        }, 3000);
      }
    } catch (error) {
      console.log("error ------ ", error);
      ConfirmAlert.error(t("stripeForm.paymentFailed") + " " + error.message);
      setTimeout(function () {
        window.location.href = "/dashboard";
      }, 3000);
      setLoading(false);
    }
  };

  return (
    <>
      <Form
        id="email-form"
        name="email-form"
        data-name="Email Form"
        method="get"
        onSubmit={handleSubmit(onStripeSubmit)}
      >
        {loading && <Loader />}
        {props.selectedPlan.price > 0 && (
          <Form.Group controlId="formCard">
            <Form.Label>{t("stripeForm.cardOwner")}</Form.Label>
            <Form.Control
              type="text"
              maxLength="256"
              name="cardHolderName"
              data-name={t("stripeForm.cardOwner")}
              placeholder=""
              id="cardHolderName"
              {...register("cardHolderName", { required: true })}
            />
            <span className="text-muted">{errors.cardHolderName?.message}</span>
            <CardElement
              style={{
                base: {
                  fontSize: "18px",
                  color: "#333",
                  border: "1px solid #ccc",
                },
              }}
              onReady={handleReady}
            />
          </Form.Group>
        )}
        {!loading && (
          <Button
            type="submit"
            className="custom-btn green w-100-perc"
            data-wait="Please wait..."
          >
            {t("stripeForm.subscribe")}
          </Button>
        )}
      </Form>
    </>
  );
};
export default injectStripe(StripeForm);

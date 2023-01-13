import { ACCOUNT_STATUSES } from "config";

const formatMoney = (locale, currency = "EUR", number) => {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: currency,
  }).format(number);
};

const hasFailedPayment = (account) => {
  return (
    account.subscriptionStatus === ACCOUNT_STATUSES.subscriptionPaymentFailed
  );
};

const isAccountActive = (account) => {
  return (
    account.subscriptionStatus === ACCOUNT_STATUSES.subscriptionActive ||
    isFreeTrial(account) ||
    hasFailedPayment(account)
  );
};

const isFreeTrial = (account) => {
  return account.subscriptionStatus === ACCOUNT_STATUSES.subscriptionTrial;
};

const formatErrors = (message) => {
  let msg = "";
  if (typeof message === "string" || message instanceof String) {
    msg = message;
  } else if (message.message) {
    msg = message.message;
  } else {
    Object.keys(message).map((k) => {
      msg += `${Object.values(message[k])} -- `;
    });
  }
  return msg;
};


export { formatMoney, isAccountActive, isFreeTrial, hasFailedPayment, formatErrors };

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

export { formatMoney, isAccountActive, isFreeTrial, hasFailedPayment };

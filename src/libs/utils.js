import moment from 'moment'

const formatMoney = (locale, currency = 'EUR', number) => {
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: currency }).format(number)
}

const hasFailedPayment = (account) => {
  return account.paymentFailed && account.paymentFailedFirstAt
}

const isFailedPaymentExpired = (account) => {
  return account.paymentFailed && moment(moment(account.paymentFailedFirstAt).add(account.subscriptionRevokedAfterDays, 'days')).isBefore(Date.now())
}

const isAccountActive = (account) => {
  let active = false
  if (isFailedPaymentExpired(account)) {
    active = false
  } else {
    active = account.active || isFreeTrial(account)
  }
  return active
}

const isFreeTrial = (account) => {
  return !account.active && moment(account.trialPeriodEndsAt).isAfter(Date.now())
}

export { formatMoney, isAccountActive, isFreeTrial, hasFailedPayment, isFailedPaymentExpired }

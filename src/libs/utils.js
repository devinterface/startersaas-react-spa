import moment from 'moment'

const formatMoney = (locale, currency, number) => {
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: currency }).format(number)
}

const isAccountActive = (account) => {
  let active = false
  if (account.paymentFailed && moment(moment(account.paymentFailedFirstAt).add(5, 'days')).isBefore(Date.now())) {
    active = false
  } else {
    active = account.active || isFreeTrial(account)
  }
  return active
}

const isFreeTrial = (account) => {
  return !account.active && moment(account.trialPeriodEndsAt).isAfter(Date.now())
}

export { formatMoney, isAccountActive, isFreeTrial }

import moment from 'moment'
import { PAYMENT_FAIL_AFTER_DAYS } from '../config'

const formatMoney = (locale, currency, number) => {
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: currency }).format(number)
}

const hasFailedPayment = (account) => {
  return account.paymentFailed && moment(moment(account.paymentFailedFirstAt).add(PAYMENT_FAIL_AFTER_DAYS, 'days')).isBefore(Date.now())
}

const isAccountActive = (account) => {
  let active = false
  if (hasFailedPayment(account)) {
    active = false
  } else {
    active = account.active || isFreeTrial(account)
  }
  return active
}

const isFreeTrial = (account) => {
  return !account.active && moment(account.trialPeriodEndsAt).isAfter(Date.now())
}

export { formatMoney, isAccountActive, isFreeTrial, hasFailedPayment }

import stripeConf from './stripe.conf'

export const API_HOST = process.env.REACT_APP_API_HOST
export const API_PATH = process.env.REACT_APP_API_PATH
export const API_URL = `${API_HOST}${API_PATH}`
export const JWT_TOKEN = process.env.REACT_APP_JWT_TOKEN_NAME
export const PAYMENT_FAIL_AFTER_DAYS = process.env.REACT_APP_PAYMENT_FAIL_AFTER_DAYS
export const STRIPE_CONF = stripeConf

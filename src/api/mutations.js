import Axios from 'libs/axios'
import Storage from 'libs/storage'
import { JWT_TOKEN } from 'config'

const Logout = async () => {
  Storage.deleteKey(JWT_TOKEN)
}

const Login = async (data) => {
  const result = await Axios.base().post('/auth/login', data)
  Storage.setItem(JWT_TOKEN, result.data.token)
  return result
}

const ForgotPassword = async (data) => {
  const result = await Axios.base().post('/auth/send-forgot-password-link', data)
  return result
}

const ResetPassword = async (data) => {
  const result = await Axios.base().post('/auth/reset-password', data)
  return result
}

const ResendActivation = async (data) => {
  const result = await Axios.base().post('/auth/send-activation-link', data)
  return result
}

const Register = async (data) => {
  const result = await Axios.base().post('/auth/signup', data)
  return result
}

const Activate = async (data) => {
  const result = await Axios.base().post('/auth/activate', data)
  return result
}

const UpdateAccount = async (data) => {
  const result = await Axios.authenticated().put(`/accounts/${data.accountId}`, data.data)
  return result
}

const Subscribe = async (data) => {
  const result = await Axios.authenticated().post('/stripe/subscriptions', data)
  return result
}

const CancelSubscription = async (data) => {
  const result = await Axios.authenticated().delete('/stripe/subscriptions', { data: data })
  return result
}

const CreateSetupIntent = async (data) => {
  const result = await Axios.authenticated().post('/stripe/createSetupIntent', data)
  return result
}

const AddCreditCard = async (data) => {
  const result = await Axios.authenticated().post('/stripe/cards', data)
  return result
}

const RemoveCreditCard = async (data) => {
  const result = await Axios.authenticated().delete('/stripe/cards', { data: data })
  return result
}

const SetDefaultCreditCard = async (data) => {
  const result = await Axios.authenticated().put('/stripe/cards', data)
  return result
}

const ChangePassword = async (data) => {
  const result = await Axios.authenticated().put('/users/me/change-password', data)
  return result
}

const UpdateMe = async (data) => {
  const result = await Axios.authenticated().put('/users/me', data)
  return result
}

export { Logout, Login, ForgotPassword, ResetPassword, ResendActivation, Register, Activate, UpdateAccount, Subscribe, CancelSubscription, AddCreditCard, RemoveCreditCard, SetDefaultCreditCard, ChangePassword, UpdateMe, CreateSetupIntent }

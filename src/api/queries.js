import Axios from 'libs/axios'

const Me = async key => {
  const result = await Axios.authenticated().get('/users/me?withAccount=true')
  return result
}

const Account = async accountId => {
  const result = await Axios.authenticated().get(`/accounts/${accountId}`)
  return result
}

const Customer = async () => {
  const result = await Axios.authenticated().get('/stripe/customers/me')
  return result
}

const CustomerInvoices = async () => {
  const result = await Axios.authenticated().get(
    '/stripe/customers/me/invoices'
  )
  return result
}

const CustomerCards = async () => {
  const result = await Axios.authenticated().get('/stripe/customers/me/cards')
  return result
}

const Plans = async () => {
  const result = await Axios.base().get('/stripe/plans')
  return result
}

const Users = async () => {
  const result = await Axios.authenticated().get('/users/')
  return result
}

const User = async userId => {
  const result = await Axios.authenticated().get(`/users/${userId}`)
  return result
}

export {
  Me,
  Account,
  Customer,
  CustomerInvoices,
  CustomerCards,
  Plans,
  Users,
  User
}

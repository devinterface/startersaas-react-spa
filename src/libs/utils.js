const formatMoney = (locale, currency, number) => {
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: currency }).format(number)
}

export { formatMoney }

const stripeConf = {
  publicKey: 'pk_test_xxx',
  plans: [
    {
      // Need to be the ID you will find once you defined the plan on Stripe !
      id: 'price_xxx',
      img: 'https://menuclick24.s3-eu-west-1.amazonaws.com/static/logo-mensile.svg',
      title: 'Starter - Piano Mensile',
      price: 199,
      currency: 'EUR',
      features: ['Piano editoriale', '1 post Facebook', '1 post Instagram', '1 Facebook story', '1 Instagram story', '1 articolo per il blog', '-', '-', '-'],
      freeTrial: false,
      trialDays: 0,
      featured: false,
      monthly: true
    },
    {
      // Need to be the ID you will find once you defined the plan on Stripe !
      id: 'price_xxx',
      img: 'https://menuclick24.s3-eu-west-1.amazonaws.com/static/logo-mensile.svg',
      title: 'Base - Piano Mensile',
      price: 399,
      currency: 'EUR',
      features: ['Piano editoriale', '2 post Facebook', '2 post Instagram', '2 Facebook stories', '2 Instagram stories', '2 articoli per il blog', '-', '-', '-'],
      freeTrial: false,
      trialDays: 0,
      featured: true,
      monthly: true
    },
    {
      id: 'price_xxx',
      img: 'https://menuclick24.s3-eu-west-1.amazonaws.com/static/logo-annuale.svg',
      title: 'Pro - Piano Mensile',
      price: 699,
      currency: 'EUR',
      features: ['Piano editoriale', '4 post Facebook', '4 post Instagram', '4 Facebook stories', '4 Instagram stories', '4 articoli per il blog', 'Ottimizzazione pagine social', 'Post sponsorizzato (budget pubblicitario a carico del cliente)', 'Report mensile'],
      freeTrial: false,
      trialDays: 0,
      featured: true,
      monthly: true
    }
  ]
}

export default stripeConf

# StarterSaaS React SPA

This project contains everything you need to setup a fully featured SaaS SPA in 5 minutes.

# Installation

Copy `.env.example` into `.env`.

Build the application

Create a startersaas newtwork typing:

```bash
docker network create startersaas-network
```

Then build the container

```bash
docker compose build
```

And finally, run the application

```bash
docker compose up
```

Application will be reachable on

```bash
http://localhost:3010
```

# Configuring .env

Below the meaning of every environment variable you can setup.

`REACT_APP_API_HOST=http://localhost:3000` the host of StarterSaaS API

`REACT_APP_API_PATH=/api/v1` don't change it

`REACT_APP_JWT_TOKEN_NAME=startersaas-jwt` the name of the jwt token

`REACT_APP_SIGNUP_WITH_ACTIVATE=true` set this value as true if you want to log the new registered user directly, without asking for email confirmation

`REACT_APP_ENABLE_CUSTOMER_PORTAL=false`, if true the UI will forward the customer to the Stripe Customer Portal to handle subscriptions and credit card management

# Features

### API and Frontend

- [x] user registration of account with subdomain, email and password
- [x] user email activation with 6 characters code and account creation
- [x] resend activation code if not received
- [x] user password reset through code sent by email
- [x] user login
- [x] user logout
- [x] user change password once logged in
- [x] account trial period
- [x] edit of account billing information
- [x] subscription creation
- [x] plan change
- [x] add new credit card
- [x] remove credit card
- [x] subscription cancel
- [x] subscription re enable
- [x] 3D Secure ready payments
- [x] subscription handling via Stripe customer portal
- [x] account's users list (by admins only)
- [x] account's user create (by admins only)
- [x] account's user update (by admins only)
- [x] account's user delete (by admins only)

### API only

- [x] stripe webhooks handling
- events notifications by email:
  - [x] new user subscribed
  - [x] successful payments
  - [x] failed payments
- daily notifications by email:
  - [x] expiring trials
  - [x] failed payments
  - [x] account suspension due to failed payments

### TODO

- [ ] signup with Google
- [ ] teams handling

### CREDITS

Author: Stefano Mancini <stefano.mancini@devinterface.com>

Company: DevInterface SRL (https://www.devinterface.com)

### License

Licensed under the [MIT License](https://github.com/devinterface/startersaas-react-spa/blob/master/LICENSE)

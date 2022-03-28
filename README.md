# Starter SaaS React SPA

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


`REACT_APP_API_HOST=http://localhost:3000` the host of Starter SaaS API
`REACT_APP_API_PATH=/api/v1` don't change it
`REACT_APP_JWT_TOKEN_NAME=startersaas-jwt` the name of the jwt token
`REACT_APP_SIGNUP_WITH_ACTIVATE=true` set this value as true if you want to log the new registered user directly, without asking for email confirmation

# Features

### API and Frontend

* user registration of account with subdomain, email and password
* user email activation with 6 characters code and account creation
* resend activation code if not received
* user password reset through code sent by email
* user login
* user logout
* user change password once logged in
* account trial period
* edit of account billing informations
* subscription creation
* plan change
* add new credit card
* subscription cancel
* 3D Secure ready payments
* account's users list (by admins only)
* account's user create (by admins only)
* account's user update (by admins only)
* account's user delete (by admins only)

### API only

* stripe webhooks handling
* events notifications by email:
  - new user subscribed
  - successful payments
  - failed payments
* daily notifications by email:
  - expiring trials
  - failed payments
  - account suspension due to failed payments

### CREDITS

Author: Stefano Mancini <stefano.mancini@devinterface.com> 

Company: DevInterface SRL (https://www.devinterface.com)

Issues repository: https://github.com/devinterface/startersaas-issues


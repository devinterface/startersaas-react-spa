# Starter SaaS React SPA

This project contains everything you need to setup a fully featured SaaS SPA in 5 minutes.
# Installation
Then make sure you have Node installed. Version `14` or higher is required.

Install all dependencies by running 

```bash
yarn install
```
 
Copy `.env.example` into `.env`.

Finally, run the SPA by typing:

```bash
yarn start
```

# Configuring .env

Below the meaning of every environment variable you can setup.


`REACT_APP_API_HOST=http://localhost:3000` the host of Starter SaaS API
`REACT_APP_API_PATH=/api/v1` don't change it
`REACT_APP_JWT_TOKEN_NAME=startersaas-jwt` the name of the jwt token

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

### API only

* account's users list (by admins only)
* account's user create (by admins only)
* account's user update (by admins only)
* stripe webhooks handling
* events notifications by email:
  - new user subscribed
  - succesful payments
  - failed payments
* daily notifications by email:
  - expiring trials
  - failed payments
  - account suspension due to failed payments

### CREDITS

Author: Stefano Mancini <stefano.mancini@devinterface.com> 

Company: DevInterface SRL (https://www.devinterface.com)

Feel free to send me an email if you have issues or bugs.


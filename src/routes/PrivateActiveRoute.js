import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { isAccountActive } from 'libs/utils'

const PrivateActiveRoute = ({
  user, isAuthenticated, component: Component, layout: Layout, container, allowedRoles, ...rest
}) => {
  const authorized = isAuthenticated && user && allowedRoles.includes(user.role) && isAccountActive(user.account)

  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          // eslint-disable-next-line no-nested-ternary
          !isAuthenticated
            ? (<Redirect to={{
                pathname: '/auth/login',
                state: { from: props.location }
              }}
               />
              ) : (
              // eslint-disable-next-line no-nested-ternary
                authorized
                  ? (
                      Layout === undefined
? (
                    <Component user={user} {...props} />
                      )
: (
                    <Layout container={container} user={user}><Component user={user} {...props} /></Layout>
                      )
                    )
                  : (
                  <Redirect to={{
                    pathname: '/plan',
                    state: { from: props.location }
                  }}
                  />
                    )
              )
        )
      }}
    />
  )
}

export default PrivateActiveRoute

import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const PrivateActiveRoute = ({
  user, isAuthenticated, component: Component, layout: Layout, container, allowedRoles, ...rest
}) => {
  const active = isAuthenticated && user && allowedRoles.includes(user.role) && user.account.active

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
              active
                ? (
                  Layout === undefined ? (
                    <Component user={user} {...props} />
                  ) : (
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

import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const OnlyPublicRoute = ({ user, isAuthenticated, lastError, component: Component, layout: Layout, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        // eslint-disable-next-line no-nested-ternary
        !isAuthenticated ? (
          Layout === undefined ? (
            <Component {...props} lastError={lastError} />
          ) : (
            <Layout><Component {...props} lastError={lastError} /></Layout>
          )
        ) : <Redirect to={{ pathname: '/dashboard' }} />
      )}
    />
  )
}

export default OnlyPublicRoute

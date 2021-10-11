import * as PropTypes from 'prop-types'
import React from 'react'
import { Route } from 'react-router-dom'

const PublicRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (
      Layout === undefined ? (
        <Component {...props} />
      ) : (
        <Layout><Component {...props} /></Layout>
      )
    )}
  />
)

PublicRoute.propTypes = {
  // component: PropTypes.func.isRequired,
  layout: PropTypes.func
}

export default PublicRoute

import { Redirect, Route } from "react-router-dom";

// TODO: Refactor: do not nest ternary operator
const PrivateRoute = ({
  user,
  isAuthenticated,
  component: Component,
  layout: Layout,
  container,
  allowedRoles,
  planType,
  ...rest
}) => {
  let allowed = isAuthenticated && user && allowedRoles.includes(user.role);

  if (planType && planType.length > 0) {
    allowed = allowed && planType.includes(user.account.planType);
  }

  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          // eslint-disable-next-line no-nested-ternary
          !isAuthenticated ? (
            <Redirect
              to={{
                pathname: "/auth/login",
                state: { from: props.location },
              }}
            />
          ) : // eslint-disable-next-line no-nested-ternary
            allowed ? (
              Layout === undefined ? (
                <Component user={user} {...props} />
              ) : (
                <Layout container={container} user={user}>
                  <Component user={user} {...props} />
                </Layout>
              )
            ) : (
              <Redirect
                to={{
                  pathname: "/dashboard",
                  state: { from: props.location },
                }}
              />
            )
        );
      }}
    />
  );
};

export default PrivateRoute;

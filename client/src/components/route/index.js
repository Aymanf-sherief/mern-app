import React from "react";

import { Route, Redirect } from "react-router-dom";

export function AuthenticatedRoute({ component: C, appProps, ...rest }) {
  console.log(`authed isauthed: ${JSON.stringify(appProps.isAuthenticated)}`)
  return (
    <Route
      {...rest}
      render={(props) =>
        appProps.isAuthenticated ? (
          <C {...props} {...appProps} />
        ) : (
          <Redirect
            to={`/login?redirect=${props.location.pathname}${props.location.search}`}
          />
        )
      }
    />
  );
}

export function UnAuthenticatedRoute({ component: C, appProps, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        !appProps.isAuthenticated ? (
          <C {...props} {...appProps} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
}

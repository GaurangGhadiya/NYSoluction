// import React, { Component } from "react";
// import { Route, Redirect } from "react-router-dom";

// const PrivateRoute = ({ component: component, ...rest }) => {
//   return (
//     <Route
//       {...rest}
//       component={(props) => {
//         const token = window.localStorage.getItem("token");
//         if (token) {
//           return <Component {...props} />;
//         } else {
//           return <Redirect to={"/signin"} />;
//         }
//       }}
//     />
//   );
// };

// export default PrivateRoute;

import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={(props) =>
        window.localStorage.getItem("token") ? (
          <Component {...props} />
        ) : (
          <Redirect to="/signin" />
        )
      }
    />
  );
};

export default PrivateRoute;

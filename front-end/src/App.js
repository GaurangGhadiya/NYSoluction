import "./App.css";
import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home/Index";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import PrivateRoute from "./components/HOC/PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedIn } from "./actions";
import RegistrationList from "./components/RegistrationList";
import Profile from "./components/Profile";
import NotFoundPage from "./components/NotFound";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, []);

  return (
    <div>
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute exact path="/register" component={RegistrationList} />
        <PrivateRoute exact path="/profile/:id" component={Profile} />

        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}

export default App;

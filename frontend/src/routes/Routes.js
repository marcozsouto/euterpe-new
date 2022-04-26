import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Unauthorized from "../pages/401/Unauthorized";

import Login from "../pages/login/Login";
import NoMatch from "../pages/no-match/NoMatch";
import Signup from "../pages/signup/Signup";
import Welcome from "../pages/welcome/Welcome";

import Auth from "../services/Auth";


function Routes(){
     const PrivateRoute = ({ component: Component, ...rest }) => (
          <Route
          {...rest}
          render={ props =>
               Auth.hasToken() ? (
                    <Component {...props} />
               ) : (
                    <Redirect to={{ pathname: "/unauthorized", state: { from: props.location } }} />
               )
          }
          />
     );


     return(
          <BrowserRouter>
               <Switch>
                    <Route exact path="/signup" component={Signup}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/" component={Welcome}/>
                    <Route exact path="/unauthorized" component={Unauthorized}/>
                    <PrivateRoute path="/webplayer" component={() => <h1>App</h1>} />
                    <Route component={NoMatch}/>
               </Switch>
          </BrowserRouter>
     );
}

export default Routes;
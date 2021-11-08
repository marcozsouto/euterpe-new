import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "../login/Login";
import NoMatch from "../no-match/NoMatch";
import Welcome from "../welcome/Welcome";

function Routes(){
     return(
          <BrowserRouter>
               <Switch>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/" component={Welcome}/>
                    <Route component={NoMatch}/>
               </Switch>
          </BrowserRouter>
     );
}

export default Routes;
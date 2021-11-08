import React from "react";
import { Link } from "react-router-dom";
import WelcomeFooter from "../welcome/footer/WelcomeFooter";
import WelcomeHeader from "../welcome/header/WelcomeHeader";
import iconBroken from '../assets/images/nomatch/broken.svg';
import './NoMatch.css'

export default function NoMatch(){
     return (
          <>
          <WelcomeHeader/>
               <div className="error-page-not-found">
                    <div className="container">
                         <div className="row h-100 d-flex align-items-center">
                              <div className="col-3"></div>
                              <div className="col-3 ms-5">
                                   <p className="title-page-not-found">Damn it!</p>
                                   <p className="text-page-not-found">We couldn’t find the page you were looking for.</p>
                                   <Link className="button-page-not-found" to={'/'} >GO BACK</Link>
                              </div>
                              <div className="col-3 ">
                                   <img className="icon-broken" src={iconBroken}/>
                              </div>
                         </div>
                    </div>
               </div>
          <WelcomeFooter/>
          </>
     );

}
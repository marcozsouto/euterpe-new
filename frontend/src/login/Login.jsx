import React from "react";
import IconEuterpe from "../fix/icon-euterpe/IconEuterpe";
import { Link } from 'react-router-dom';
import './Login.css'

export default function Login(){
     return (
          <>
               <div className="login-background">
                    <div className="login-header">
                         <div className="login-header-overlay"></div>
                    </div>
                    <div className="d-flex justify-content-center">
                         <div className="d-flex flex-column">
                              <div className="icon-login">
                                   <IconEuterpe props={{width: 250,hover: true}}/>
                              </div>
                              <div className="form-login">
                                   <input className="input-login w-100" type="text" placeholder="Type your username or email"/>
                                   <input className="input-login w-100" type="password" placeholder="Type your password"/>
                                   <div className="d-flex justify-content-end mt-3">
                                        <button className="btn login-button">Log in</button>
                                   </div>
                              </div>
                              <div className="footer-login">
                                   <Link to={'/signup'}>Create new Euterpe user</Link>
                                   <Link to={'*'} className="mt-3">Forgot Euterpe user or Password?</Link>
                              </div>
                         </div>
                    </div> 
               </div>
          </>
     );
}
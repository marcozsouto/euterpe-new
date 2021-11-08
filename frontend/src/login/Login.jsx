import React from "react";
import IconEuterpe from "../fix/icon-euterpe/IconEuterpe";
import './Login.css'

export default function Login(){
     console.log('here');
     return (
          <>
               <div className="login-background">
                    <div className="login-header">
                         <div className="login-header-overlay"></div>
                    </div>
                    <div className="d-flex justify-content-center">
                         <IconEuterpe props={{width: 250,hover: true}}/>
                         <div className="form-login">
                              
                         </div>
                    </div>
                    
               </div>
          </>
     );
}
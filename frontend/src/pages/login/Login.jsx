import './Login.css';

import React, { useState } from "react";
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

import IconEuterpe from "../../fix/icon-euterpe/IconEuterpe";
import InvalidInput from "../../fix/invalid-input/InvalidInput";
import IconLoading from "../../fix/loading/IconLoading";
import Auth from "../../services/Auth";
import Validator from "../../services/Validator";
import api from '../../services/Api';


export default function Login() {

     const [state, setState] = useState({login: "", password: ""});
     const [message, setMessage] = useState("");
     const [loading, setLoading] = useState(false);
     
     async function handleSubmit(event){
          try{
               event.preventDefault();
               setLoading(true);
               Validator.validateString(state.login, [0, 255], 'login');
               Validator.validateString(state.password, [0, 255], 'password');
               const response = await api.post(`/login`, state);

               if(response.data.status == 1){
                    let token = response.data.token;
                    Auth.setToken(token);
               }
          }catch(error){

               if(error.status != undefined){
                    setMessage({text: error.message});
               }else{
                    console.error(error.response.data.message);
                    setMessage({text: error.response.data.message});
               }
          }
          setLoading(false);
     }

     function handleChange(event){
          const value = event.target.value;
          setState({
            ...state,
            [event.target.name]: value
          });       
     }

     
     if(Auth.hasToken()){
          return (
               <Redirect to={`/webplayer?user=${Auth.getToken()}`}/>
          );
     }

     return (
          <>
               <div className="login-background">
                    <div className="login-header">
                         <div className="login-header-overlay"></div>
                    </div>
                    <div className="d-flex justify-content-center" style={{backgroundColor: 'black'}}>
                         <div className="d-flex flex-column">
                              <div className="icon-login">
                                   <IconEuterpe props={{width: 250,hover: true}}/>
                              </div>
                              <div className="form-login">
                              <form onSubmit={handleSubmit}>
                                   <input className="input-login w-100" name="login" type="text" placeholder="Type your username or email" onChange={handleChange}/>
                                   <input className="input-login w-100" name="password" type="password" placeholder="Type your password" onChange={handleChange}/>
                                   <InvalidInput props={message}/>
                                   <div className="d-flex justify-content-end mt-3">
                                        <button  className="btn login-button">
                                             {loading ? <IconLoading props={{size: 1}} /> : `Log in`}
                                        </button>
                                   </div>
                              </form>
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
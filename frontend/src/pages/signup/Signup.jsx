import React, { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import IconEuterpe from "../../fix/icon-euterpe/IconEuterpe";
import UploadIcon from "../../fix/upload-icon/UploadIcon";

import './Signup.css';


export default function Signup() {

     const [state, setState] = useState({
          icon: null,
          name: "", 
          username: "", 
          email: "", 
          password: "",
          birthdate: "",
     });

     function handleChange(event){
          const value = event.target.files ? event.target.files[0] : event.target.value;
          setState({
            ...state,
            [event.target.name]: value
          });     
     }

     function handleSubmit(event){
          event.preventDefault();
          console.log(state);
     }

     return (
          <>
               <div className="row signup-background">
                    <div className="col-xl-7 col-lg-6 col-md-5 col-sm-3 col-1">
                         <div className="border-left"/>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-5 col-sm-6 col-10">
                         <div className="card-signup">
                              <div className="d-flex flex-column">
                                   <div className="m-auto"><IconEuterpe props={{width: 250,hover: true}}/></div>
                                   <label className="label-subtitle-signup">Subscribe for free and enjoy it.</label>
                                   <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                             <label class="form-label">What's your name?</label>
                                             <input type="text" name="name" class="form-control" placeholder="Type a name" onChange={handleChange}/>                                   
                                        </div>
                                        <div className="mb-3">
                                             <label class="form-label">Type a username</label>
                                             <input type="text" name="username" class="form-control" placeholder="Type a username" onChange={handleChange}/>                                   
                                        </div>
                                        <div className="mb-3">
                                             <label class="form-label">What's your e-mail?</label>
                                             <input type="text" name="email" class="form-control" placeholder="Type a email" onChange={handleChange}/>                                   
                                        </div>
                                        <div className="mb-3">
                                             <label class="form-label">Type a password</label>
                                             <input type="password" name="password" class="form-control" placeholder="Type a password" onChange={handleChange}/>                                   
                                        </div>
                                        <div className="mb-3">
                                             <label class="form-label">What is your birthdate?</label>
                                             <input type="date" name="birthdate" class="form-control" placeholder="Type a birthdate" onChange={handleChange}/>                                   
                                        </div>
                                        <div className="d-flex justify-content-end mt-3">
                                             <button  className="btn btn-euterpe">
                                                  Sign up
                                             </button>
                                        </div>
                                   </form>
                                   <div className="footer-login">
                                        <Link to={'/login'}>Already have a acount? login</Link>
                                   </div>
                              </div>
                         </div>
                    </div>
                    <div className="col-xl-2 col-lg-2 col-md-2 col-sm-3 col-1"><div className="border-right"/></div>
               </div>
          </>
     );
     

}
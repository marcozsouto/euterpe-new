import React, { useState } from 'react';
import './WelcomeHeader.css';
import { Link } from 'react-router-dom';
import IconEuterpe from '../../fix/icon-euterpe/IconEuterpe';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import Auth from '../../fix/Auth';


export default function WelcomeHeader() {
     
     const isLoggedIn = Auth.hasToken();
     const [clickProf, setClickProf] = useState(false);



     function showModal(){
          setClickProf(clickProf ? false : true)
     }
  
     return (
     <div className="header">
          <div className="heade-icon">
               <IconEuterpe props={{width: 150, hover: true}}/>
          </div>
          <div className="header-buttons">
               <div className="header-button">
                    <Link to={'*'} className="a-button-header">Premium</Link>
               </div>
               <div className="header-button">
                    <Link to={'*'} className="a-button-header">Suport</Link>
               </div>
               <div className="header-button">
                    <Link to={'*'} className="a-button-header">Download</Link>
               </div>
               <div className="header-button">
                    <span style={{color: 'white'}}>|</span>
               </div>
               <div className="header-button">
                    <Link to={'*'} className="a-button-header">Sign in</Link>
               </div>
               {isLoggedIn ? (
               <div className="header-button">
                    <div className="profile-buttom">
                    <buttom className="a-button-header" onClick={() => showModal()}>
                         Profile 
                         <FontAwesomeIcon className={clickProf ? "round" : "normal"} icon={faChevronDown} style={{marginLeft: "0.5rem"}}/>
                    </buttom>
                    <div className="popup-all" style={{display: `${clickProf ? 'block': 'none'}`}}>
                         <div id="triangle-up"></div>
                         <div className="popup">
                              <Link to={'*'} className="item-popup">Account</Link>
                              <Link to={'*'} className="item-popup" style={{color: "gray"}}>Log out</Link>
                         </div>
                    </div>
                    </div>
               </div>
               ) : (
               <div className="header-button">
                    <Link to={'/login'} className="a-button-header">Log in</Link>
               </div>
               )}

          </div>
     </div>
  );
}


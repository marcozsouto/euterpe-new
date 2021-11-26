import React from 'react';
import './WelcomeHeader.css';
import { Link } from 'react-router-dom';
import IconEuterpe from '../../fix/icon-euterpe/IconEuterpe';


export default function WelcomeHeader() {
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
                    <Link to={'*'} className="" style={{color: 'white'}}>|</Link>
               </div>
               <div className="header-button">
                    <Link to={'*'} className="a-button-header">Sign in</Link>
               </div>
               <div className="header-button">
                    <Link to={'/login'} className="a-button-header">Log in</Link>
               </div>
          </div>
     </div>
  );
}


import React from "react";
import './Welcome.css'
import iconAespa from '../assets/images/welcome/aespa.jpg';
import WelcomeFooter from "./footer/WelcomeFooter";
import WelcomeHeader from "./header/WelcomeHeader";
import { BrowserRouter, Switch, Route } from "react-router-dom";


export default function Welcome(){
     return (
          <>
          <WelcomeHeader/>
               <div className="welcome">
                    <div className="welcome-divs">
                         <div className="welcome-div">
                              <h1 className="welcome-title">Make Memories</h1>
                              <h1 className="welcome-sub-title">Go ahead, listen changes everthing.</h1>
                              <button className="btn welcome-button">START LISTENING</button>
                         </div>
                    </div>
               </div>
               <div className="artists d-flex flex-column flex-wrap justify-content-center">
                    <div className="d-inline-flex flex-column justify-content-center">
                         <div><h1 className="artists-title">Connect with Artists</h1></div>
                         <div><h1 className="artists-sub-title">You can always listen to your favourites artists.</h1></div>
                    </div>
                    <div className="d-flex flex-wrap justify-content-center">
                         <div className="w-100 p-3"></div>
                         <div className="artist">
                                   <div className="artist-card">
                                        <div className="artist-card-overlay"><h4 className="artist-card-overlay-text">Discover AESPA</h4></div>
                                        <img width="250" src={iconAespa}/>
                                   </div>
                         </div>
                         <div className="artist">
                                   <div className="artist-card">
                                        <div className="artist-card-overlay"><h4 className="artist-card-overlay-text">Discover AESPA</h4></div>
                                        <img width="250" src={iconAespa}/>
                                   </div>
                         </div>
                         <div className="artist">
                                   <div className="artist-card">
                                        <div className="artist-card-overlay"><h4 className="artist-card-overlay-text">Discover AESPA</h4></div>
                                        <img width="250" src={iconAespa}/>
                                   </div>
                         </div>
                         <div className="artist">
                                   <div className="artist-card">
                                        <div className="artist-card-overlay"><h4 className="artist-card-overlay-text">Discover AESPA</h4></div>
                                        <img width="250" src={iconAespa}/>
                                   </div>
                         </div>
                         <div className="w-100"></div>
                         <div className="artist">
                                   <div className="artist-card">
                                        <div className="artist-card-overlay"><h4 className="artist-card-overlay-text">Discover AESPA</h4></div>
                                        <img width="250" src={iconAespa}/>
                                   </div>
                         </div>
                         <div className="artist">
                                   <div className="artist-card">
                                        <div className="artist-card-overlay"><h4 className="artist-card-overlay-text">Discover AESPA</h4></div>
                                        <img width="250" src={iconAespa}/>
                                   </div>
                         </div>
                         <div className="artist">
                                   <div className="artist-card">
                                        <div className="artist-card-overlay"><h4 className="artist-card-overlay-text">Discover AESPA</h4></div>
                                        <img width="250" src={iconAespa}/>
                                   </div>
                         </div>
                         <div className="artist">
                                   <div className="artist-card">
                                        <div className="artist-card-overlay"><h4 className="artist-card-overlay-text">Discover AESPA</h4></div>
                                        <img width="250" src={iconAespa}/>
                                   </div>
                         </div>
                         <div className="w-100 p-3"></div>
                    </div>
               </div>
          <WelcomeFooter/>
          </>
     );
}
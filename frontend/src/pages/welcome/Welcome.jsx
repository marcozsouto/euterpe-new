import React, { useEffect } from "react";
import './Welcome.css'
import WelcomeFooter from "./footer/WelcomeFooter";
import WelcomeHeader from "./header/WelcomeHeader";
import Auth from "../../services/Auth";

const Welcome = () => {

     const [info, setInfo] = React.useState();
     const isLoggedIn = Auth.hasToken();

     // useEffect(()=>{
     //      async function getArtistCard(){
     //           let html = [];
     //           const response = await axios.post(`${process.env.REACT_APP_NODE_URL}artists/random`, {amount : 8});
     //           if(response.data.status == 1){
     //                let icons = response.data.result
     //                icons.forEach(function(element, index) {
     //                     if(index == parseInt(icons.length/2)){
     //                          html.push(<div className="w-100"></div>);
     //                     }
     //                     html.push(
     //                          <div className="artist">
     //                               <div className="artist-card">
     //                                    <div className="artist-card-overlay"><h4 className="artist-card-overlay-text">Discover AESPA</h4></div>
     //                                    <img width="250" src={element}/>
     //                               </div>
     //                           </div>
     //                     );
     //                });

     //                html.unshift(<div className="w-100 p-3"></div>);
     //                html.push(<div className="w-100 p-3"></div>);
     //                await setInfo(html);
     //           }
     //      }
     //      if(!isLoggedIn) getArtistCard();
     // }, []) 

     return (
          <>
          <WelcomeHeader/>
               <div className="welcome">
                    <div className="welcome-divs">
                         <div className="welcome-div">
                         {isLoggedIn ? (
                              <>
                              <h1 className="welcome-title">Get into it</h1>
                              <h1 className="welcome-sub-title">Continue making story.</h1>
                              <button className="btn welcome-button">OPEN WEB PLAYER</button>
                              </>
                         ) : (
                              <>
                              <h1 className="welcome-title">Make Memories</h1>
                              <h1 className="welcome-sub-title">Go ahead, listen changes everthing.</h1>
                              <button className="btn welcome-button">START LISTENING</button>
                              </>
                         )}
                         </div>
                    </div>
               </div>
               <div className="artists d-flex flex-column flex-wrap justify-content-center">
                    {!isLoggedIn ? (
                    <div className="d-inline-flex flex-column justify-content-center">
                         <div><h1 className="artists-title">Connect with Artists</h1></div>
                         <div><h1 className="artists-sub-title">You can always listen to your favourites artists.</h1></div>
                    </div>
                         ) : (<></>)}
                    <div className="d-flex flex-wrap justify-content-center">
                         {info}
                    </div>
               </div>
          <WelcomeFooter/>
          </>
     );
}

export default Welcome;
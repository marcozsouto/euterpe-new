import React from "react";
import IconEuterpe from "../../fix/icon-euterpe/IconEuterpe";
import './WelcomeFooter.css'


export default function WelcomeFooter(){
     return (
          <div className="footer">
               <div className="footer-divs">
                    <div className="footer-div">
                         <IconEuterpe props={{width: 150, hover: false}}/>
                    </div>
                    <div className="footer-div">
                         <p className="p-footer">This is a open source project made by <a class="link-footer" target="_blank" href="https://www.linkedin.com/in/marcozsouto/">marcozsouto</a> as a way to make me learn more about React JS and Node JS.</p>
                    </div>
                    <div className="w-100"></div>
                    <div className="footer-div mt-5">
                         <p className="p-footer-copyright">All rights reserved to © 2021 Euterpe</p>
                    </div>
               </div>
          </div>
     );
}
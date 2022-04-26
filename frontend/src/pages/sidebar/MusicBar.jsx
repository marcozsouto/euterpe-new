import React, { useState } from "react";
import styled from 'styled-components';
import UserBarStyle from "./Userbar";

const MusicBarStyle = styled.div`
     position: absolute;
     z-index: 10;
     ${props => props.width <= 425 ? `
          background-color: #1F1F1F;
          bottom: 60px;
          width: 94%; 
          right: 3%;
          height: 60px;
          border-radius: 5px;
     ` : `
          top: 0;
          right: 0;
          height: 75px;
          width: calc(100% - 80px);
          background-color: #1F1F1F;
          transition: 0.4s;
          ${UserBarStyle}:hover ~ & {
               width: calc(100% - 250px);
               transition: 0.4s;
          }
     `}
`;

export default function MusicBar(props){
     return (
          <>
               <MusicBarStyle width={props.width}/>
          </>
     );
}
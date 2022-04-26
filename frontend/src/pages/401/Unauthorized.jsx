import React, { useState } from "react";
import useWindowSize from "../../fix/responsive/windows-size";
import Container from "../sidebar/Container";
import MusicBar from "../sidebar/MusicBar";
import UserBar from "../sidebar/Userbar";


export default function Unauthorized(props){
     const { width } = useWindowSize();

     return (
          <>
               <UserBar width={width}/>
               <MusicBar width={width}/>
               <Container width={width}/>
          </>
     );
}
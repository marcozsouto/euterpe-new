import React from "react";
import Icon from "../../assets/images/header/euterpe-name.svg"
import './IconEuterpe.css';

export default function IconEuterpe({props}){
     return (
          <img className={props.hover ? "euterpe-name-hover" : ''} src={Icon} width={props.width}/>
     );

}
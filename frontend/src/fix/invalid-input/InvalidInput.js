import React from "react";
import './InvalidInput.css';

export default function InvalidInput({props}){
    return (   
        <div class="invalid-feedback" style={{display: "block"}}>
            {props.text}
        </div>
    );
}
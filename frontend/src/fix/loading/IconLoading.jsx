import React from "react";
import './loading.css';

export default function IconLoading({props}){
    return (   
    <div class="spinner-border spinner-border-sm text-light" role="status" style={{width: `${props.size}rem`, height: `${props.size}rem`}}>
        <span class="sr-only"></span>
    </div>
    );
}


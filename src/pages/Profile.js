import React, from 'react';
import axios from "axios";



export default function Profile(){
    const {id} = JSON.parse(sessionStorage.getItem("user"))
    return (
        <div className="Profile">
            <h1>Profile</h1>
            <div className="form-box">
                <h4>UserName:</h4>
                <h4></h4>
            </div>
        </div>
    )
}


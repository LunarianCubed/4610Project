import React from 'react';
import axios from "axios";



export default function Profile(){
    const userId = sessionStorage.getItem('user');
    if (!userId) {
        window.alert('You must be logged in');
        window.location.assign("/Login");
        return;
    }

    const username = sessionStorage.getItem('name');
    const email = sessionStorage.getItem('email');
    return (
        <div className="Profile">
            <h1>Profile</h1>
            <div className="form-box">
                <h4>UserName:`${username}`</h4>
                <h4>email:`${email}`</h4>
            </div>
        </div>
    )
}


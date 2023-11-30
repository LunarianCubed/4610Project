import React from 'react';
import './alignPages.css';
import './Comments.css';



export default function Comments(){
    return (
        <div class = "messages">
            <div class = "notification">
                <header>
                    <div class = "notificationHeader">
                        <h1>Messages</h1>
                        <span id = "num-of-notif"></span>
                    </div>
                </header>
                <main>
                    <div class = "notificationCard unread">
                        <div class = "description">
                            <p>Appointment pending</p>
                            <p id = "notif-time">1m ago </p>
                        </div>
                    </div>
                    <div class = "notificationCard unread">
                        <div class = "description">
                            <p>Appointment Pending</p>
                            <p id = "notif-time">1m ago from Andrew</p>
                        </div>
                    </div>
                    <div class = "notificationCard">
                        <div class = "description">
                            <p>Appointment pending</p>
                            <p id = "notif-time">1m ago from Luke</p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
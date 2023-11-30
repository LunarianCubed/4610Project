import React, {useState} from "react";
import Axios from 'axios';
import './Login.css';
import './alignPages.css';


function App() {

    const [nameReg, setNameReg] = useState("");
    const [emailReg, setEmailReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const[loginStatus, setLoginStatus] = useState("");


    const register = () => {
        Axios.post('http://localhost:3001/register', {
            name: nameReg,
            email: emailReg,
            password: passwordReg,
        }).then((response) => {
            console.log(response);
            window.location.assign("/Profile")
        });
    }

    const login = () => {
        Axios.post('http://localhost:3001/login', {
            email: email,
            password: password,
        }).then((response) => {
            if (response.data.message){
                setLoginStatus(response.data.message)
            } else {
                setLoginStatus(response.data[0].email)
                console.log(response.data)
                //remove location to see the data and user being displayed on login
                window.location.assign("/Profile")
            }
        });
    }




    return (
        <div className="Login">
            <div className="registration">
                <h1>Registration</h1>

                <input type="text" placeholder="Name"
                       onChange={(e) => {
                           setNameReg(e.target.value);
                       } } />

                <input type="text" placeholder="Email"
                       onChange={(e) => {
                           setEmailReg(e.target.value);
                       } } />

                <input type="text" placeholder="Password"
                       onChange={(e) => {
                           setPasswordReg(e.target.value);
                       } } />
                <button onClick={register}> Register </button>
            </div>





            <div className="login">
                <h1>Login</h1>
                <input type="text" placeholder="Email..."
                       onChange={(e) => {
                           setEmail(e.target.value);
                       } } />
                <input type="text" placeholder="Password..."
                       onChange={(e) => {
                           setPassword(e.target.value);
                       } } />
                <button onClick={login}> Login </button>
            </div>
            <h1>{loginStatus}</h1>
        </div>

    );
}

export default App;
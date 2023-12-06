import React, {useState} from "react";
import Axios from 'axios';


function App() {

    const [nameReg, setNameReg] = useState("");
    const [emailReg, setEmailReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");



    const register = () => {
        Axios.post('http://localhost:3001/register', {
            name: nameReg,
            email: emailReg,
            password: passwordReg,
        }).then((response) => {
            if (response.status === 200) {
                window.alert("User registered successfully")
            } else {
                window.alert("This email has already been registered")
            }
        });
    }

    const login = () => {
        Axios.post('http://localhost:3001/login', {
            email: email,
            password: password,
        }).then((response) => {
            if (response.status === 200) {
                sessionStorage.setItem("user", response.data.id)
                sessionStorage.setItem("email", response.data.email)
                sessionStorage.setItem("name", response.data.name)
                window.alert("Login successfully")
                window.location.assign("/comments");
            } else {
                window.alert(response.data.message)
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
        </div>

    );
}

export default App;
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
            if (response.data.message) {
                window.alert("Wrong email or password!")
            } else {
                sessionStorage.setItem("user", response.data[0].id)
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
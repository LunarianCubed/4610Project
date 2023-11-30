import './App.css';
import React from 'react';
import Navbar from "./Navbar";
import Comments from "./pages/Comments";
import Home from './pages/Home';
import List from "./pages/List";

document.body.style.background = '#222436';

function App() {
    let component
    switch (window.location.pathname){
        case"Tags":
            component = <Tags />
            break
        case"List":
            component = <List />
            break
        case"Login":
            component = <Login />
            break
        case"Comments":
            component = <Comments />
            break
        case"/":
            component = <Home />
            break
    }
    return (
        <>
            <Navbar />
            <div className = "app">
                {component}
            </div>
        </>

    );
}

export default App;

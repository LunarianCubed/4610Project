import './App.css';
import Navbar from "./Navbar"
import Messages from "./pages/Messages"
import List from "./pages/List"
import React from 'react';
import Home from './pages/Home';

document.body.style.background = '#222436';

function App() {
    let component
    switch (window.location.pathname){
        case"/":
        component = <Home />
        break
    }
    return (
        <>
        <Navbar />
        <div className = "App">
            {component}
        </div>
        </>

  );
}

export default App;

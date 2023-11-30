import './App.css';
import React from 'react';

import Navbar from "./Navbar";
import Login from "./pages/Login";
import Home from './pages/Home';
import Comments from "./pages/Comments";
import List from "./pages/List";
import Tags from "./pages/Tags";
import Search from "./pages/Search";

function App() {
    let component
    switch (window.location.pathname){
        case"/":
            component = <Home />
            break
        case"Tags":
            component = <Tags />
            break
        case"List":
            component = <List />
            break
        case"Login":
            component = <Login />
            break
        case"Search":
            component = <Search />
            break
        case"Comments":
            component = <Comments />
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

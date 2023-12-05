import React from 'react';

import Navbar from "./Navbar";
import Login from "./pages/Login";
import Home from './pages/Home';
import UserComents from "./pages/userComents";
import List from "./pages/List";
import Tags from "./pages/Tags";
import Search from "./pages/Search";
import NotFound from "./pages/notFound";
import Article from "./pages/Article";
import articleComments from "./pages/articleComments";

function App() {
    let component
    switch (window.location.pathname){
        case"/":
            component = <Home />
            break
        case"/tags":
            component = <Tags />
            break
        case"/articleList":
            component = <List />
            break
        case"/login":
            component = <Login />
            break
        case"/search":
            component = <Search />
            break
        case"/comments":
            component = <UserComents />
            break

        default:
            if(window.location.pathname.startsWith("/article/")) {
                component = <Article/>
            }
            else if(window.location.pathname.startsWith("/Comments/")) {
                component = <articleComments />
            }else{
                component = <NotFound />
            }
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

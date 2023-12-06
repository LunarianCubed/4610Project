import React from 'react';

import Navbar from "./Navbar";
import Login from "./pages/Login";
import Home from './pages/Home';
import UserComments from "./pages/userComments";
import List from "./pages/List";
import Tags from "./pages/Tags";
import Search from "./pages/Search";
import NotFound from "./pages/notFound";
import Article from "./pages/Article";
import articleComments from "./pages/articleComments";
import Tagged_articles  from "./pages/tagged_articles";

function App() {
    let component
    switch (window.location.pathname){
        case"/":
            component = <Home />
            break
        case"/Tags": component = <Tags />
            break
        case"/ArticleList":
            component = <List />
            break
        case"/Login":
            component = <Login />
            break
        case"/Search":
            component = <Search />
            break
        case"/Comments":
            component = <UserComments />
            break

        default:
            if(window.location.pathname.startsWith("/Article/")) {
                component = <Article/>
            }
            else if(window.location.pathname.startsWith("/Tag/")) {
                component = <Tagged_articles />
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

import React, { useState, useEffect} from 'react';
import axios from "axios";
import {BrowserRouter} from "react-router-dom";

const Tagged_articles = () => {
    const path = window.location.pathname;
    const parts = path.split("/");
    const tagName= parts[parts.length - 1];
    const [articles, setArticles] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchArticles() {
            try {
                const response =
                    await axios.get(`http://localhost:3001/tags/${tagName}`);
                setArticles(response.data.data);
                setError(null);
            } catch (error) {
                console.error("Error fetching article: ", error);
                setError(error);
            }
        }
        fetchArticles();

    }, [tagName]);


    return (
        <div>
            <BrowserRouter>
                <h2>{tagName}</h2>
                {articles.length === 0 ? (
                    <p>No article found.</p>
                ) : (
                    articles.map((article, index) => (
                        <li key={index}>
                            <h3>{article.title}</h3>
                        </li>
                    ))
                )}
            </BrowserRouter>
        </div>
    )
}


export default Tagged_articles;
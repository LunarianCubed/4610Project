import React,{ useState, useEffect} from 'react';
import axios from "axios";
import {Link, BrowserRouter} from "react-router-dom";



export default function List(){
    const [articles, setArticles] = useState([])
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchArticles() {
            try {
                const response
                    = await axios.get("http://localhost:3001/articles");
                setArticles(response.data.data);
                setError(null);
            } catch (error) {
                console.error("Error fetching articles: ", error);
                setError(error);
            }
        }
        fetchArticles();

    }, []);

    return (
        <div>
            <h2>All Articles</h2>
            {error && <p>{error}</p>}
            <ul>
                {articles.map((article, index) => (
                    <li key={index}>
                        <BrowserRouter>
                        <Link to={`/Article/${article.title}`}>
                            <h3>{article.title}</h3>
                        </Link></BrowserRouter>
                        <p>Date: {new Date(article.date).toLocaleDateString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    )

}


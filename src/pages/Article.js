import React, { useState, useEffect} from 'react';
import axios from "axios";

const ArticleViewer = () => {
    const path = window.location.pathname;
    const parts = path.split("/");
    const articleTitle= parts[parts.length - 1];
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        async function fetchArticles() {
            try {
                const response =
                    await axios.get(`http://localhost:3001/articles/${articleTitle}`);
                setArticles(response.data);

            } catch (error) {
                console.error("Error fetching article: ", error);
            }
        }
        fetchArticles();

    }, [articleTitle]);


    return (
        <div>
            <h2>{articleTitle}</h2>
            {articles.length === 0 ? (
                <p>No article found.</p>
            ) : (
                <p>{articles}</p>
            )}
        </div>
    )
}


export default ArticleViewer;
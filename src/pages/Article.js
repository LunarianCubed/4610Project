import React, { useState, useEffect} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";

const ArticleViewer = () => {
    const [articles, setArticles] = useState([]);
    const {articleTitle} = useParams();
    useEffect(() => {
        async function fetchArticles() {
            try {
                const response =
                    await axios.get(`http://localhost:3001/articles/${articleTitle}`);
                setArticles(response.data.data);

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
                <ul>
                    {articles.map((article, index) => (
                        <li key={index}>
                            <h3>{article.title}</h3>
                            <p>Date: {new Date(article.date).toLocaleDateString()}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}


export default ArticleViewer;
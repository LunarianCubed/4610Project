import React, { useState, useEffect}from 'react';
import axios from "axios";

const ArticleViewer = () => {
    const articles, setArticles] = useState([]);
    const [articleTitle, setArticleTitle] = useState("");
    useEffect(() => {
        async function fetchArticles() {
            try {
                const response = await axios.get("http://localhost:3001/articles");
                setArticles(response.data.data);
            } catch (error) {
                console.error("Error fetching articles: ", error);
            }
        }
        fetchArticles();

    }, []);

    return (
        <div>
            <h2>Article</h2>
            <ul>
                {articles.map((article, index) => (
                    <li key={index}>
                        <h3>{article.title}</h3>
                        <p>Date: {new Date(article.date).toLocaleDateString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}


export default ArticleViewer;
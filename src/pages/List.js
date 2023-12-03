import React,{ useState, useEffect} from 'react';
import axios from "axios";



export default function List(){
    const [articles, setArticles] = React.useState([])

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
            <h2>All Articles</h2>
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


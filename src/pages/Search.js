import React, { useState } from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';



const SearchPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    // const handleSearch = async () => {
    //     try {
    //         const response = await fetch(`/search?q=${searchTerm}`);
    //         if (response.ok) {
    //             const data = await response.json();
    //             setSearchResults(data.data);
    //         } else {
    //             throw new Error('Failed to fetch data');
    //         }
    //     } catch (error) {
    //         console.error('Error:', error);
    //     }
    // };

    const handleSearch = async () => {
        try {
            const response = await axios.get(`/search`, {
                params: {
                    q: searchTerm
                }
            });

            if (response.status === 200) {
                setSearchResults(response.data.data);
            } else {
                throw new Error('Failed to fetch data');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleChange}
            />
            <button onClick={handleSearch}>Search</button>

            <div>
                {searchResults.map((article) => (
                    <li key={article.id}>
                        <Link to={`/article/${article.title}`}>
                        <h3>{article.title}</h3>
                        </Link>
                    </li>
                ))}
            </div>
        </div>
    );
};

export default SearchPage;

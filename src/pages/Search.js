import React, { useState } from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';



const SearchPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [error, setError] = useState(null);

      const handleSearch = async () => {
          if (!searchTerm.trim()) {
              setError('Please enter a search term');
              return;
          }
        try {
            const response = await axios.get(`http://localhost:3001/search`, {
                params: {
                    q: searchTerm
                }
            });
            setSearchResults(response.data.data);
            setError(null);
        } catch (error) {
            console.error('Error:', error);
            setError(error);
            setSearchResults([]);
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
                {error && <p>{error}</p>}
                {searchResults.length === 0 && !error &&(
                    <p>No results found</p>
                )}
                <ul>
                {searchResults.map((article) => (
                    <li key={article.id}>
                        <Link to={`/article/${article.title}`}>
                            <h3>{article.title}</h3>
                        </Link>
                    </li>
                ))}
                </ul>
            </div>
        </div>
    );
};

export default SearchPage;

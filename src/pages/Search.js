import React, { useState } from 'react';
import {Link} from "react-router-dom";

const SearchPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await fetch(`/search?q=${searchTerm}`);
            if (response.ok) {
                const data = await response.json();
                setSearchResults(data.data.title);
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

// export default function Search() {
//     const [searchTerm, setSearchTerm] = useState("");
//     const [searchResult, setSearchResult] = useState([]);
//
//     const handleSearch = async () => {
//         try {
//             const response
//                 = await axios.get(`/search?q=${searchTerm}`);
//             setSearchResult(response.data.data);
//         } catch (error) {
//             console.error("Error fetching data: ", error);
//         }
//     };
//
//     return (
//         <div className='Search'>
//             <input
//                 type="text"
//                 placeholder="Enter search term..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <button onClick={handleSearch}>Search</button>
//         </div>
//     );
// }
//
//
//

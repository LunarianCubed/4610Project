import React from 'react';
import axios from "axios";
import './alignPages.css';
import './Search.css';
import SearchResults from "./SearchResults";



//search page
export default function Search() {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResult, setSearchResult] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`/search?q=${searchTerm}`);
            setSearchResult(response.data.data);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    return (
        <div className='Search'>
            <input
                type="text"
                placeholder="Enter search term..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>

            <SearchResults searchResult={searchResult} />
        </div>
    );
}

import React from 'react';
import './alignPages.css';



function SearchPage({searchResult}) {
    return (
        <div>
            <h2>
                Search Results
            </h2>
            <ul>
                {searchResult.map((result) => (
                    <li key={result.id}>
                        <h3>{result.title}</h3>
                        <p>{result.body}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SearchPage;
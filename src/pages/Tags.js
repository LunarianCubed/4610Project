import React,{ useState, useEffect} from 'react';
import axios from "axios";
import {Link, BrowserRouter} from "react-router-dom";



export default function Tags(){
    const [tags, setTags] = useState([])
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchTagList() {
            try {
                const response
                    = await axios.get("http://localhost:3001/TagList");
                setTags(response.data.data);
                setError(null)
            } catch (error) {
                console.error("Error fetching tag list: ", error);
                setError(error);
            }
        }
        fetchTagList();

    }, []);

    console.log(tags);

    return (
        <div>
            <h2>All Tags</h2>
            {error && <p>{error}</p>}
            <BrowserRouter>
            <ul>
                {tags.map((tag, index) => (
                    <li key={index}>
                            <Link to={`/Tags/${tag.name}`}>
                                <h3>{tag.name}</h3>
                            </Link>
                    </li>
                ))}
            </ul>
            </BrowserRouter>
        </div>
    )
}
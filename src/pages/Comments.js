import React , {useState, useEffect} from 'react';
import axios from "axios";



export default function Comments(){
    const [userComments, setUserComments] = useState([]);

    useEffect(() => {
        fetchUserComments();
    }, []);

    const fetchUserComments = async () => {
        try {
            const userId = localStorage.getItem('user');
            const response = await axios.get(`http://localhost:3001/comments/${userId}`);
            setUserComments(response.data.data);
        } catch (error) {
            console.error('Error fetching user comments: ', error);
        }
    };

    return (
        <div>
            <h2>User Comments</h2>
            {userComments.length === 0 ? (
                <p>No comments found for this user.</p>
            ) : (
                <ul>
                    {userComments.map((comment, index) => (
                        <li key={index}>
                            <p>{comment.content}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
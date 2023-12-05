import React , {useState, useEffect} from 'react';
import axios from "axios";
import Profile from "./Profile";



export default function UserComents(){
    const [userComments, setUserComments] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchUserComments();
    }, []);

    const fetchUserComments = async () => {
        try {
            const userId = sessionStorage.getItem('user');
            if (!userId) {
                setError('You must be logged in');
                return;
            }
            const response
                = await axios.get(`http://localhost:3001/comments/${userId}`);
            setUserComments(response.data.data);
        } catch (error) {
            console.error('Error fetching user comments: ', error);
            setError(error);
        }
    };

    return (
        <div>
            <Profile />
            {error && <p>{error}</p>}
            <h2>User Comments</h2>
            {userComments.length === 0 ?
                (
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
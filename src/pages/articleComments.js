
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ArticleComments = ({ articleId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/articles/${articleId}/comments`);
            setComments(response.data.data);
            setError(null);
        } catch (error) {
            console.error('Error fetching comments: ', error);
            setError(error);
        }
    };

    const addComment = async () => {
        try {
            await axios.post(`http://localhost:3001/comments/${articleId}/comments`, {
                content: newComment,
            });
            fetchComments();
            setNewComment('');
        } catch (error) {
            console.error('Error adding comment: ', error);
            setError(error);
        }
    };

    return (
        <div>
            {error && <p>{error}</p>}
            <h2>Article Comments</h2>
            <ul>
                {comments.map((comment, index) => (
                    <li key={index}>
                        <p>{comment.content}</p>
                    </li>
                ))}
            </ul>
            <div>
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a new comment..."
                ></textarea>
                <button onClick={addComment}>Add Comment</button>
            </div>
        </div>
    );
};

export default ArticleComments;

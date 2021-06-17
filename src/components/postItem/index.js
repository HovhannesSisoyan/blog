import React from 'react';
import './postItem.css'

const PostItem = ({ title, body, category, author }) => {
    return (
        <article className="post-item">
            <h1>
                {title}
            </h1>
            <span className="post-item-category">{`category: ${category}`}</span>
            <p>
                {body}
            </p>
        </article>
    )
}

export default PostItem;
import React, { useState, useEffect } from 'react';
import PostItem from './postItem';

const Posts = () => {

    const [postsData, setPostData] = useState([]);
    useEffect(() => {
        fetch('https://localhost:5001/post').then(res => res.json()).then(res => setPostData(res));
    }, [])


    return (
        <section>
            {postsData.map(({body, title, category}) => (
                <PostItem body={body} title={title} category={category}/>
            ))}
        </section>
    )
}

export default Posts;
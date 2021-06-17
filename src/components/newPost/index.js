import React, { useState } from 'react';
import cookie from 'react-cookies';
import { createHook } from "overmind-react";

import './styles.css';

const definedCategories = [ 'IT', 'Politics', 'Art', 'Sport', 'Fashion', 'Other',]

const NewPost = () => {

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState(definedCategories[0]);
    const [content, setContent] = useState('');

    const useOvermind = createHook();
    const { state } = useOvermind();
    const { userData: { userId } } = state;

    const handleSubmit = async event => {
        event.preventDefault();
        await fetch('https://localhost:5001/posts', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
              Authorization: `Bearer ${cookie.load('authToken')}`,
              'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({"UserId": userId,"Title": title, "Body": content, "Category": category })
          })
          .then(res => res.json())
          .then(res =>  {
            //   if (res.statusCode === 200) {
            //     setLoginStatus('Successfully logged In!');
            //     actions.login(res.value.token);
            //     actions.setUserData(res.value.user);
            //     localStorage.setItem('userId', JSON.stringify(res.value.user.userId));
            //     cookie.save('authToken', res.value.token, { path: '/' })
            //     history.push('/');
            // } else {
            //     setLoginStatus('Wrong login or password!');
            // }
            console.log('new post res=', res);
        })
    };

    return (
        <div className="new-post-form">
            <form>
                <input type="text" 
                       className="new-post-form-title" 
                       placeholder="Enter Post Title" 
                       value={title}
                       onChange={event => setTitle(event.target.value)}
                />
                <div className={"new-post-form-categories"}>
                    <span className={"new-post-form-categories-span"}>Category</span>
                    <select className={"new-post-form-categories-select"} value={category} onChange={event => setCategory(event.target.value)}>
                        {definedCategories.map(cat =>  <option selected={category}>{cat}</option> )}
                    </select>
                </div>
                <textarea type="text" 
                       className="new-post-form-content" 
                       placeholder="Enter Post Content" 
                       value={content}
                       onChange={event => setContent(event.target.value)}
                />
                <div className="login-form-submit">
                    <button 
                        type="submit" 
                        className="login-form-button"
                        onClick={event => handleSubmit(event)}
                    >Add Post</button>
                </div>
            </form>
        </div>
    )
}

export default NewPost;
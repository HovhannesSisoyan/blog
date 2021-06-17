import React, { useEffect } from 'react';
import cookie from 'react-cookies';
import { createHook } from "overmind-react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import HomePage from './components/homePage';
import Login from './components/login';
import Posts from './components/posts';
import Profile from './components/profile';
import NewPost from './components/newPost';
import Navigation from './components/navigation';
import Registration from './components/registration';


export const Routes = () => {
    const useOvermind = createHook();
    const { state, actions } = useOvermind();
    const { isLoggedIn } = state;

    useEffect(() => {
        const authToken = cookie.load('authToken');
        if (authToken) {
            fetch('https://localhost:5001/restore-login', {
                headers: {
                    'Content-Type': 'application/json'
                  },
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
                method: 'POST',
                body: JSON.stringify({"Token": authToken, "UserId": localStorage.getItem('userId')})
            })
                .then(res => res.json())
                .then(res => {
                    if (res.token) {
                      actions.login(res.token);
                      actions.setUserData(res.user);
                      cookie.save('authToken', res.token, { path: '/' })
                  }
              })
        }
    }, [])

    return (
        <>
            <Router>
                <Route path="/" component={Navigation} />
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/posts" component={Posts} />
                    { !isLoggedIn && <Route exact path="/login" component={Login} /> }
                    { !isLoggedIn &&<Route exact path="/register" component={Registration} /> }
                    { isLoggedIn &&<Route exact path="/profile" component={Profile} /> }
                    { isLoggedIn &&<Route exact path="/new-post" component={NewPost} /> }
                </Switch>
            </Router>
        </>
    )
}

export default Routes;
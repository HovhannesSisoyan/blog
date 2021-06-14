import React, { useState } from 'react';
import { createHook } from "overmind-react";
import cookie from 'react-cookies';
import { useHistory } from "react-router-dom"


import './styles.css';

export const Login = () => {
    const [emailOrUsername, setEmailOrUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState(null);
    const history = useHistory();

    const useOvermind = createHook();
    const { actions } = useOvermind();

    const handleSubmit = async event => {
        event.preventDefault();
        await fetch('https://localhost:5001/login', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({"EmailOrUsername": emailOrUsername, "Password": password})
          })
          .then(res => res.json())
          .then(res =>  {
              if (res.statusCode === 200) {
                setLoginStatus('Successfully logged In!');
                actions.login(res.value.token);
                actions.setUserData(res.value.user);
                localStorage.setItem('userId', JSON.stringify(res.value.user.userId));
                cookie.save('authToken', res.value.token, { path: '/' })
                history.push('/');
            } else {
                setLoginStatus('Wrong login or password!');
            }
        })
    };

    return (
        <div className="login-form">
            <form>
                <input type="email" 
                       className="login-form-email" 
                       placeholder="Enter username or email" 
                       value={emailOrUsername}
                       onChange={event => setEmailOrUsername(event.target.value)}
                />
                <input type="password" 
                       className="login-form-password"
                       placeholder="Password"
                       value={password}
                       onChange={event => setPassword(event.target.value)} 
                />
                <div className="login-form-submit">
                    <button 
                        type="submit" 
                        className="login-form-button"
                        onClick={event => handleSubmit(event)}
                    >Login</button>
                </div>
            </form>
            <div className="alert alert-success mt-2" role="alert">
                {loginStatus && (
                    <span>
                        {loginStatus}
                    </span>
                )}
            </div>
            <div className="registerMessage">
                <span>Dont have an account? </span>
                {/* <span className="loginText" onClick={() => redirectToRegister()}>Register</span>  */}
                <span className="loginText">Register</span> 

            </div>
        </div>
    )
}

export default Login;
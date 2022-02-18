import React, {useState, useEffect } from "react";
import "./loginForm.css";
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';
import SignupForm from '../SignupForm/SignupForm';
import { Link } from 'react-router-dom'
import {handleModal} from '../Welcome/Welcome'

const LoginForm = ({handleModal}) => {
    const [userFormData, setUserFormData] = useState({ email: '', password: '' });
    const [validated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const [login, {error}] = useMutation(LOGIN_USER);

    useEffect(() => {
        error ? setShowAlert(true) : setShowAlert(false);
    }, [error]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
        if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
    }

    try {
        const { data } = await login({
            variables: { ...userFormData},
    });

    Auth.login(data.login.token);

    } catch (err) {
        console.error(err);
    }

    setUserFormData({
        email: '',
        password: '',
    });
};

return (
    <>
        <div className="min-h-screen max-h-screen max-w-screen flex justify-center items-center loginBg">
            <div className="w-1/3 h-1/2 loginCard">
                
            <svg xmlns="http://www.w3.org/2000/svg" class="site__logo" width="56" height="84" viewBox="77.7 214.9 274.7 412"><defs><linearGradient id="a" x1="0%" y1="0%" y2="0%"><stop offset="0%" stop-color="#8ceabb"/><stop offset="100%" stop-color="#378f7b"/></linearGradient></defs><path fill="url(#a)" d="M215 214.9c-83.6 123.5-137.3 200.8-137.3 275.9 0 75.2 61.4 136.1 137.3 136.1s137.3-60.9 137.3-136.1c0-75.1-53.7-152.4-137.3-275.9z"/></svg>
                
                
                <h2 className="text-3x1 font-bold mb-10 text-center font-fa loginTitle">LOG IN</h2>
                <form className="space-y-8" noValidate validated={validated} onSubmit={handleFormSubmit}>
                    {/* <alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
                    Something went wrong with your login credentials!
                    </alert> */}
                    <div>
                    <label className="block mb-2 font-bold" htmlFor='email'></label>
                    <input
                        type='text'
                        placeholder='Email'
                        name='email'
                        onChange={handleInputChange}
                        value={userFormData.email}
                        required
                    />
                    {/* <label type='invalid'>Email is required!</label> */}
                    </div>

                    <div>
                    <label className="block mb-2 font-bold" htmlFor='password'></label>
                    <input
                        type='password'
                        placeholder='Password'
                        name='password'
                        onChange={handleInputChange}
                        value={userFormData.password}
                        required
                    />
                    {/* <label type='invalid'>Password is required!</label> */}
                    </div>
                    <button
                        disabled={!(userFormData.email && userFormData.password)}
                        type='submit'
                        variant='success' className="loginBtn">
                        Log In
                    </button>
                    <p className="loginSignup">Don't have an account? <span><Link to="/signup" className="underline cursor-pointer">Sign up!</Link></span></p>
                </form>
            </div>

        </div>
    </>
);
};

export default LoginForm;

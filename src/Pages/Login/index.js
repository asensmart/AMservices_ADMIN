import React, { useState, useEffect, useRef } from 'react';
import { ArrowRightOutlined } from '@ant-design/icons';
import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { notification, Spin } from 'antd';
import axios from 'axios';

function Login() {

    const emailInputRef = useRef();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        emailInputRef.current.focus();
    }, [])

    const SubmitHandler = (e) => {
        e.preventDefault();
        
        if (email.trim().length !== 0 && password.trim().length !== 0) {
            setLoading(true)
            axios.post('/post/login', { email, password }).then(res => {
                setLoading(false)
                navigate('/dashboard');
            }).catch(error => {
                setLoading(false)
                notification['error']({
                    message: error.response.data.message
                })
            })
        } else {
            notification['error']({
                message: "All field required"
            })
        }

    }

    return (
        <div className='login-container' >
            <Spin spinning={loading} >
                <form className='form-container' onSubmit={SubmitHandler} >
                    <img src={logo} alt={'Logo'} className={'logo'} />
                    <h2><span>Sign in</span> To Admin Dashboard</h2>
                    <p>Welcome back! Please provide credentials</p>

                    <div className='form-input-container' >
                        <label>Email* :</label>
                        <input type={'email'} ref={emailInputRef} placeholder={'Email Address'} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className='form-input-container'>
                        <label>Password* :</label>
                        <input type={'password'} placeholder={'Password'} onChange={e => setPassword(e.target.value)} />
                    </div>
                    <div className='signin-btn-container' >
                        <button type='submit' className='signin-btn'>Sign in <span><ArrowRightOutlined style={{ fontSize: '16px', fontWeight: 'bold' }} /></span> </button>
                    </div>

                </form>
            </Spin>
        </div>
    );
}

export default Login;
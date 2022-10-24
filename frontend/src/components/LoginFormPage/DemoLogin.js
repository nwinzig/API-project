import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginForm.css';


function DemoLoginButton () {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState('Demo-lition');
    const [password, setPassword] = useState('password');
    const [errors, setErrors] = useState([]);

    const handleClick = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password })).catch(
            async (res) => {
                const data = await res.json();
                // console.log('is there data here', data)
                // console.log('does this catch errors', data.errors)
                // console.log('what happens here', typeof data.errors)
                // if (data && data.errors) setErrors(data.errors);
                if (data) setErrors([data.errors]);
                // console.log('what does errors look like', errors)
            }
        );
    };

    return (
        <div >
            <button className='demoButton'onClick={handleClick}>
                Demo User
            </button>
        </div>
    )
}

export default DemoLoginButton;

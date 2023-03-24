import React, { useState } from 'react';
import Navbar from "../Navbar/Navbar";

function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // handle form submission
        if (username && password && password === confirmPassword) {
            // redirect to admin component
            window.location.href = '/admin';
        }
    }

    return (
        <>
            <Navbar />
            <>
                <div className='container bg-dark w-75 main-contianer'>
                    <div className='row Pre p-5'>
                        <div className='col-10 mx-auto'>
                            <div className='row text-center'>
                                <h1 className='text-danger'>Sign Up</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='container bg-light w-75 main-contianer'>
                        <div className='row p-5'>
                            <div className='col-10 mx-auto'>
                                <div className="row w-50 mx-auto">
                                    <div className="col-md-12">
                                        <input className='form-control m-2' type="text" placeholder='Username' value={username} onChange={handleUsernameChange} />
                                        <input className='form-control m-2' type="password" placeholder='Password' value={password} onChange={handlePasswordChange} />
                                        <input className='form-control m-2' type="password" placeholder='Confirm Password' value={confirmPassword} onChange={handleConfirmPasswordChange} />
                                    </div>
                                </div>
                                <div className="row w-50 mx-auto">
                                    <div className="col-md-12">
                                        <button className='btn btn-success w-100 m-2' onClick={handleSubmit}>Create Account</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </>

    );
}

export default SignUp;
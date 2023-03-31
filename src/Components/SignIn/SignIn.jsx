import React, { useState , useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useFirebase } from '../firebase-config';
import Navbar from "../Navbar/Navbar";

function SignIn() {
  const firebase = useFirebase();
  const navigate = useNavigate();

    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (firebase.isLoggedIn) {
      // navigate to home
      navigate("/dashboard");
    }
    
  }, [firebase, navigate]);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
}

const handlePasswordChange = (event) => {
    setPassword(event.target.value);
}

const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("login in a user...");
  const result = await firebase.singinUserWithEmailAndPass(email, password);
  console.log("Successfull", result);
  if (email && password ) {
    // redirect to admin component
    window.location.href = '/dashboard';
}
// localStorage.setItem('Signin', true);
// navigate('/dashboard');
};

// useEffect(() => {
//   let login = localStorage.getItem('Signin');
//   if(login){
//    navigate('/dashboard');
//   }
// });

  return (
    <>
    <Navbar/>
    <>
      <div className='container bg-dark w-75 main-contianer'>
        <div className='row Pre p-5'>
          <div className='col-10 mx-auto'>
            <div className='row text-center'>
              <h1 className='text-danger'>LogIn</h1>
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
                        <input className='form-control m-2' type="text" placeholder='Email' value={email} onChange={handleEmailChange}/>
                        <input   className='form-control m-2' type="password" placeholder='Password' value={password} onChange={handlePasswordChange}/>
                    </div>
                </div>
                <div className="row w-50 mx-auto">
                    <div className="col-md-12">
                       <Link to={"/dashboard"} className='btn btn-success w-100 m-2' onClick={handleSubmit} >Log In</Link>
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

export default SignIn;

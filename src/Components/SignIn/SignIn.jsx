import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from "../Navbar/Navbar";

function SignIn() {
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
                        <input className='form-control m-2' type="text" placeholder='Username'/>
                        <input   className='form-control m-2' type="text" placeholder='Password'/>
                    </div>
                </div>
                <div className="row w-50 mx-auto">
                    <div className="col-md-12">
                       <Link to={"/dashboard"} className='btn btn-success w-100 m-2'>Log In</Link>
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

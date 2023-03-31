import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase-config';

const Protected = (props) => {
    const {Component} = props;
    const navigate = useNavigate();

    useEffect(() => {
       let login = localStorage.getItem(auth);
       if(!login){
        navigate('/admin');
       }
    });
  return (
    <div>
      <Component />
    </div>
  )
}

export default Protected

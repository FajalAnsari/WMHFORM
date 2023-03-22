import React from 'react';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import Dashboard from './Components/Dashboard/Dashboard';
import Home from './Components/Home/Home';
import SignIn from './Components/SignIn/SignIn';


function App() {
  return (
    <>
    <Router>
    <Routes>
      <Route>
        <Route path='/' element={<Home/>}/>
        <Route path='/admin' element={<SignIn/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Route>
    </Routes>
    </Router>
    </>
  );
}

export default App;

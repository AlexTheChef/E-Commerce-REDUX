import React from 'react'
import Home from '../Components/Home';
import Navbar from '../Components/Navbar';

function App({login}) {
  return (
    <>
      <Navbar login={login}/>
      <Home />
    </>
  );
}

export default App;

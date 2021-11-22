import React from 'react';
import { Link } from "react-router-dom";
import '../App.css';

function Error() {
    return (
        <div className="home-container">
            <h1>You got lost my friend</h1>
          <Link to='/'>  <div>Get Back</div> </Link>
        </div>
    );
}

export default Error;
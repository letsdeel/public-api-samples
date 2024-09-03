import React from 'react';
import { Link } from 'react-router-dom';

function Landing() {
  return (    
    <div className='landing'>
      <h1>Create IC fixed-rate contract sample app</h1>
      <p>This app showcases how to create a contract, sign a contract or invite a contractor using Deel's API. </p>
      <ul>
        <li><Link to='/create'>Create a contract</Link></li>
        <li><Link to='/sign'>Sign a contract</Link></li>
        <li><Link to='/invite'>Invite a contractor</Link></li>
      </ul>
    </div>
  );
}

export default Landing;

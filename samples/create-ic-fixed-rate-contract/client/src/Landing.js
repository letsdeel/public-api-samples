import React from 'react';
import { Link } from 'react-router-dom';

function Landing() {
  return (    
    <div className='landing'>
      <h1>Create an Individual Contractor fixed-rate contract</h1>
      <p>This app showcases how to create a fixed-rate contract, sign it, and then invite a contractor to sign it using the Deel API.</p>
      <ul>
        <li><Link to='/create'>Create a contract</Link></li>
        <li><Link to='/sign'>Sign a contract</Link></li>
        <li><Link to='/invite'>Invite a contractor</Link></li>
      </ul>
    </div>
  );
}

export default Landing;

import React from 'react';
import { Routes, Route } from 'react-router-dom';

import CreateContract from './CreateContract';
import Landing from './Landing';
import SignContract from './SignContract';
import InviteContractor from './InviteContractor';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/create' element={<CreateContract />} />
      <Route path='/sign' element={<SignContract />} />
      <Route path='/invite' element={<InviteContractor />} />
    </Routes>
  );
}

export default App;

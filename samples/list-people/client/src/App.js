import React from 'react';
import { Routes, Route } from "react-router-dom";

import PeopleList from './PeopleList';
import PeopleDetails from './PeopleDetails';

function App() {
  return (
    <Routes>
      <Route path="/" element={<PeopleList />} />
      <Route path="/:id" element={<PeopleDetails />} />
    </Routes>
  );
}

export default App;

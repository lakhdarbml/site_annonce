import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Client from './Client'
import Fournisseur from './Fournisseur'
import Validation from './Validation'
import Admin from './Admin'
import Home from './components/Home'
import Signup from './Singup'
function App() {
  return (
    <Router>
      <div>
       
        <Routes>
          
          <Route path="/" element={<Validation />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Client" element={<Client />} />
          <Route path="/fournisseur" element={<Fournisseur />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/Signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


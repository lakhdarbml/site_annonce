import React, { useState } from 'react';
import axios from 'axios';
import { Link  } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Home from './components/Home'
import './validation.css'
import { Alert } from '@mui/material';


function Validation (){
  const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

  // Fonction pour gérer la soumission du formulaire
  

  // ...
  
  
  
  const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
          // Les données que vous souhaitez envoyer
          const formData = {
              email: email,
              password: password,
          };
  
          // Effectuer la requête POST vers le serveur Node.js
          const response = await axios.post('http://localhost:3001/api/login', formData);
  
          // Faire quelque chose avec la réponse du serveur (si nécessaire)
          console.log('Réponse du serveur:', response.data);
  
          if (response.data.success) {
              const user = response.data.user;
  
              // Check user's role and navigate to the appropriate route
              if (user.ROLE === 'admin') {
                  navigate('/admin');
              } else if (user.ROLE === 'vendeur') {
                  navigate('/vendeur');
              } else {
                  navigate('/client');
              }
          } else if(response.data.success == false) {
              // Handle unsuccessful login
              alert('Login failed:', response.data.message);
          }
      } catch (error) {
          console.error('Erreur lors de l\'envoi des données:', error);
      }
  }; 
 



    return (
    <div class="login-container">
        <div class="login-box">
            
            <h2>Bienvenu</h2>
            <form onSubmit={handleSubmit}>
        <label>
          email:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Mot de passe:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Se connecter</button>
      </form>
            <Link class="forgot-password" to="/Signup">Vous n'avez pas de compte </Link>
            
        
        </div>
    </div>

    );
}

export default Validation;
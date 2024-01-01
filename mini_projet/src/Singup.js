import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './validation.css'; // Replace with the actual path to your style file

const Signup = () => {
    const navigate = useNavigate();
    let nomWilayaArray =null
    const [wilaya,setWilaya]=useState(null)
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:3001/api/wilaya');
            setWilaya(response.data);
            
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
         
      }, []);
    
      if(wilaya != null){
        nomWilayaArray = Object.values(wilaya).map((wilaya) => wilaya.nom_wilaya);
      }

      let i = 1;

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    wilaya: '',
    nom: '',
    prenom: '',
    dateNaissance: '',
    genre: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:3001/api/signup', formData);
  
      if (response.data.success) {
        alert('Registration successful!');
        // Redirect or perform other actions upon successful registration
        navigate('/client');
      } else {
        alert('Registration failed:', response.data.message);
      }
    } catch (error) {
      console.error('Error during form submission:', error);
      // Handle the error, show an alert, or perform other actions
    }
  };
  

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Registration</h2>
        <form onSubmit={handleSubmit}>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />

          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />

          <label>Wilaya:</label>
          <select name="wilaya" value={formData.wilaya} onChange={handleChange} required>
          <option value="">Select a wilaya</option>
          {nomWilayaArray && nomWilayaArray.map((nomWilaya) => (
                  <option key={nomWilaya} value={i++}> {nomWilaya} </option>
  ))}
            
          </select>
          <div className='name'>
          <label>Nom:</label>
          <input type="text" name="nom" value={formData.nom} onChange={handleChange} required />

          <label>Prenom:</label>
          <input type="text" name="prenom" value={formData.prenom} onChange={handleChange} required />

          </div>
          
          <label>Date de Naissance:</label>
          <input
            type="date"
            name="dateNaissance"
            value={formData.dateNaissance}
            onChange={handleChange}
            required
          />

          <label>Genre:</label>
          <select name="genre" value={formData.genre} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="1">Male</option>
            <option value="0">Female</option>
          </select>
           <br/>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;

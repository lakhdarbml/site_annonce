import React,{useEffect,useState} from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

const MenuBar = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/categories');

        setData(response.data);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    console.log(data)
  }, []);
  return (
    
    <AppBar position="static" style={{ backgroundColor: 'gray',width:'220px',height:'100vh' ,paddingTop:'100px'}}>
      {console.log(data)}
        <h1 style={{textAlign:'center'}}>Categories</h1>
      <Toolbar style={{ display:'flex',flexDirection:'column',alignContent:'space-between'}}>
       

        {data !== null && data.map(category => (
          <Button key={category.ID_CATEGORIE}  color="inherit" component={Link} to="/menu1" style={{ marginRight: '10px', textDecoration: 'none', color: 'inherit', paddingTop:'14px',paddingBottom:'14px' }}>
          {category.NOM_CATEGORIE}
        </Button>
        ))}
      </Toolbar>
    </AppBar>
  );
};

export default MenuBar;

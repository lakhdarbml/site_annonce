import React,{useState} from 'react';
import { AppBar, Toolbar, Typography, IconButton, InputBase, Button } from '@mui/material';
import { Search as SearchIcon, AccountCircle, ShoppingCart, AddBusiness} from '@mui/icons-material';

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const account = (e)=>{
    e.preventDefault();

    setOpen(!open);

  }
  return (<>
    <AppBar position="fixed" style={{height:'100px',paddingTop:'15px'}}>
      <Toolbar>
        {/* Logo */}
        <Typography variant="h6" sx={{ flexGrow: 1 }} >
          BDF_shop
        </Typography>

        {/* Search Bar */}
        <div style={{ display: 'flex', alignItems: 'center', width:'60%' }}>
          <div style={{ position: 'relative' }}>
            <IconButton size="large" color="inherit">
              <SearchIcon />
            </IconButton>
            <InputBase
              placeholder="Search..."
              inputProps={{ 'aria-label': 'search' }}
              style={{ paddingLeft: '40px' , background:'white',width:'600px',borderRadius:'15px'}}
            />
          </div>
        </div>

        {/* Icons for Account, Settings, and Login */}
        <IconButton size="large" color="inherit" onClick={account}>
          <AccountCircle  />
        </IconButton>
        <IconButton size="large" color="inherit">
          <ShoppingCart />
        </IconButton>
        <IconButton size="large" color="inherit">
          <AddBusiness />
        </IconButton>
      </Toolbar>
    </AppBar>
    { open && (
       <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
                padding: '20px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                borderRadius: '8px',
      }} >
         <Button variant="contained" size="medium">
           Login
        </Button>
        <Button variant="contained" size="medium">
          Sign up
        </Button>
       </div>
      )
    }
      
    
   


     
   </>
  );
};

export default NavBar;

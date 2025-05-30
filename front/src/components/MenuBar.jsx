import React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import authService from '../services/authService';

const MenuBar = () => {
  const isLogged = typeof window !== 'undefined' && localStorage.getItem('token');
  if (!isLogged) return null;

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      authService.logout();
      window.location.href = '/login';
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" onClick={handleLogout}>Déconnexion</Button>
      </Toolbar>
    </AppBar>
  );
};

export default MenuBar;

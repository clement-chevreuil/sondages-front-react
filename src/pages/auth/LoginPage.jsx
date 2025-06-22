import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, Container, Box, Alert, IconButton } from '@mui/material';
import { Eye, EyeOff } from 'lucide-react';
import authService from '../../services/authService';
import { useLocation, useNavigate } from 'react-router-dom';
import { isAdmin } from '../../utils/auth';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirection si déjà connecté
    if (typeof window !== 'undefined' && localStorage.getItem('token')) {
      navigate('/menu');
    }
  }, [navigate]);

  React.useEffect(() => {

    if (location.state?.success) {
      setSuccess(location.state.success);
      // Optionally clear the state after showing the message
      window.history.replaceState({}, document.title);
    }
  }, [location.state, navigate]);

  const validate = () => {
    let valid = true;
    setUsernameError('');
    setPasswordError('');
    if (!username) {
      setUsernameError("Le nom d'utilisateur est requis");
      valid = false;
    }
    if (!password) {
      setPasswordError('Le mot de passe est requis');
      valid = false;
    }
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!validate()) return;
    setLoading(true);
    try {
      // On récupère l'utilisateur et son id lors du login
      const user = await authService.login(username, password);
      setSuccess('Connexion réussie !');
      setUsername('');
      setPassword('');
      // Redirection selon le rôle
      if (isAdmin()) {
        navigate('/add-poll');
      } else {
        navigate('/polls');
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Erreur lors de la connexion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ backgroundColor: '#fff', color: 'black', borderRadius: 2, boxShadow: 3, py: 4, mt: 8 }}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography component="h1" variant="h5" sx={{ color: 'black' }}>
          Connexion
        </Typography>
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
        <Box component="form" mt={2} onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Nom d'utilisateur"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={e => setUsername(e.target.value)}
            disabled={loading}
            error={!!usernameError}
            helperText={usernameError}
            slotProps={{ input: { style: { color: 'black' } } }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Mot de passe"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            disabled={loading}
            error={!!passwordError}
            helperText={passwordError}
            slotProps={{
              input: {
                endAdornment: (
                  <IconButton
                    aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                    onClick={() => setShowPassword((show) => !show)}
                    edge="end"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </IconButton>
                )
              }
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? "Chargement..." : "Se connecter"}
          </Button>
          <Button
            fullWidth
            variant="outlined"
            color="secondary"
            sx={{ mb: 2, }}
            href="/register"
          >
            Créer un compte
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;

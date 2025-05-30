import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, Container, Box, Alert, IconButton } from '@mui/material';
import { Eye, EyeOff } from 'lucide-react';
import authService from '../../services/authService';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Redirection si déjà connecté
    if (typeof window !== 'undefined' && localStorage.getItem('token')) {
      navigate('/menu');
    }
  }, [navigate]);

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
    } else if (password.length < 6) {
      setPasswordError('Le mot de passe doit contenir au moins 6 caractères');
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
      await authService.register(username, password);
      setSuccess('Inscription réussie !');
      setUsername('');
      setPassword('');

      navigate('/login', { state: { success: 'Inscription réussie !' } });
    } catch (err) {
      setError(err?.response?.data?.message || 'Erreur lors de l\'inscription');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ backgroundColor: '#fff', borderRadius: 2, boxShadow: 3, py: 4, mt: 8 }}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography component="h1" variant="h5" sx={{ color: 'black' }}>
          Inscription
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
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Mot de passe"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="new-password"
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
            {loading ? "Chargement..." : "S'inscrire"}
          </Button>
          <Button
            fullWidth
            variant="outlined"
            color="secondary"
            sx={{ mb: 2 }}
            href="/login"
          >
            Vous avez déjà un compte ?
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;

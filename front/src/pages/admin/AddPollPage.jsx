import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, IconButton, Paper, Alert, FormControlLabel, Checkbox } from '@mui/material';
import { PlusCircle, MinusCircle } from 'lucide-react';
import pollService from '../../services/pollService';

const AddPollPage = ({ onPollCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [singleChoice, setSingleChoice] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [optionsError, setOptionsError] = useState('');

  const handleOptionChange = (idx, value) => {
    const newOptions = [...options];
    newOptions[idx] = value;
    setOptions(newOptions);
  };

  const addOption = () => setOptions([...options, '']);
  const removeOption = idx => setOptions(options.filter((_, i) => i !== idx));

  const validate = () => {
    let valid = true;
    setTitleError('');
    setDescriptionError('');
    setOptionsError('');
    if (!title.trim()) {
      setTitleError('Le titre est requis');
      valid = false;
    }
    if (!description.trim()) {
      setDescriptionError('La description est requise');
      valid = false;
    }
    const cleanedOptions = options.map(opt => opt.trim());
    if (cleanedOptions.length < 1) {
      setOptionsError('Au moins une option est requise');
      valid = false;
    } else if (cleanedOptions.some(opt => !opt)) {
      setOptionsError('Aucune option ne doit être vide');
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
      await pollService.createPoll({
        title,
        description,
        singleChoice,
        options: options.filter(opt => opt.trim()).map(opt => ({ text: opt }))
      });
      setTitle('');
      setDescription('');
      setOptions(['', '']);
      setSingleChoice(true);
      setSuccess('Sondage créé avec succès !');
      if (onPollCreated) onPollCreated();
    } catch (err) {
      setError('Erreur lors de la création du sondage.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, mt: 6 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Créer un sondage
          </Typography>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="Titre du sondage"
              value={title}
              onChange={e => setTitle(e.target.value)}
              fullWidth
              required
              margin="normal"
              error={!!titleError}
              helperText={titleError}
            />
            <TextField
              label="Description (optionnelle)"
              value={description}
              onChange={e => setDescription(e.target.value)}
              fullWidth
              multiline
              rows={2}
              margin="normal"
              required
              error={!!descriptionError}
              helperText={descriptionError}
            />
            <FormControlLabel
              control={<Checkbox checked={singleChoice} onChange={e => setSingleChoice(e.target.checked)} />}
              label="Sondage à choix unique"
              sx={{ mt: 2, mb: 2 }}
            />
            <Box mt={2} mb={1}>
              <Typography variant="subtitle1">Options</Typography>
              {options.map((opt, idx) => (
                <Box key={idx} display="flex" alignItems="center" mb={1}>
                  <TextField
                    label={`Option ${idx + 1}`}
                    value={opt}
                    onChange={e => handleOptionChange(idx, e.target.value)}
                    required
                    fullWidth
                    sx={{ mr: 1 }}
                    error={!!optionsError && !opt.trim()}
                  />
                  {options.length > 2 && (
                    <IconButton color="error" onClick={() => removeOption(idx)} aria-label="Supprimer l'option">
                      <MinusCircle size={22} />
                    </IconButton>
                  )}
                </Box>
              ))}
              {optionsError && <Alert severity="error" sx={{ mb: 1 }}>{optionsError}</Alert>}
              <Button
                variant="outlined"
                startIcon={<PlusCircle size={20} />}
                onClick={addOption}
                sx={{ mt: 1 }}
              >
                Ajouter une option
              </Button>
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3 }}
              disabled={loading}
            >
              {loading ? 'Création...' : 'Créer le sondage'}
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default AddPollPage;

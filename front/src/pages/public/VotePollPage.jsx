import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Paper, Button, Radio, RadioGroup, FormControlLabel, CircularProgress, Alert, Checkbox } from '@mui/material';
import pollService from '../../services/pollService';

const VotePollPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [poll, setPoll] = useState(null);
  const [selectedOption, setSelectedOption] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    pollService.getPollById(id)
      .then(data => setPoll(data))
      .catch(() => setError('Erreur lors du chargement du sondage.'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleVote = async () => {
    setError('');
    setSuccess('');
    // Vérification : au moins une option sélectionnée
    if (selectedOption.length === 0) {
      setError('Veuillez sélectionner une option.');
      return;
    }
    // Vérification : une seule option si singleChoice
    if (poll.singleChoice && selectedOption.length > 1) {
      setError('Vous ne pouvez sélectionner qu\'une seule option.');
      return;
    }
    // Vérification : les options sélectionnées existent dans le sondage
    const validOptionIds = poll.options.map(opt => String(opt.id));
    const invalid = selectedOption.some(id => !validOptionIds.includes(String(id)));
    if (invalid) {
      setError('Option sélectionnée invalide.');
      return;
    }
    try {
      await pollService.votePoll(id, { optionIds: selectedOption });
      navigate('/polls', { state: { success: 'Votre vote a été pris en compte !' } });
    } catch (e) {
      setError("Erreur lors de l'envoi du vote.");
    }
  };

  // Widget pour choix unique
  function SingleChoiceOptions({ options, selectedOption, setSelectedOption }) {
    return (
      <RadioGroup
        value={selectedOption[0] || ''}
        onChange={e => setSelectedOption([e.target.value])}
      >
        {options && options.map(opt => (
          <FormControlLabel key={opt.id} value={opt.id} control={<Radio />} label={opt.label} />
        ))}
      </RadioGroup>
    );
  }

  // Widget pour choix multiple
  function MultiChoiceOptions({ options, selectedOption, setSelectedOption }) {
    return (
      <Box>
        {options && options.map(opt => (
          <FormControlLabel
            key={opt.id}
            control={
              <Checkbox
                checked={selectedOption.includes(opt.id)}
                onChange={e => {
                  if (e.target.checked) {
                    setSelectedOption(prev => [...prev, opt.id]);
                  } else {
                    setSelectedOption(prev => prev.filter(id => id !== opt.id));
                  }
                }}
              />
            }
            label={opt.label}
          />
        ))}
      </Box>
    );
  }

  if (loading) return <CircularProgress />;
  if (!poll) return null;

  return (
    <>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, mt: 6 }}>
          <Typography variant="h4" gutterBottom>{poll.title}</Typography>
          <Typography variant="subtitle1" gutterBottom>{poll.description}</Typography>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <Box mt={2} sx={{ minWidth: 300 }}>
            {poll.singleChoice ? (
              <SingleChoiceOptions options={poll.options} selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
            ) : (
              <MultiChoiceOptions options={poll.options} selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
            )}
          </Box>
          <Button variant="contained" color="primary" onClick={handleVote} sx={{ mt: 2 }}>
            Voter
          </Button>
          {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
        </Paper>
      </Container>
    </>
  );
};

export default VotePollPage;

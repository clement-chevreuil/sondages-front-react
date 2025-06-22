import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box, Paper, CircularProgress, Alert, List, ListItem, ListItemText, Button } from '@mui/material';
import pollService from '../../services/pollService';

const PollResultsPage = () => {
  const { id } = useParams();
  const [results, setResults] = useState([]);
  const [poll, setPoll] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    Promise.all([
      pollService.getPollById(id),
      pollService.getPollResults(id)
    ])
      .then(([pollData, resultsData]) => {
        setPoll(pollData);
        setResults(resultsData);
      })
      .catch(() => setError('Erreur lors du chargement des résultats.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!poll) return null;

  return (
    <>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, mt: 6 }}>
          <Typography variant="h4" gutterBottom>Résultats du sondage</Typography>
          <Typography variant="h6" gutterBottom>{poll.title}</Typography>
          <Typography variant="subtitle1" gutterBottom>{poll.description}</Typography>
          <Box mt={2}>
            <List>
              {results.map(opt => (
                <ListItem key={opt.optionId} divider>
                  <ListItemText
                    primary={opt.label}
                    secondary={`Nombre de votes : ${opt.count}`}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
          <Button variant="outlined" color="primary" href="/polls" sx={{ mt: 2 }}>Retour à la liste</Button>
        </Paper>
      </Container>
    </>
  );
};

export default PollResultsPage;

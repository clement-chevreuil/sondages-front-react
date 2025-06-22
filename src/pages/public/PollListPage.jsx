import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Paper, Button, List, ListItem, ListItemText, CircularProgress, Alert } from '@mui/material';
import pollService from '../../services/pollService';
import { useLocation } from 'react-router-dom';

const PollListPage = () => {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const location = useLocation();
  const [success, setSuccess] = useState(location.state?.success || '');

  useEffect(() => {
    pollService.getPolls()
      .then(data => setPolls(data))
      .catch(() => setError('Erreur lors du chargement des sondages.'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (location.state?.success) {
      setSuccess(location.state.success);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  return (
    <>
      <Container maxWidth="md">
        <Box mt={6}>
          <Typography variant="h4" gutterBottom>Liste des sondages</Typography>
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
          {loading && <CircularProgress />}
          {error && <Typography color="error">{error}</Typography>}
          {!loading && !error && (
            <Paper elevation={2} sx={{ p: 2 }}>
              <List>
                {polls.length === 0 && <Typography>Aucun sondage disponible.</Typography>}
                {polls.map((poll) => (
                  <ListItem key={poll.id} divider>
                    <ListItemText
                      primary={
                        poll.title.length > 100
                          ? poll.title.slice(0, 100) + '…'
                          : poll.title
                      }
                    />
                    <Button
                      variant="outlined"
                      color="primary"
                      href={`/polls/${poll.id}/vote`}
                      sx={{ ml: 2 }}
                      disabled={poll.alreadyVoted}
                    >
                      {poll.alreadyVoted ? 'Déjà voté' : 'Voter'}
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      href={`/polls/${poll.id}/results`}
                      sx={{ ml: 2 }}
                    >
                      Voir les résultats
                    </Button>
                  </ListItem>
                ))}
              </List>
            </Paper>
          )}
        </Box>
      </Container>
    </>
  );
};

export default PollListPage;

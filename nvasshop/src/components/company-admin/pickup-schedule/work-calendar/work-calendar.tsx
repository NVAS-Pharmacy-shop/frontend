
import React from 'react';
import { Container, Typography, Paper, Grid, Button } from '@mui/material';

const WorkCalendar = () => {

  const predefinedTerms = [
    // Popunite ovaj niz sa stvarnim podacima
    { id: 1, start_time: '08:00', end_time: '12:00', date: '2023-12-31' },
    // ...
  ];

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Radni Kalendar
      </Typography>
      <Grid container spacing={3}>
        {predefinedTerms.map((term) => (
          <Grid item key={term.id} xs={12} sm={6} md={4}>
            <Paper>
              <Typography variant="h6">{term.date}</Typography>
              <Typography>Start Time: {term.start_time}</Typography>
              <Typography>End Time: {term.end_time}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
      {/* Dodajte dugme za dodavanje ili uređivanje termina (u zavisnosti od vaših potreba) */}
      <Button variant="contained" color="primary">
        Dodaj Termin
      </Button>
    </Container>
  );
};

export default WorkCalendar;

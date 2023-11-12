import React, {Component, useState, useEffect} from "react";
import axios from 'axios';
import { Link, useParams } from "react-router-dom";
import {  TextField, Button, Typography, Container, Grid, ThemeProvider, CssBaseline, Box, Toolbar, AppBar, IconButton, Badge, Drawer, Divider, List, Paper, createTheme, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, FormControlLabel, Checkbox, Avatar } from '@mui/material';
import { Copyright } from "@mui/icons-material";

interface Admin {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
}
const defaultTheme = createTheme();

export default function EditCompanyAdminProfile(){
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk5ODY5NTg0LCJpYXQiOjE2OTk3ODMxODQsImp0aSI6ImY4ZTU2OGEyNmM2ZDRjMzQ4YmFjNmZiMjE1NjM3YjA5IiwidXNlcl9pZCI6MiwiZW1haWwiOiJ1c2VyMUB0ZXN0LmNvbSIsInJvbGUiOiJjb21wYW55X2FkbWluIn0.ZvOyiRlZEQdJEaon96sD_aZdO9pmCsINt6wAiqtk7Qo';
    const [admin, setAdmin] = useState(
        {
            username: '',
            email: '',
            first_name: '',
            last_name: ''
        }
    );
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/user/admins/`,{
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        })
          .then(response => {
            setAdmin(response.data.user);
          })
          .catch(error => {
              console.error('Error fetching admins', error);
        });
    }, [])
    
    const handleSaveClick = () => {
        axios.put(`http://127.0.0.1:8000/api/user/admins/`, admin, {
                headers: {
                    'Authorization' : `Bearer ${token}`
                }
            })
            .then(response => {
                console.log('Profile updated successfully', response.data);
            })
            .catch(error => {
                console.error('Error updating user profile', error);
        });
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Edit profile
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="firstName"
                                    required
                                    fullWidth
                                    label="First Name"
                                    value={admin?.first_name || ''} 
                                    onChange={e => setAdmin({...admin, first_name: e.target.value})}
                                    autoComplete="given-name"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    value={admin?.last_name || ''} 
                                    onChange={e => setAdmin({...admin, last_name: e.target.value})}
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    value={admin?.email || ''} 
                                    onChange={e => setAdmin({...admin, email: e.target.value})}
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="username"
                                    label="Username"
                                    type="text"
                                    id="username"
                                    value={admin?.username || ''} 
                                    onChange={e => setAdmin({...admin, username: e.target.value})}
                                    autoComplete="username"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            onClick={handleSaveClick}
                            sx={{ mt: 3, mb: 2 }}>
                            Save changes
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )


}

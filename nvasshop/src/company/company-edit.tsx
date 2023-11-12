import React, {Component, useState, useEffect} from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import {  TextField, Button, Typography, Container, Grid, ThemeProvider, CssBaseline, Box, Toolbar, AppBar, IconButton, Badge, Drawer, Divider, List, Paper, createTheme, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import NotificationsIcon, { Copyright } from '@mui/icons-material'
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import EditIcon from '@mui/icons-material/Edit';
import './company-edit.css';


interface Company {
    name: string;
    address: string;
    description: string;
    email: string;
    website: string;
    rate: number;
    equipment: Equipment[];
}
interface Equipment {
    name: string;
    description: string;
    quantity: number;
}
interface Admin {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

function CompanyUpdate(){
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk5ODc5ODUwLCJpYXQiOjE2OTk3OTM0NTAsImp0aSI6IjJiYzQxNzg5Y2RjNzQ0MDhhN2Y1ZmZkYTQ4NWZiYjI3IiwidXNlcl9pZCI6MiwiZW1haWwiOiJ1c2VyMUB0ZXN0LmNvbSIsInJvbGUiOiJjb21wYW55X2FkbWluIn0.CIvw2TmV0YTObWQmMw8FdcvV-KaSmP8v03PLnhW_MnI'
    const {id} = useParams();
    const [company, setCompany] = useState<Company | null>(null);
    const [admins, setAdmins] = useState<Admin[]>([]);
    const [editMode, setEditMode] = useState(false);
    const [editedCompany, setEditedCompany] = useState<Company>();

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/user/admins/${id}`,{
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        })
          .then(response => {
              setAdmins(response.data.user);
          })
          .catch(error => {
              console.error('Error fetching admins', error);
        });
        axios.get(`http://127.0.0.1:8000/api/company/${id}`,{
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        })
          .then(response => {
              setCompany(response.data.company);
              setEditedCompany(response.data.company);
          })
          .catch(error => {
              console.error('Error fetching company', error);
        });
        
    }, [id]);

    const handleEditClick = () => {
      setEditMode(!editMode);
    }

    const handleSaveClick = () => {
      console.log(editedCompany);
      axios.put(`http://127.0.0.1:8000/api/company/${id}`, editedCompany, {
          headers: {
              'Authorization' : `Bearer ${token}`
          }
      })
        .then(response => {
            setCompany(response.data.company);
            setEditedCompany(response.data.company);
            console.log(editedCompany);
            setEditMode(false);
        })
        .catch(error => {
            console.error('Error updating company', error);
        });
    }
    
    
    const handleInputChange = (field: keyof Company, value: string) => {
      setEditedCompany((prevCompany) => ({
        ...prevCompany!,
        [field]: value,
      }));
    };

    const defaultTheme = createTheme();
    return (
      <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{
                marginRight: '36px',
                ...({ display: 'none' }),
              }}
            >
            <AccessTimeFilledIcon/>
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}>
                  <div>
                    <EditIcon onClick={handleEditClick}></EditIcon>
                    {editMode ? (
                      <TextField
                        fullWidth
                        label="Company Name"
                        name="companyName"
                        value={editedCompany?.name || ""}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        required
                        sx={{ marginTop: 2 }}
                      />
                    ) : (
                      <h1>{editedCompany?.name || ""}</h1>
                    )}
                    {editMode ? (
                      <TextField
                        multiline
                        fullWidth
                        label="Description"
                        name="description"
                        value={editedCompany?.description || ""}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        required
                        sx={{ marginTop: 2 }}
                      />
                    ) : (
                      <p>{editedCompany?.description || ""}</p>
                    )}
                    
                  </div>

                </Paper>
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <h2>Company Address</h2>
                  {editMode ? (
                      <TextField
                        multiline
                        fullWidth
                        label="Address"
                        name="address"
                        value={editedCompany?.address || ""}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        required
                      />
                    ) : (
                      <p>{editedCompany?.address || ""}</p>
                    )}
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12} md={5} lg={6}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column'}}>
                <h2>Equipment</h2>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 200, maxWidth: 500 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell align="right">Description</TableCell>
                          <TableCell align="right">Quantity</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {editedCompany?.equipment.map((row) => (
                          <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">
                              {row.name}
                            </TableCell>
                            <TableCell align="right">{row.description}</TableCell>
                            <TableCell align="right">{row.quantity}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={6}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                    <h2>Company admins</h2>
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 200 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell align="right">FirstName</TableCell>
                            <TableCell align="right">Lastname</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell>Username</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {admins.map((row) => (
                            <TableRow
                              key={row.first_name}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                              <TableCell component="th" scope="row">
                                {row.last_name}
                              </TableCell>
                              <TableCell align="right">{row.email}</TableCell>
                              <TableCell align="right">{row.username}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                </Paper>
              </Grid>

                       
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
          {editMode && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: 4, // Add bottom margin
              }}
            >
              <Button
                className = "saveChangesBtn"
                type="button"
                variant="contained"
                color="primary"
                onClick={handleSaveClick}
              >
                Save
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </ThemeProvider>
    )
}


export default CompanyUpdate;
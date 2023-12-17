import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Container,
  Grid,
  ThemeProvider,
  CssBaseline,
  Box,
  Toolbar,
  AppBar,
  IconButton,
  Badge,
  Drawer,
  Divider,
  List,
  Paper,
  createTheme,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import NotificationsIcon, { Copyright } from "@mui/icons-material";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import "./company-edit.css";
import api from "../api";
import EquipmentAdmin from "../components/company-admin/company-overview/equipment-overview";

interface Admin {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

function CompanyUpdate() {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAyOTIxNjkzLCJpYXQiOjE3MDI4MzUyOTMsImp0aSI6IjAyNzM3YTg4MzE1ZjRiODM4YzFmZGRmY2MxMmM5Yjg4IiwidXNlcl9pZCI6NCwiZW1haWwiOiJhbGVrc2FuZGFyLm1hcmlua292aWM2MzY2QGdtYWlsLmNvbSIsInJvbGUiOiJjb21wYW55X2FkbWluIn0.L-P2ODovhY8oT84JAGioDdaKUEYyfLngxdqWGaIUdmU";
  const { id } = useParams();
  const [company, setCompany] = useState({
    name: "",
    address: "",
    description: "",
    email: "",
    website: "",
    rate: 0,
    equipment: [
      {
        name: "",
        description: "",
        quantity: -1,
      },
    ],
  });
  const [editedCompany, setEditedCompany] = useState({
    name: "",
    address: "",
    description: "",
    email: "",
    website: "",
    rate: 0,
    equipment: [
      {
        name: "",
        description: "",
        quantity: -1,
      },
    ],
  });
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    api
      .get(`http://127.0.0.1:8000/api/user/admins/${id}`)
      .then((response) => {
        setAdmins(response.data.user);
      })
      .catch((error) => {
        console.error("Error fetching admins", error);
      });
    api
      .get(`http://127.0.0.1:8000/api/company/${id}`)
      .then((response) => {
        setCompany(response.data.company);
        setEditedCompany(response.data.company);
      })
      .catch((error) => {
        console.error("Error fetching company", error);
      });
  }, [id]);

  const handleEditClick = () => {
    setEditedCompany(company);
    setEditMode(!editMode);
  };

  useEffect(() => {
    if (!editMode) {
      setCompany(editedCompany);
    }
  }, [editMode, editedCompany]);

  const handleSaveClick = () => {
    api
      .put(`http://127.0.0.1:8000/api/company/${id}`, editedCompany)
      .then((response) => {
        const updatedCompany = response.data;
        setEditedCompany(updatedCompany);
        setCompany(updatedCompany);
      })
      .catch((error) => {
        console.error("Error updating company", error);
      });
    setEditMode(false);
  };

  const defaultTheme = createTheme();
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{
                marginRight: "36px",
                ...{ display: "none" },
              }}
            >
              <AccessTimeFilledIcon />
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
              <Badge badgeContent={4} color="secondary"></Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
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
                    display: "flex",
                    flexDirection: "column",
                    height: 300,
                  }}
                >
                  <div className="companyinfo">
                    <div className="icons-container">
                      {editMode ? (
                        <CloseIcon
                          onClick={handleEditClick}
                          className="icon close-icon"
                        ></CloseIcon>
                      ) : (
                        <EditIcon
                          onClick={handleEditClick}
                          className="icon edit-icon"
                        ></EditIcon>
                      )}
                    </div>

                    {editMode ? (
                      <TextField
                        fullWidth
                        label="Company Name"
                        name="companyName"
                        value={editedCompany?.name || ""}
                        onChange={(e) =>
                          setEditedCompany({
                            ...editedCompany,
                            name: e.target.value,
                          })
                        }
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
                        onChange={(e) =>
                          setEditedCompany({
                            ...editedCompany,
                            description: e.target.value,
                          })
                        }
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
                    display: "flex",
                    flexDirection: "column",
                    height: 300,
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
                      onChange={(e) =>
                        setEditedCompany({
                          ...editedCompany,
                          address: e.target.value,
                        })
                      }
                      required
                    />
                  ) : (
                    <p>{editedCompany?.address || ""}</p>
                  )}
                  <h2>Rate</h2>
                  <p>{editedCompany?.rate || ""}</p>
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12} md={5} lg={6}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <h2>Equipment</h2>
                  <EquipmentAdmin companyId={Number(id)}></EquipmentAdmin>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={6}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
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
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
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
                display: "flex",
                justifyContent: "center",
                marginBottom: 4, // Add bottom margin
              }}
            >
              <Button
                className="saveChangesBtn"
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
  );
}

export default CompanyUpdate;

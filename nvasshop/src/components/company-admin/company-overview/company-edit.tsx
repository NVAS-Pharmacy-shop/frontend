import React, { Component, useState, useEffect, SyntheticEvent } from "react";
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
  Tabs,
  Tab
} from "@mui/material";
import { Copyright, Margin } from "@mui/icons-material";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import "./company-edit.css";
import api from "../../../api";
import EquipmentAdmin from "./equipment-overview";
import { getSchedules } from "../../../service/https/pickup-schedule-service";
import { PickupSchedule } from "../../../model/company";

interface Admin {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function CompanyUpdate() {
  const { id } = useParams();
  const [value, setValue] = useState(0);
  const [company, setCompany] = useState({
    id: -1,
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
    id: -1,
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
  const [schedules, setSchedules] = useState<PickupSchedule[]>([]);

  
  const handleTabChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };


  useEffect(() => {
    api
      .get(`http://127.0.0.1:8000/api/user/admins/companies/`)
      .then((response) => {
        setAdmins(response.data.user);
      })
      .catch((error) => {
        console.error("Error fetching admins", error);
      });
    api
      .get(`http://127.0.0.1:8000/api/company/admin/`)
      .then((response) => {
        console.log(response.data);
        setCompany(response.data.company);
        setEditedCompany(response.data.company);
      })
      .catch((error) => {
        console.error("Error fetching company", error);
      });
  },[]);

  const handleEditClick = () => {
    setEditedCompany(company);
    setEditMode(!editMode);
  };

  const fetchSchedules = async () => {
    try {
      const schedules = await getSchedules();
      setSchedules(schedules);
    } catch (error) {
      console.log('Error fetching equipment data.', error);
    }
  };
  
  useEffect(() => {
    if (!editMode) {
      setCompany(editedCompany);
    }
    fetchSchedules();
  }, [editMode, editedCompany]);

  const handleSaveClick = () => {
    api
      .put(`http://127.0.0.1:8000/api/company/${company.id}/`, editedCompany)
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
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
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
              <Grid item xs={12} md={7} lg={6.5}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                    <Box sx={{ width: '100%' }}>
                      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleTabChange} aria-label="basic tabs example">
                          <Tab label="Equipment" {...a11yProps(0)}/>
                          <Tab label="Pickup Schedules" {...a11yProps(1)}/>
                        </Tabs>
                      </Box>
                      <CustomTabPanel value={value} index={0}>
                        <div>
                          <EquipmentAdmin companyId={Number(id)}></EquipmentAdmin>
                        </div>
                      </CustomTabPanel>
                      <CustomTabPanel value={value} index={1}>
                        <div>
                          <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                              <TableHead>
                                <TableRow>
                                  <TableCell align="right">Date</TableCell>
                                  <TableCell align="right">Start Time</TableCell>
                                  <TableCell align="right">Duration(min.)</TableCell>
                                  <TableCell align="right">Person in charge</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {schedules.map((row) => (
                                  <TableRow
                                    key={row.date}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                  >
                                    <TableCell component="th" scope="row" align="right">
                                      {row.date}
                                    </TableCell>
                                    <TableCell align="right">{row.start_time}</TableCell>
                                    <TableCell align="right">{row.end_time}</TableCell>
                                    <TableCell align="right">{row.company_admin.first_name} {row.company_admin.last_name}</TableCell>
                                    <TableCell align="right">
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </div>            
                      </CustomTabPanel>
                    </Box>
                </Paper>
              </Grid>
              <Grid item xs={12} md={5} lg={5.5}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                  }}>
                  <h2>Company admins</h2>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 200 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="right">FirstName</TableCell>
                          <TableCell align="right">Lastname</TableCell>
                          <TableCell align="right">Email</TableCell>
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
                          <TableCell align="right">{row.first_name}</TableCell>
                            <TableCell component="th" scope="row">{row.last_name}</TableCell>
                            <TableCell align="right">{row.email}</TableCell>
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

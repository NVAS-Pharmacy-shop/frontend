import React, {
  Component,
  useState,
  useEffect,
  SyntheticEvent,
  useContext,
} from "react";
import { useParams } from "react-router-dom";
import "./company-overview.css";
import api from "../api";
import { Equipment, PickupSchedule } from "../model/company";
import {
  Box,
  Button,
  Grid,
  Slider,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  DateTimePicker,
  LocalizationProvider,
  renderTimeViewClock,
} from "@mui/x-date-pickers";
import AuthContext from "../context/AuthContext";
import { Dropdown } from "react-bootstrap";

interface Company {
  id: number;
  name: string;
  address: string;
  description: string;
  email: string;
  website: string;
  rate: number;
  equipment: Equipment[];
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
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function Company() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [company, setCompany] = useState<Company | null>(null);
  const [reservedItems, setReservedItems] = useState<Equipment[]>([]);
  const [selectedQuantities, setSelectedQuantities] = useState<number[]>([]);
  const [reserveCount, setReserveCount] = useState<number>(0);
  const [date, setDate] = useState<Date | null>(null);
  const [schedules, setSchedules] = useState<PickupSchedule[]>([]);
  const [value, setValue] = useState(0);
  const [isManual, setIsManual] = useState<boolean>(false);
  const [selectedPickupSchedule, setSelectedPickupSchedule] =
    useState<number>(-1);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const handleTabChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const reserve = () => {
    {
      let equipments = reservedItems.map((equipmentItem, index) => {
        return {
          equipment_id: equipmentItem.id,
          quantity: selectedQuantities[index],
        };
      });

      let reserveItem = {};
      if (isManual) {
        reserveItem = {
          company_id: company!.id,
          equipments: equipments,
          date: date,
        };
      } else {
        reserveItem = {
          company_id: company!.id,
          equipments: equipments,
          pickup_schedule_id: selectedPickupSchedule,
        };
      }
      api
        .post(`/company/reserve/`, reserveItem)
        .then((response) => {
        })
        .then(() => {
          setReservedItems([]);
          setSelectedQuantities([]);
          setReserveCount(reserveCount + 1);
        });
    }
  };

  useEffect(() => {
    api
      .get(`/company/${id}`)
      .then((response) => {
        setCompany(response.data.company);
        setSchedules(response.data.company.filtered_pickup_schedules);
      })
      .catch((error) => {
        console.error("Error fetching company", error);
      });
  }, [id, reserveCount]);

  if (!company) {
    return <div>Loading...</div>;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        <div className="company-info">
          <h2>Company Information</h2>
          <p>
            <strong>Name:</strong> {company.name}
          </p>
          <p>
            <strong>Address:</strong> {company.address}
          </p>
          <p>
            <strong>Description:</strong> {company.description}
          </p>

          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleTabChange}
                aria-label="basic tabs example"
              >
                <Tab label="Equipment" {...a11yProps(0)} />
                <Tab label="Pickup Schedules" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <div>
                <h3>Choose equipment</h3>
                <table className="equipment-table">
                  <thead>
                    <tr className="equipment-header">
                      <th>Name</th>
                      <th>Description</th>
                      <th>Quantity</th>
                      <th>Reseve</th>
                    </tr>
                  </thead>
                  <tbody>
                    {company.equipment.map((equipmentItem, index) => (
                      <tr key={index} className="equipment-item">
                        <td>{equipmentItem.name}</td>
                        <td>{equipmentItem.description}</td>
                        <td>{equipmentItem.quantity}</td>
                        <td>
                          {!reservedItems.includes(equipmentItem) ? (
                            <button
                              className="btn btn-primary"
                              onClick={() => {
                                setReservedItems([
                                  ...reservedItems,
                                  equipmentItem,
                                ]);
                                setSelectedQuantities([
                                  ...selectedQuantities,
                                  1,
                                ]);
                              }}
                            >
                              Add
                            </button>
                          ) : (
                            <> </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CustomTabPanel>
            {/* <CustomTabPanel value={value} index={1}>
              <div>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="right">Date</TableCell>
                        <TableCell align="right">Start Time</TableCell>
                        <TableCell align="right">Duration(min.)</TableCell>
                        <TableCell align="right">Person in charge</TableCell>
                        <TableCell align="right">Reserve</TableCell>
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
                          <TableCell align="right">{row.duration_minutes}</TableCell>
                          <TableCell align="right">{row.company_admin.first_name} {row.company_admin.last_name}</TableCell>
                          <TableCell align="right">
                            <Button 
                            variant="contained"
                            >Reserve</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>            
            </CustomTabPanel> */}
          </Box>
          <div className="average-rating">
            <p>
              <strong>Average Rating:</strong> {company.rate}
            </p>
          </div>
        </div>
        <Grid container direction="column" justifyContent="center">
          <Grid item sx={{ margin: "20px" }}>
            <h3>Reserved Equipment</h3>
          </Grid>
          <Grid item sx={{ margin: "20px" }}>
            <table className="equipment-table">
              <thead>
                <tr className="equipment-header">
                  <th>Name</th>
                  <th>Description</th>
                  <th>Quantity</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {reservedItems.map((equipmentItem, index) => (
                  <tr key={index} className="equipment-item">
                    <td>{equipmentItem.name}</td>
                    <td>{equipmentItem.description}</td>
                    <td>
                      <Slider
                        defaultValue={1}
                        onChange={(event, value) => {
                          const newSelectedQuantities = [...selectedQuantities];
                          newSelectedQuantities[index] = value as number;
                          setSelectedQuantities(newSelectedQuantities);
                        }}
                        aria-labelledby="discrete-slider"
                        valueLabelDisplay="auto"
                        step={1}
                        marks
                        min={0}
                        max={equipmentItem.quantity}
                      />
                    </td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          const newReservedItems = [...reservedItems];
                          newReservedItems.splice(index, 1);
                          setReservedItems(newReservedItems);
                          const newSelectedQuantities = [...selectedQuantities];
                          newSelectedQuantities.splice(index, 1);
                          setSelectedQuantities(newSelectedQuantities);
                        }}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Grid container direction="column" alignItems={"start"}>
              <Grid container direction="row" alignItems={"center"}>
                <>
                  {isManual && (
                    <DateTimePicker
                      sx={{ width: "300px", margin: "10px" }}
                      label="With Time Clock"
                      value={date}
                      onChange={(newValue) => {
                        setDate(newValue);
                        setIsSelected(true);
                      }}
                      viewRenderers={{
                        hours: renderTimeViewClock,
                        minutes: renderTimeViewClock,
                        seconds: renderTimeViewClock,
                      }}
                    />
                  )}
                </>
                {!isManual && (
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      Select Date
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      {schedules.map((row) => (
                        <Dropdown.Item
                          key={row.date}
                          onClick={() => {
                            setSelectedPickupSchedule(row.id);
                            setIsSelected(true);
                          }}
                        >
                          {row.date}
                          {" | "} {row.start_time.slice(0, 8)}
                          {" | "}
                          {row.end_time}
                          {" | "} {row.company_admin.first_name}
                          {" | "}
                          {row.company_admin.last_name}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                )}
                <Button
                  onClick={() => setIsManual(!isManual)}
                  variant="contained"
                >
                  {isManual ? "Select from calendar" : "Select manually"}
                </Button>
              </Grid>
              <Button
                sx={{ width: "100px", margin: "10px" }}
                variant="contained"
                onClick={reserve}
                disabled={!isSelected}
              >
                Reserve
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </LocalizationProvider>
  );
}
export default Company;

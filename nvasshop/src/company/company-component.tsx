import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./company-overview.css";
import api from "../api";
import { Equipment } from "../model/company";
import { Button, Grid, Slider } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  DateTimePicker,
  LocalizationProvider,
  renderTimeViewClock,
} from "@mui/x-date-pickers";

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
// interface Equipment {
//   name: string;
//   description: string;
//   quantity: number;
// }

function Company() {
  const { id } = useParams();
  const [company, setCompany] = useState<Company | null>(null);
  const [reservedItems, setReservedItems] = useState<Equipment[]>([]);
  const [selectedQuantities, setSelectedQuantities] = useState<number[]>([]);
  const [reserveCount, setReserveCount] = useState<number>(0);
  const [date, setDate] = useState<Date | null>(null);

  useEffect(() => {
    api
      .get(`/company/${id}`)
      .then((response) => {
        setCompany(response.data.company);
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
          <h3>Equipment List</h3>
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
                          setReservedItems([...reservedItems, equipmentItem]);
                          setSelectedQuantities([...selectedQuantities, 1]);
                        }}
                      >
                        Reserve
                      </button>
                    ) : (
                      <> </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

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
              <DateTimePicker
                sx={{ width: "300px", margin: "10px" }}
                label="With Time Clock"
                value={date}
                viewRenderers={{
                  hours: renderTimeViewClock,
                  minutes: renderTimeViewClock,
                  seconds: renderTimeViewClock,
                }}
              />
              <Button
                sx={{ width: "100px", margin: "10px" }}
                variant="contained"
                onClick={() => {
                  let equipments = reservedItems.map((equipmentItem, index) => {
                    return {
                      equipment_id: equipmentItem.id,
                      quantity: selectedQuantities[index],
                    };
                  });
                  let reserveItem = {
                    company_id: company.id,
                    equipments: equipments,
                    date: date,
                  };

                  api
                    .post(`/company/reserve/`, reserveItem)
                    .then((response) => {
                      console.log(response);
                    })
                    .then(() => {
                      setReservedItems([]);
                      setSelectedQuantities([]);
                      setReserveCount(reserveCount + 1);
                    });
                }}
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

import React, { useEffect, useState } from "react";
import { Container, Typography, Paper, Button } from "@mui/material";
import "react-calendar/dist/Calendar.css";
import { PickupSchedule } from "../../../../model/company";
import { getSchedules } from "../../../../service/https/pickup-schedule-service";
import { Calendar } from "react-calendar";
import "./work-calendar.css";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const WorkCalendar = () => {
  const [schedules, setSchedules] = useState<PickupSchedule[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigate = useNavigate();

  const fetchSchedules = async () => {
    try {
      const schedules = await getSchedules();
      setSchedules(schedules);
    } catch (error) {
      console.error("Error fetching equipment data.", error);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  const calculateEndTime = (time: string, duration: string): string => {
    const dateTime = dayjs(`2000-01-01 ${time}`);
    // const endTime = dateTime.add(duration);
    let hh = duration.split(":")[0];
    let mm = duration.split(":")[1];
    let ss = duration.split(":")[2];
    const endTime = dateTime
      .add(parseInt(hh), "hour")
      .add(parseInt(mm), "minute")
      .add(parseInt(ss), "second");
    const timeOnly = endTime.format("HH:mm:ss");
    return timeOnly;
  };

  const navigateAddSchedule = () => {
    navigate("/add-pickup-schedule/");
  };

  const tileDisabled = ({ date, view }: { date: Date; view: string }) => {
    const today = new Date();
    today.setDate(today.getDate() - 1);
    return date < today;
};
  return (
    <Container className="container">
      <Typography variant="h4" gutterBottom>
        Work Calendar
      </Typography>
      <Paper className="work-calendar-paper" variant="elevation">
        <Calendar
          className="work-calendar"
          value={selectedDate}
          tileDisabled={tileDisabled}
          tileContent={({ date }) => {
            const dateSchedules = schedules.filter((term) => {
              if (term.date !== undefined && term.date !== null) {
                return (
                  new Date(term.date).toDateString() === date.toDateString()
                );
              }
              return false;
            });
            return dateSchedules.map((term) => (
              <div key={term.id}>
                <Typography variant="body2">
                  {term.start_time.slice(0, 8)} - {term.end_time}
                </Typography>
                <Typography variant="body2">
                  {term.company_admin.first_name} {term.company_admin.last_name}
                </Typography>
              </div>
            ));
          }}
        />
      </Paper>
      <Button
        variant="contained"
        color="primary"
        className="add-schedule-btn"
        onClick={navigateAddSchedule}
      >
        Add Schedule
      </Button>
    </Container>
  );
};

export default WorkCalendar;

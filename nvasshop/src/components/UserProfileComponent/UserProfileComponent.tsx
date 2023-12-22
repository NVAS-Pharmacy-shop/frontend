import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { Button, Grid, TextField } from "@mui/material";
import exp from "constants";
import "./UserProfileComponent.css";
import { User, getUser } from "../../service/https/user-service";
import api from "../../api";

const UserProfileComponent = () => {
  const { user } = useContext(AuthContext);
  const [userData, setUser] = useState<User | null>(null);
  const [first_name, setFirstName] = useState<string>("");
  const [last_name, setLastName] = useState<string>("");

  useEffect(() => {
    if (user) {
      api
        .get(`/user/${user.user_id}`)
        .then((response) => {
          setFirstName(response.data.user.first_name);
          setLastName(response.data.user.last_name);
          setUser(response.data.user);
        })
        .catch((error) => {
          console.error("Error fetching user", error);
        });
    }
  }, [user]);

  const updateUser = () => {
    const userDataNew = {
      first_name: first_name,
      last_name: last_name,
    };
    api
      .put(`/user/${user?.user_id}/`, userDataNew)
      .then((response) => {
        setUser(response.data.user);
      })
      .catch((error) => {
        console.error("Error fetching user", error);
      });
  };

  if (userData === null) {
    return (
      <Grid className="card">
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <h1>User Profile</h1>
          <TextField variant="outlined" disabled value="Loading..."></TextField>
          <TextField variant="outlined" disabled value="Loading..."></TextField>
          <TextField variant="outlined" disabled value="Loading..."></TextField>
          <TextField variant="outlined" disabled value="Loading..."></TextField>
        </Grid>
      </Grid>
    );
  }
  return (
    <Grid className="card">
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <h1>User Profile</h1>
        <TextField
          sx={{ width: "300px", marginBottom: "10px" }}
          variant="outlined"
          disabled
          value={userData!.email}
        ></TextField>
        <TextField
          sx={{ width: "300px", marginBottom: "10px" }}
          variant="outlined"
          value={first_name}
          onChange={(event) => {
            setFirstName(event.target.value);
          }}
        ></TextField>
        <TextField
          sx={{ width: "300px", marginBottom: "10px" }}
          variant="outlined"
          value={last_name}
          onChange={(event) => {
            setLastName(event.target.value);
          }}
        ></TextField>
        <TextField
          sx={{ width: "300px", marginBottom: "10px" }}
          variant="outlined"
          disabled
          value={userData!.role}
        ></TextField>
        <Button variant="contained" color="primary" onClick={updateUser}>
          Update
        </Button>

        <h1>Penalty points : {userData!.penal_amount}</h1>
      </Grid>
    </Grid>
  );
};

export default UserProfileComponent;

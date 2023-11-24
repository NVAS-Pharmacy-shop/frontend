import { useNavigate } from "react-router-dom";
import { Company } from "../model/company";
import { Grid, Typography, Rating } from "@mui/material";

const CompanyCardComponent = (props: Company) => {
  const { name, address, description, email, website, rate } = props;

  const navigate = useNavigate();

  return (
    <Grid
      sx={{
        width: "300px",
        height: "300px",
        margin: "10px",
        alignItems: "center",
        borderRadius: 5,
        "&:hover": {
          boxShadow: 8,
        },
        boxShadow: 2,
      }}
      onClick={() => {
        navigate(`/company/${props.id}`);
      }}
    >
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="center"
        sx={{ height: "100%" }}
      >
        <Grid item sx={{ textAlign: "center" }}>
          <Typography variant="h6">{name}</Typography>
          <Typography variant="body1">{address}</Typography>
          <Typography variant="body1">{description}</Typography>
          <Typography variant="body1">{email}</Typography>
          <Typography variant="body1">{website}</Typography>
          <Grid item sx={{ margin: "10px" }}>
            <Typography variant="body1">Rating: {rate}</Typography>
            <Rating
              precision={0.1}
              defaultValue={parseFloat(rate.toString())}
              readOnly
            ></Rating>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CompanyCardComponent;

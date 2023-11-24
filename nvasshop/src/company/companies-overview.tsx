import { useEffect, useState } from "react";
import { useAllCompanies } from "../hooks/CompanyHook";
import { Company } from "../model/company";
import useDebounce from "../hooks/UseDebounce";
import { Grid, TextField } from "@mui/material";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import CompanyCardComponent from "../company/company-card-component";
import React from "react";

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const NumericFormatCustom = React.forwardRef<NumericFormatProps, CustomProps>(
  function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        valueIsNumericString
        allowNegative={false}
        isAllowed={(values) => {
          const { floatValue } = values;
          return floatValue === undefined || floatValue <= 5;
        }}
      />
    );
  }
);

const CompaniesOverview = () => {
  const [name, setName] = useState<string>("");
  const nameDebounced = useDebounce(name, 800);
  const [rating, setRating] = useState<string>("");
  const { data } = useAllCompanies(nameDebounced, rating);

  if (!data) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <Grid>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item sx={{ margin: "20px" }}>
          <TextField
            id="outlined-basic"
            label="Company name"
            variant="outlined"
            onChange={(event) => setName(event.target.value)}
            sx={{ width: "300px" }}
          />
        </Grid>
        <Grid item sx={{ margin: "20px" }}>
          <TextField
            label="Rating"
            value={rating}
            onChange={(event) => setRating(event.target.value)}
            name="numberformat"
            id="formatted-numberformat-input"
            InputProps={{
              inputComponent: NumericFormatCustom as any,
            }}
            variant="outlined"
            sx={{ width: "300px" }}
          />
        </Grid>
      </Grid>
      <Grid item>
        <Grid container direction="row" justifyContent="center">
          {data.map((company: Company) => (
            <Grid item key={company.id}>
              <CompanyCardComponent {...company} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CompaniesOverview;

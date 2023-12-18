// pages/more-details.tsx

import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/system";
import Router from "next/router";
import { Alert, AlertTitle } from "@mui/material";

const StyledButton = styled(Button)({
  backgroundColor: "#2196F3", // Set your desired background color
  color: "#1565C0", // Set your desired text color
  fontSize: "20px", // Set your desired font size
  width: "100%", // Set the width to 100% to match the fields
  marginTop: "16px",
  "&:hover": {
    backgroundColor: "#1565C0", // Set a different color on hover if needed
    color: "white",
  },
});

const StyledMenu = styled(MenuItem)({
  color: "green",
});

const MoreDetails: React.FC = () => {
  const [name, setName] = useState("");
  const [dropdown1Value, setDropdown1Value] = useState("");
  const [dropdown2Value, setDropdown2Value] = useState("");
    const [isError, SetisError] = useState(false)

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleDropdown1Change = (e: React.ChangeEvent<{ value: unknown }>) => {
    const selectedValue = e.target.value as string;
    setDropdown1Value(selectedValue);
    // If you want to update the name field based on dropdown1 selection, uncomment the line below
    // setName(selectedValue);
  };

  const handleDropdown2Change = (e: React.ChangeEvent<{ value: unknown }>) => {
    const selectedValue = e.target.value as string;
    setDropdown2Value(selectedValue);
    // If you want to update the name field based on dropdown2 selection, uncomment the line below
    // setName(selectedValue);
  };

  const handleSubmit = () => {
    // Perform any submission logic here
    if (name !== "" && dropdown1Value !== "" && dropdown2Value !== "") {
      Router.push("/tracker");
    } else {
        SetisError(true)
    }
    setName("");
    setDropdown1Value("");
    setDropdown2Value("");

    console.log("Name:", name);
    console.log("Dropdown 1:", dropdown1Value);
    console.log("Dropdown 2:", dropdown2Value);
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100vh", // 100% of the viewport height
      }}
    >
      <Typography variant="h3" gutterBottom>
        Just a Few More Details and You Are
        <span style={{ fontWeight: "bold" }}> Ready to Roll</span>
      </Typography>
      <form>
        <TextField
          label="Name"
          id="name"
          value={name}
          onChange={handleNameChange}
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel id="dropdown1-label">Which Class are you in ?</InputLabel>
          <Select
            label="which Class are you in ?    "
            id="dropdown1"
            value={dropdown1Value}
            onChange={handleDropdown1Change}
          >
            <MenuItem value="11th class">11th Class</MenuItem>
            <MenuItem value="12th class">12th Class</MenuItem>
            <MenuItem value="Dropper">Dropper</MenuItem>
            {/* Add more options as needed */}
          </Select>
        </FormControl>
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel id="dropdown2-label">
            Which Coaching are you enrolled in ?
          </InputLabel>
          <Select
            label="Which Coaching are you enrolled in ?  "
            id="dropdown2"
            value={dropdown2Value}
            onChange={handleDropdown2Change}
          >
            <MenuItem value="PW">PW</MenuItem>
            <MenuItem value="Unacademy">Unacademy</MenuItem>
            <MenuItem value="self study">Self Study</MenuItem>
            <MenuItem value="allen">Allen</MenuItem>
            <MenuItem value="resonance">Resonance</MenuItem>
            <MenuItem value="apni kaksha">Apni Kaksha</MenuItem>
            <MenuItem value="narayana">Narayana</MenuItem>
            <MenuItem value="sri chaitanya">Sri Chaitanya</MenuItem>
            <StyledMenu value="other">Other</StyledMenu>
            {/* Add more options as needed */}
          </Select>
        </FormControl>
        <StyledButton
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Submit
        </StyledButton>
      </form>
       {isError && (
            <Alert severity="error" sx={{ marginTop: 2 }}>
              <AlertTitle>Error</AlertTitle>
              Please fill out all the fields.
            </Alert>
          )}
    </Container>

  );
};

export default MoreDetails;

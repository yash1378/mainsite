// pages/test-tracker.tsx
import React, { useState,useEffect} from "react";
import {
  Typography,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  SelectChangeEvent,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/system";
import Grow from "@mui/material/Grow";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const StyledButton = styled(Button)({
  backgroundColor: "#2196F3", // Set your desired background color
  color: "white", // Set your desired text color
  fontSize: "20px", // Set your desired font size
  width: "100%", // Set the width to 100% to match the fields
  marginTop: "16px",
  "&:hover": {
    backgroundColor: "#1565C0", // Set a different color on hover if needed
    color: "white",
  },
});
import { useRouter } from "next/router";
import { set } from "date-fns";
const TestTracker: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false); // Initialize loading as true
  const [testType, setTestType] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [open, setOpen] = useState(true);
  const [pre, setPre] = useState(false);
  setTimeout(() => {
    setOpen(false);
  }, 3000);

  useEffect(() => {
    setTimeout(() => {
      setOpen(false);
    }, 3000);

    if (router.query.new === "true") {
      setPre(true);
    }
  }, [router.query.new]); // Add router.query.new as a dependency

  const handleTestTypeChange = (event: SelectChangeEvent<string>) => {
    setTestType(event.target.value);
  };

  // const router = useRouter();

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
    }
  };
  const Router = useRouter();

  const handleSubmit = () => {
    setLoading(true); // Set loading to true on submission
    setTestType("");
    setSelectedDate(new Date());
    console.log("Test Type:", testType);
    console.log("Selected Date:", selectedDate);
    if (testType === "mains") {
      Router.push({
        pathname: "/mains",
        query: { date: selectedDate.toISOString().split("T")[0] },
      });
    }
    if (testType === "advanced") {
      Router.push({
        pathname: "/advformat",
      });
    }
    // Add any additional submission logic here
  };

  return (
    <>
      {loading ? (
        <>
        <div style={{ textAlign: "center",marginTop:"40vh" }}>
        <CircularProgress />
        <Typography variant="h6" style={{ marginTop: 16 }}>
          Loading...
        </Typography>
      </div>
      </>
      ) : (
        <Container
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh", // Adjust if needed to center vertically in the viewport
          }}
        >
          <Typography variant="h4" gutterBottom>
            Create Your Test Tracker
          </Typography>
          <form style={{ width: "100%", maxWidth: "400px" }}>
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel id="test-type-label">Test Type</InputLabel>
              <Select
                label="Test Type"
                id="test-type"
                value={testType}
                onChange={handleTestTypeChange}
              >
                <MenuItem value="mains">Classic Mains</MenuItem>
                <MenuItem value="advanced">Classic Advanced</MenuItem>
                <MenuItem value="custom">Custom Test</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Select Date"
              type="date"
              id="test-date"
              value={selectedDate.toISOString().split("T")[0]} // Format date as 'YYYY-MM-DD'
              onChange={(e) => handleDateChange(new Date(e.target.value))}
              variant="outlined"
              margin="normal"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
            <StyledButton
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Submit
            </StyledButton>
          </form>
          {pre ? (
            <Snackbar
              open={open}
              TransitionComponent={Grow}
              autoHideDuration={6000}
            >
              <MuiAlert severity="success" style={{ width: "100%" }}>
                Details Submitted Successfully
              </MuiAlert>
            </Snackbar>
          ) : (
            <Snackbar
              open={open}
              TransitionComponent={Grow}
              autoHideDuration={6000}
            >
              <MuiAlert severity="info" style={{ width: "100%" }}>
                Welcome to Your Test Tracker
              </MuiAlert>
            </Snackbar>
          )}
        </Container>
      )}
    </>
  );
};

export default TestTracker;

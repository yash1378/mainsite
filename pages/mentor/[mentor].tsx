// Import necessary modules
import { useRouter } from "next/router";
import { useState } from "react";
import React from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  TextField,
  Box,
  Rating,
} from "@mui/material";

interface MentorCard {
  photo: string;
  name: string;
  college: string;
  experience: string;
  buttonLabel: string;
}



const mentors: MentorCard[] = [
  {
    photo: "/1.jpg",
    name: "Mr X",
    college: "Example University",
    experience: "5 years",
    buttonLabel: "Give Review",
  },
  {
    photo: "/2.jpg",
    name: "Mr Y",
    college: "Another University",
    experience: "3 years",
    buttonLabel: "Give Review",
  },
  {
    photo: "/3.jpg",
    name: "Mr A",
    college: "Another University",
    experience: "1 year",
    buttonLabel: "Give Review",
  },
  {
    photo: "/4.jpg",
    name: "Mr B",
    college: "Another University",
    experience: "6 years",
    buttonLabel: "Give Review",
  },
  {
    photo: "/1.jpg",
    name: "Mr X",
    college: "Example University",
    experience: "5 years",
    buttonLabel: "Give Review",
  },
  {
    photo: "/2.jpg",
    name: "Mr Y",
    college: "Another University",
    experience: "3 years",
    buttonLabel: "Give Review",
  },
  {
    photo: "/3.jpg",
    name: "Mr A",
    college: "Another University",
    experience: "1 year",
    buttonLabel: "Give Review",
  },
  {
    photo: "/4.jpg",
    name: "Mr B",
    college: "Another University",
    experience: "6 years",
    buttonLabel: "Give Review",
  },
  {
    photo: "/1.jpg",
    name: "Mr X",
    college: "Example University",
    experience: "5 years",
    buttonLabel: "Give Review",
  },
  {
    photo: "/2.jpg",
    name: "Mr Y",
    college: "Another University",
    experience: "3 years",
    buttonLabel: "Give Review",
  },
  {
    photo: "/3.jpg",
    name: "Mr A",
    college: "Another University",
    experience: "1 year",
    buttonLabel: "Give Review",
  },
  {
    photo: "/4.jpg",
    name: "Mr B",
    college: "Another University",
    experience: "6 years",
    buttonLabel: "Give Review",
  },
  {
    photo: "/1.jpg",
    name: "Mr X",
    college: "Example University",
    experience: "5 years",
    buttonLabel: "Give Review",
  },
  {
    photo: "/2.jpg",
    name: "Mr Y",
    college: "Another University",
    experience: "3 years",
    buttonLabel: "Give Review",
  },
  {
    photo: "/3.jpg",
    name: "Mr A",
    college: "Another University",
    experience: "1 year",
    buttonLabel: "Give Review",
  },
  {
    photo: "/4.jpg",
    name: "Mr B",
    college: "Another University",
    experience: "6 years",
    buttonLabel: "Give Review",
  },
  // Add more mentors as needed
];

// Define your component
const MentorPage: React.FC = () => {
  // Use the useRouter hook
  const router = useRouter();
  // Extract the mentor parameter from the query object
  const { mentor: mentorIndex } = router.query;


  const [averageTime, setAverageTime] = useState("");
  const [experience, setExperience] = useState("");
  const [rating, setRating] = useState<number | null>(0); // Initialize with a default rating


  // Get mentor information based on the index from the query parameter
  const selectedMentor = mentors[Number(mentorIndex)];

  const handleAverageTimeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAverageTime(event.target.value);
  };

  const handleExperienceChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setExperience(event.target.value);
  };

  const handleRatingChange = (value: number | null) => {
    setRating(value);
  };

  const handleSubmit = () => {
    // Handle submission logic (e.g., send data to the server)
    // You can use the 'averageTime', 'experience', and 'rating' states here
    console.log("Submitted:", { averageTime, experience, rating });
  };
  return (
    <Container>
      <Typography variant="h3" style={{textAlign:"center"}}>Rate Your Mentor</Typography>
      <br />
      <br />

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          {/* Mentor Information */}
          <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
            <img
              src={selectedMentor.photo}
              alt={selectedMentor.name}
              style={{ width: "100%", height: "auto", marginBottom: "10px" }}
            />
            <br />
            <Typography variant="h3">{selectedMentor.name}</Typography>
            <br />
            <Typography variant="h5">{selectedMentor.college}</Typography>
          </Box>
        </Grid>
        <Grid item xs={15} md={8} style={{marginTop:"10vh"}}>
          {/* Rating Section */}
          <Box display="flex" alignItems="center" mb={7}>
            <Rating
              name="mentor-rating"
              value={rating}
              precision={0.5}
              size="large"
              onChange={(event, newValue) => handleRatingChange(newValue)}
            />
          </Box>
          {/* Average Time Input */}
          <TextField
            label="Average Time Invested (hours)"
            variant="outlined"
            fullWidth
            value={averageTime}
            onChange={handleAverageTimeChange}
            style={{ marginBottom: "6vh" }} // Adjust the margin as needed
          />
          {/* Experience Textarea */}
          <TextField
            label="Your Experience with the Mentor"
            variant="outlined"
            multiline
            rows={6}
            fullWidth
            value={experience}
            onChange={handleExperienceChange}
            style={{ marginBottom: "6vh" }} // Adjust the margin as needed
          />

          {/* Submit Button */}
          <Button variant="contained" color="primary" onClick={handleSubmit} style={{width:"100%"}}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MentorPage;

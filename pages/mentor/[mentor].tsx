// Import necessary modules
import { useRouter } from "next/router";
import { useState } from "react";
import React, { useEffect } from "react";
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

type MentorData = {
  averageTime: string;
  rating: number | null;
};

// Define your component
const MentorPage: React.FC = () => {
  // Use the useRouter hook
  const router = useRouter();
  const { mentor: mentorIndex, name, college, image } = router.query;

  useEffect(() => {
    // Fetch additional mentor details based on mentorIndex or perform other necessary actions
    // This useEffect will run whenever mentorIndex, name, college, or photo changes
  }, [mentorIndex, name, college, image]);

  if (!mentorIndex) {
    // Handle the case where mentorIndex is undefined
    return <div>Mentor not found</div>;
  }

  const [averageTime, setAverageTime] = useState("");
  const [experience, setExperience] = useState("");
  const [rating, setRating] = useState<number | null>(0); // Initialize with a default rating

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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    const mentorData = {
      rating: rating?.toString() || '',
      averageTime: averageTime,
    };
    console.log(mentorData)
  
    try {
      // const response = await fetch(`http://localhost:4000/api/increase/${mentorIndex}`, {
      const response = await fetch(`https://gp-backend-u5ty.onrender.com/api/increase/${mentorIndex}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mentorData),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Mentor data sent successfully:', data);
  
      // Assuming you want to redirect or do something else on success
      // router.push('/success'); // Replace with your success page
    } catch (error) {
      console.error('Error sending mentor data:', error);
      // Handle error as needed
    }
  };
  

  return (
    <Container>
      <Typography variant="h3" style={{ textAlign: "center" }}>
        Rate Your Mentor
      </Typography>
      <br />
      <br />

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          {/* Mentor Information */}
          <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
            <img
              src={image as string}
              alt={name as string} // Ensure 'name' is treated as a string
              style={{ width: "100%", height: "auto", marginBottom: "10px" }}
            />

            <br />
            <Typography variant="h3">{name}</Typography>
            <br />
            <Typography variant="h5">{college}</Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={15}
          md={8}
          style={{
            marginTop: "4vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Mentor Details */}
          {/* ... (rest of the component remains the same) */}

          <div style={{ textAlign: "left" }}>
            Hello there! I am an enthusiastic mentor with a passion for guiding
            individuals on their learning journeys. My goal is to empower and
            inspire those I mentor, fostering an environment where curiosity and
            growth thrive.
            <br />
            <br />
            <b>Areas of Expertise: </b>Technology and Programming: With a solid
            background in [specific technologies or programming languages], I
            bring practical industry knowledge to the table. Whether you're a
            beginner or looking to deepen your skills, I'm here to assist.
            Problem Solving: I excel in breaking down complex problems into
            manageable components. Together, we can analyze challenges and
            explore effective solutions, enhancing your analytical and critical
            thinking skills. Career Development: Navigating the professional
            landscape can be daunting. I offer insights into career paths,
            industry trends, and strategies for personal and professional
            development.
            <br />
            <br />
            <b>Communication Style: </b>Clear and effective communication is
            key. I strive to explain concepts in a straightforward manner, using
            real-world examples to enhance understanding. Feedback is
            constructive and aimed at fostering improvement. Availability: I am
            committed to providing timely and consistent support. My
            availability for mentoring sessions and communication preferences
            are [mention your availability and preferred communication
            channels]. Let's Learn and Grow Together: Embarking on a learning
            journey can be both exciting and challenging. I look forward to
            joining you on this adventure, sharing insights, overcoming
            obstacles, and celebrating achievements. Together, we'll make the
            learning experience enjoyable and rewarding. Feel free to reach out,
            and let's get started!
          </div>
          <br />
          <br />
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
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            style={{ width: "40%", height: "8%", fontSize: "25px" }}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MentorPage;

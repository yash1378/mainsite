import { useState } from "react";
import { TextField, Button, Typography, Container, Grid } from "@mui/material";

// Define a type for the mentor data
type MentorData = {
  name: string;
  college: string;
  enrollments: string;
  rating: string;
  averageTime: string;
  image: File | null;
  [key: string]: string | File | null; // Add an index signature
};

const MentorForm = () => {
  const [mentorData, setMentorData] = useState<MentorData>({
    name: "yash",
    college: "iitr",
    enrollments: "5",
    rating: "5",
    averageTime: "30",
    experience: "",
    image: null,
  });

  const handleInputChange = (field: keyof MentorData, value: string | File) => {
    setMentorData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log(file);
    console.log(event.target.files);
    if (file) {
      setMentorData((prevData) => ({
        ...prevData,
        image: file,
      }));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const formData = new FormData();

      // Append other string values
      for (const key in mentorData) {
        if (key === "image" || typeof mentorData[key] !== "string") {
          continue;
        }
        formData.append(key, mentorData[key] as string);
      }

      // Append the File object
      if (mentorData.image) {
        formData.append("image", mentorData.image, mentorData.image.name);
      }

    //   const response = await fetch("http://localhost:4000/api/save-mentor", {
        const response = await fetch("https://gp-backend-u5ty.onrender.com/api/save-mentor", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Mentor data saved successfully!");
      } else {
        console.error("Failed to save mentor data");
      }
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h3" align="center" gutterBottom>
        Mentor Information Form
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              label="Name"
              fullWidth
              value={mentorData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              label="College"
              fullWidth
              value={mentorData.college}
              onChange={(e) => handleInputChange("college", e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              label="Enrollments"
              fullWidth
              value={mentorData.enrollments}
              onChange={(e) => handleInputChange("enrollments", e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              label="Rating"
              fullWidth
              value={mentorData.rating}
              onChange={(e) => handleInputChange("rating", e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              label="Average Time"
              fullWidth
              value={mentorData.averageTime}
              onChange={(e) => handleInputChange("averageTime", e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              label="Experience"
              fullWidth
              value={mentorData.experience}
              onChange={(e) => handleInputChange("experience", e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              name="image" // Ensure this matches the expected field name in the server route
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default MentorForm;

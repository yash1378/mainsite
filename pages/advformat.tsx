// pages/index.tsx

import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  Typography,
  TextField,
  Container,
  Paper,
  Grid,
  Box,
  Button,
} from "@mui/material";

interface CardData {
  noOfQuestions: number;
  positiveMarks: number;
  negativeMarks: number;
}

const cardTypes = [
  "Single Correct",
  "Comprehension Type",
  "Integer Type",
  "Matching",
  "Multi Correct",
];

const MyNextJSPage: React.FC = () => {
  const router = useRouter();

  const [cardData, setCardData] = useState<CardData[]>(
    Array.from({ length: cardTypes.length }, () => ({
      noOfQuestions: 0,
      positiveMarks: 0,
      negativeMarks: 0,
    }))
  );

  const handleInputChange =
    (index: number, field: keyof CardData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const updatedCardData = [...cardData];
      const inputValue = parseInt(e.target.value, 10);

      // Update the state if the input is a valid number or if it's 0
      if (!isNaN(inputValue) || inputValue === 0) {
        // Use Math.abs for negativeMarks field
        updatedCardData[index][field] =
          field === "negativeMarks" ? Math.abs(inputValue) : inputValue;

        setCardData(updatedCardData);
      }
    };

  const handleSubmit = () => {
    console.log(cardData);
    cardData[cardData.length - 1].negativeMarks = 2;
    router.push({
      pathname: "/adv", // Replace with the actual path of your next page
      query: { cardData: JSON.stringify(cardData) },
    });
  };

  const additionalCard = (
    <Grid item xs={12} md={6} lg={6}>
      <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
        <Typography variant="h5" gutterBottom>
          Multi Correct
        </Typography>

        {/* Number of Questions Input */}
        <Box>
          <TextField
            label="No of Ques"
            type="number"
            value={
              cardData[cardData.length - 1]?.noOfQuestions || ""
            }
            onChange={handleInputChange(cardData.length - 1, "noOfQuestions")}
            fullWidth
            margin="normal"
          />
        </Box>

        {/* Partial Marking Disabled Button */}
        <Box>
          <TextField
            label="Partial Marking"
            value="By Default"
            disabled
            fullWidth
            margin="normal"
          />
        </Box>
      </Paper>
    </Grid>
  );

  const styles = `
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

  return (
    <>
      <style>{styles}</style>
      <Container maxWidth="lg">
        <Typography variant="h2" gutterBottom>
          Choose the <b>Pattern</b> for your advanced Test
        </Typography>
        <Grid container spacing={3}>
          {cardData.map((card, index) => (
            <React.Fragment key={index}>
              {index === 4 ? (
                additionalCard
              ) : (
                <Grid item xs={12} md={6} lg={6}>
                  <Paper
                    elevation={3}
                    style={{ padding: "20px", marginTop: "20px" }}
                  >
                    <Typography variant="h5" gutterBottom>
                      {cardTypes[index]}
                    </Typography>

                    {/* Number of Questions Input */}
                    <Box>
                      <TextField
                        label="No of Ques"
                        type="number"
                        value={
                          card?.noOfQuestions || ""
                        }
                        onChange={handleInputChange(index, "noOfQuestions")}
                        fullWidth
                        margin="normal"
                      />
                    </Box>

                    {/* Positive Marks Input */}
                    <Box>
                      <TextField
                        label="Positive Marks"
                        type="number"
                        value={
                          // card.positiveMarks !== 0 ? card.positiveMarks : ""
                          card.positiveMarks || ""
                        }
                        onChange={handleInputChange(index, "positiveMarks")}
                        fullWidth
                        margin="normal"
                      />
                    </Box>

                    {/* Negative Marks Input */}
                    <Box>
                      <TextField
                        label="-ve Marks"
                        type="number"
                        value={
                          // card.negativeMarks !== 0 ? card.negativeMarks : ""
                          card.negativeMarks || ""
                        }
                        onChange={handleInputChange(index, "negativeMarks")}
                        fullWidth
                        margin="normal"
                      />
                    </Box>
                  </Paper>
                </Grid>
              )}
            </React.Fragment>
          ))}
        </Grid>

        {/* Submit Button */}
        <Box mt={3} mb={3} display="flex" justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleSubmit}
            style={{ width: "200px" }}
          >
            Submit
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default MyNextJSPage;

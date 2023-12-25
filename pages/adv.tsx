// pages/nextPage.tsx

import React, { useState } from "react";
import {
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { sub } from "date-fns";
import { TextField } from "@mui/material";

interface CardData {
  noOfQuestions: number;
  positiveMarks: number;
  negativeMarks: number;
}

interface SectionData {
  correct: number[];
  sillyError: number[];
  slightRevision: number[];
  toughness: number[];
  theory: number[];
}

const cardTypes = [
  "Single Correct",
  "Comprehension Type",
  "Integer Type",
  "Matching",
  "MultiCorrect",
];

const subjects = ["Math", "Physics", "Chemistry"];

const NextPage: React.FC = () => {
  const router = useRouter();
  const { cardData } = router.query;
  const [jwt, setJwt] = useState<string>(localStorage.getItem("jwt") || "");

  if (!cardData) {
    // Redirect to the previous page if data is not available
    router.push("/");
    return null;
  }

  const parsedCardData: CardData[] = JSON.parse(cardData as string);

  const [selectedButtons, setSelectedButtons] = useState<SectionData[][]>(
    Array.from({ length: subjects.length }, () =>
      Array.from({ length: cardTypes.length }, () => ({
        correct: [],
        sillyError: [],
        slightRevision: [],
        toughness: [],
        theory: [],
      }))
    )
  );
  console.log(selectedButtons);

  const [correct, setCorrect] = useState<number>(0);
  const [silly, setSilly] = useState<number>(0);
  const [slight, setSlight] = useState<number>(0);
  const [tough, setTough] = useState<number>(0);
  const [theory, setTheory] = useState<number>(0);

  const handleButtonClick = (
    subjectIndex: number,
    sectionIndex: number,
    columnName: keyof SectionData,
    rowIndex: number,
    negativeMarks?: number,
    positiveMarks?: number
  ) => {
    // Log current values
    // console.log("before " + correct, silly, slight, tough, theory);

    setSelectedButtons((prevSelectedButtons) => {
      const newSelectedButtons = [...prevSelectedButtons];
      const isSelected =
        newSelectedButtons[subjectIndex][sectionIndex][columnName].includes(
          rowIndex
        );

      // console.log(subjectIndex, sectionIndex, columnName, rowIndex, isSelected);
      // Increment or decrement corresponding variable based on the column name
      // console.log(parsedCardData[subjectIndex]);
      if (isSelected) {
        // If the button is already selected, decrement the corresponding variable
        switch (columnName) {
          case "correct":
            setCorrect((prevCorrect) => prevCorrect - (positiveMarks || 0));
            break;
          case "sillyError":
            setSilly((prevSilly) => prevSilly + (negativeMarks || 0));
            break;
          case "slightRevision":
            setSlight((prevSlight) => prevSlight + (negativeMarks || 0));
            break;
          case "toughness":
            setTough((prevTough) => prevTough + (negativeMarks || 0));
            break;
          case "theory":
            setTheory((prevTheory) => prevTheory + (negativeMarks || 0));
            break;
          default:
            break;
        }

        // Remove the button from the selection
        newSelectedButtons[subjectIndex][sectionIndex][columnName] =
          newSelectedButtons[subjectIndex][sectionIndex][columnName].filter(
            (selectedRowIndex) => selectedRowIndex !== rowIndex
          );
      } else {
        // If the button is not selected, increment the corresponding variable
        switch (columnName) {
          case "correct":
            setCorrect((prevCorrect) => prevCorrect + (positiveMarks || 0));
            break;
          case "sillyError":
            setSilly((prevSilly) => prevSilly - (negativeMarks || 0));
            break;
          case "slightRevision":
            setSlight((prevSlight) => prevSlight - (negativeMarks || 0));
            break;
          case "toughness":
            setTough((prevTough) => prevTough - (negativeMarks || 0));
            break;
          case "theory":
            setTheory((prevTheory) => prevTheory - (negativeMarks || 0));
            break;
          default:
            break;
        }

        // Add the button to the selection
        newSelectedButtons[subjectIndex][sectionIndex][columnName] = [
          ...newSelectedButtons[subjectIndex][sectionIndex][columnName],
          rowIndex,
        ];
      }

      console.log("after " + correct, silly, slight, tough, theory);

      return newSelectedButtons;
    });
  };

  const styles = `
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  },
  input[type="number"].input-text-color {
    color: black; /* or the desired text color */
  }
`;

  const handleSubmit = () => {
    // Send the values to the backend API (replace with your actual API endpoint)
    fetch("https://jsmainsitebackend.onrender.com/advdata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`, // Include the JWT in the Authorization header
      },
      body: JSON.stringify({
        correct: correct,
        silly: silly,
        slight: slight,
        tough: tough,
        theory: theory,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        router.push("/");
        // Optionally, you can redirect or show a success message here
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle the error (redirect, show an error message, etc.)
      });
  };

  const handleInputChange = (
    subjectIndex: number,
    sectionIndex: number,
    rowIndex: number,
    type: keyof SectionData,
    value: string
  ) => {
    // Convert the input value to an integer
    const numericValue = parseInt(value, 10) || 0;

    // Clone the state to avoid mutating it directly
    const newSelectedButtons = [...selectedButtons];

    // Extract the current value of the specified type
    const currentTypeValue =
      newSelectedButtons[subjectIndex][sectionIndex][type][rowIndex] || 0;

    // Update the state based on the input value
    newSelectedButtons[subjectIndex][sectionIndex][type][rowIndex] =
      numericValue;

    // Update the 'correct' state by adding the difference
    switch (type) {
      case "correct":
        setCorrect(
          (prevCorrect) => prevCorrect + numericValue - currentTypeValue
        );
        break;
      case "sillyError":
        setSilly((prevSilly) => prevSilly - numericValue + currentTypeValue);
        break;
      case "slightRevision":
        setSlight((prevSlight) => prevSlight - numericValue + currentTypeValue);
        break;
      case "toughness":
        setTough((prevTough) => prevTough - numericValue + currentTypeValue);
        break;
      case "theory":
        setTheory((prevTheory) => prevTheory - numericValue + currentTypeValue);
        break;
      default:
        break;
    }
    console.log(correct, silly, slight, tough, theory);
    // Update the state with the new selectedButtons array
    setSelectedButtons(newSelectedButtons);
  };

  return (
    <>
      <style>{styles}</style>
      <Container maxWidth="lg">
        {subjects.map((subject, subjectIndex) => (
          <div key={subjectIndex}>
            <Typography variant="h4" gutterBottom>
              {subject}
            </Typography>
            {parsedCardData.map((card, sectionIndex) => (
              <div key={sectionIndex} style={{ marginTop: "20px" }}>
                <Typography variant="h5" gutterBottom>
                  {cardTypes[sectionIndex]}
                </Typography>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Correct</TableCell>
                        <TableCell>Silly Error</TableCell>
                        <TableCell>Slight Revision</TableCell>
                        <TableCell>Toughness</TableCell>
                        <TableCell>Theory</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {[...Array(card.noOfQuestions)].map((_, rowIndex) => (
                        <TableRow key={rowIndex}>
                          <TableCell>
                            {/* Correct Text Field */}
                            {sectionIndex === 4 ? (
                              // ... (previous code)

                              <TextField
                                variant="outlined"
                                size="small"
                                style={{
                                  width: "80px",
                                  // color: "black",
                                  // backgroundColor: "white",
                                }}
                                type="number"
                                inputProps={{ min: 0 }}
                                value={
                                  selectedButtons[subjectIndex][sectionIndex]
                                    ?.correct[rowIndex] || ""
                                }
                                onChange={(e) =>
                                  handleInputChange(
                                    subjectIndex,
                                    sectionIndex,
                                    rowIndex,
                                    "correct", // Type of the field
                                    e.target.value
                                  )
                                }
                              />
                            ) : (
                              // Correct Button
                              <Button
                                variant="contained"
                                color="success"
                                style={{
                                  color: selectedButtons[subjectIndex][
                                    sectionIndex
                                  ]?.correct.includes(rowIndex)
                                    ? "white"
                                    : "green",
                                  backgroundColor: selectedButtons[
                                    subjectIndex
                                  ][sectionIndex]?.correct.includes(rowIndex)
                                    ? "green"
                                    : "white",
                                }}
                                onClick={() =>
                                  handleButtonClick(
                                    subjectIndex,
                                    sectionIndex,
                                    "correct",
                                    rowIndex,
                                    card.negativeMarks,
                                    card.positiveMarks
                                  )
                                }
                              >
                              {Math.abs(card.positiveMarks)}
                              </Button>
                            )}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="contained"
                              color="warning"
                              style={{
                                color: selectedButtons[subjectIndex][
                                  sectionIndex
                                ]?.sillyError.includes(rowIndex)
                                  ? "white"
                                  : "red",
                                backgroundColor: selectedButtons[subjectIndex][
                                  sectionIndex
                                ]?.sillyError.includes(rowIndex)
                                  ? "red"
                                  : "white",
                              }}      
                              onClick={() =>
                                handleButtonClick(
                                  subjectIndex,
                                  sectionIndex,
                                  "sillyError",
                                  rowIndex,
                                  card.negativeMarks,
                                  card.positiveMarks
                                )
                              }
                            >
                            {card.negativeMarks === 0 ? "0" : `-${Math.abs(card.negativeMarks)}`}
                            </Button>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="contained"
                              color="info"
                              style={{
                                color: selectedButtons[subjectIndex][
                                  sectionIndex
                                ]?.slightRevision.includes(rowIndex)
                                  ? "white"
                                  : "blue",
                                backgroundColor: selectedButtons[subjectIndex][
                                  sectionIndex
                                ]?.slightRevision.includes(rowIndex)
                                  ? "blue"
                                  : "white",
                              }}
                              onClick={() =>
                                handleButtonClick(
                                  subjectIndex,
                                  sectionIndex,
                                  "slightRevision",
                                  rowIndex,
                                  card.negativeMarks,
                                  card.positiveMarks
                                )
                              }
                            >
                            {card.negativeMarks === 0 ? "0" : `-${Math.abs(card.negativeMarks)}`}
                            </Button>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="contained"
                              color="error"
                              style={{
                                color: selectedButtons[subjectIndex][
                                  sectionIndex
                                ]?.toughness.includes(rowIndex)
                                  ? "white"
                                  : "brown",
                                backgroundColor: selectedButtons[subjectIndex][
                                  sectionIndex
                                ]?.toughness.includes(rowIndex)
                                  ? "brown"
                                  : "white",
                              }}
                              onClick={() =>
                                handleButtonClick(
                                  subjectIndex,
                                  sectionIndex,
                                  "toughness",
                                  rowIndex,
                                  card.negativeMarks,
                                  card.positiveMarks
                                )
                              }
                            >
                            {card.negativeMarks === 0 ? "0" : `-${Math.abs(card.negativeMarks)}`}
                            </Button>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="contained"
                              color="primary"
                              style={{
                                color: selectedButtons[subjectIndex][
                                  sectionIndex
                                ]?.theory.includes(rowIndex)
                                  ? "white"
                                  : "blue",
                                backgroundColor: selectedButtons[subjectIndex][
                                  sectionIndex
                                ]?.theory.includes(rowIndex)
                                  ? "blue"
                                  : "white",
                              }}
                              onClick={() =>
                                handleButtonClick(
                                  subjectIndex,
                                  sectionIndex,
                                  "theory",
                                  rowIndex,
                                  card.negativeMarks,
                                  card.positiveMarks
                                )
                              }
                            >
                            {card.negativeMarks === 0 ? "0" : `-${Math.abs(card.negativeMarks)}`}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            ))}
          </div>
        ))}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          style={{ marginTop: "20px" }}
        >
          Submit
        </Button>
      </Container>
    </>
  );
};

export default NextPage;

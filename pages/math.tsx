// MathsPage.tsx
import React, { useState } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
} from "@mui/material";

interface Colors {
  Correct: string;
  "Silly Error": string;
  "Slight Revision": string;
  Toughness: string;
  Theory: string;
}

const COLORS: Colors = {
  Correct: "green",
  "Silly Error": "red",
  "Slight Revision": "violet",
  Toughness: "blue",
  Theory: "blue",
};

const StyledButton = styled(Button)({
    backgroundColor: "#2196F3", // Set your desired background color
    color: "white", // Set your desired text color
    fontSize: "20px", // Set your desired font size
    width: "90%", // Set the width to 100% to match the fields
    marginTop: "30px",
    marginBottom: "30px",
    "&:hover": {
      backgroundColor: "#1565C0", // Set a different color on hover if needed
      color: "white",
    },
  });
  

const generateButtonColors = (rows: number, columns: number): string[][] => {
  return new Array(rows).fill("").map(() => Array(columns).fill(""));
};

const MathsPage: React.FC = () => {
  const [buttonColors, setButtonColors] = useState<string[][]>(
    generateButtonColors(20, 5)
  );
  const [integralButtonColors, setIntegralButtonColors] = useState<string[][]>(
    generateButtonColors(10, 5)
  );
  const router = useRouter(); // Create a history object to navigate to another page

  const handleButtonClick = (rowIndex: number, columnId: number) => {
    const newColors = [...buttonColors];
    newColors[rowIndex][columnId] =
      newColors[rowIndex][columnId] === "clicked" ? "" : "clicked";
    setButtonColors(newColors);
    console.log("Button Clicked in First Table:", { rowIndex, columnId });
    console.log("First Table State:", newColors);
  };

  const handleIntegralButtonClick = (rowIndex: number, columnId: number) => {
    const newColors = [...integralButtonColors];
    newColors[rowIndex][columnId] =
      newColors[rowIndex][columnId] === "clicked" ? "" : "clicked";
    setIntegralButtonColors(newColors);
    console.log("Button Clicked in Second Table:", { rowIndex, columnId });
    console.log("Second Table State:", newColors);
  };
  const handleSubmit = () => {
    // Navigate to another page and pass data through query parameters
    router.push({
      pathname: '/analysis',
      query: {
        buttonColors: JSON.stringify(buttonColors),
        integralButtonColors: JSON.stringify(integralButtonColors),
      },
    });
  };


  return (
    <div style={{ textAlign: "center" }}>
      <Typography variant="h2">Maths</Typography>
      <Typography variant="h4" style={{ margin: "30px" }}>
        Single Correct
      </Typography>

      {/* First Table */}
      <TableContainer
        component={Paper}
        style={{
          width: "90%",
          margin: "auto",
          maxHeight: "70vh",
          overflowY: "auto",
          scrollbarColor: "grey black",
          scrollbarWidth: "thin",
        }}
      >
        <style>
          {`
            ::-webkit-scrollbar {
              width: 10px;
            }
            ::-webkit-scrollbar-thumb {
              background-color: grey;
              border-radius: 5px;
            }
            ::-webkit-scrollbar-thumb:hover {
              background-color: #555;
            }
            ::-webkit-scrollbar-track {
              background-color: black;
            }
          `}
        </style>
        <Table className="maths-table" size="small">
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              {Object.keys(COLORS).map((column, columnId) => (
                <TableCell key={columnId}>
                  <Button
                    variant="contained"
                    className="header-button"
                    style={{
                      backgroundColor: COLORS[column as keyof Colors],
                      color: "white",
                      fontWeight: "bold",
                      borderRadius: "5px",
                      margin: "1px",
                      textTransform: "capitalize",
                      fontSize: "19px",
                    }}
                  >
                    {column}
                  </Button>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {buttonColors.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                <TableCell>{rowIndex + 1}</TableCell>
                {row.map((color, columnId) => (
                  <TableCell key={columnId}>
                    <Button
                      variant="contained"
                      className={`button ${color}`}
                      onClick={() => handleButtonClick(rowIndex, columnId)}
                      style={{
                        backgroundColor:
                          color === "clicked"
                            ? COLORS[
                                Object.keys(COLORS)[columnId] as keyof Colors
                              ]
                            : "white",
                        color:
                          color === "clicked"
                            ? "white"
                            : COLORS[
                                Object.keys(COLORS)[columnId] as keyof Colors
                              ],
                      }}
                    >
                      {Object.keys(COLORS)[columnId]}
                    </Button>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Second Table */}
      <Typography variant="h4" style={{ margin: "30px" }}>
        Integer Type
      </Typography>
      <TableContainer
        component={Paper}
        style={{
          width: "90%",
          margin: "auto",
          maxHeight: "70vh",
          overflowY: "auto",
          scrollbarColor: "grey black",
          scrollbarWidth: "thin",
        }}
      >
        <style>
          {`
            ::-webkit-scrollbar {
              width: 10px;
            }
            ::-webkit-scrollbar-thumb {
              background-color: grey;
              border-radius: 5px;
            }
            ::-webkit-scrollbar-thumb:hover {
              background-color: #555;
            }
            ::-webkit-scrollbar-track {
              background-color: black;
            }
          `}
        </style>
        <Table className="maths-table" size="small">
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              {Object.keys(COLORS).map((column, columnId) => (
                <TableCell key={columnId}>
                  <Button
                    variant="contained"
                    className="header-button"
                    style={{
                      backgroundColor: COLORS[column as keyof Colors],
                      color: "white",
                      fontWeight: "bold",
                      borderRadius: "5px",
                      margin: "1px",
                      textTransform: "capitalize",
                      fontSize: "19px",
                    }}
                  >
                    {column}
                  </Button>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {integralButtonColors.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                <TableCell>{rowIndex + 1}</TableCell>
                {row.map((color, columnId) => (
                  <TableCell key={columnId}>
                    <Button
                      variant="contained"
                      className={`button ${color}`}
                      onClick={() =>
                        handleIntegralButtonClick(rowIndex, columnId)
                      }
                      style={{
                        backgroundColor:
                          color === "clicked"
                            ? COLORS[
                                Object.keys(COLORS)[columnId] as keyof Colors
                              ]
                            : "white",
                        color:
                          color === "clicked"
                            ? "white"
                            : COLORS[
                                Object.keys(COLORS)[columnId] as keyof Colors
                              ],
                      }}
                    >
                      {Object.keys(COLORS)[columnId]}
                    </Button>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <StyledButton
        variant="contained"
        color="primary"
        onClick={handleSubmit}
      >
        Submit
      </StyledButton>
    </div>
  );
};

export default MathsPage;

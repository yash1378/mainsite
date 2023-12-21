// MathsPage.tsx
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
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

interface SubjectSectionProps {
  subject: string;
  correct: number;
  silly: number;
  slight: number;
  tough: number;
  theory: number;
  setCorrect: React.Dispatch<React.SetStateAction<number>>;
  setSilly: React.Dispatch<React.SetStateAction<number>>;
  setSlight: React.Dispatch<React.SetStateAction<number>>;
  setTough: React.Dispatch<React.SetStateAction<number>>;
  setTheory: React.Dispatch<React.SetStateAction<number>>;
}
// ... (other imports)

interface Colors {
  Correct: string;
  "Silly Error": string;
  "Slight Revision": string;
  Toughness: string;
  Theory: string;
  [key: string]: string; // Index signature for dynamic keys
}

const COLORS: Colors = {
  Correct: "green",
  "Silly Error": "red",
  "Slight Revision": "violet",
  Toughness: "blue",
  Theory: "blue",
};

// ... (rest of the code)



const StyledButton = styled(Button)({
  backgroundColor: "#2196F3",
  color: "white",
  fontSize: "20px",
  width: "90%",
  marginTop: "30px",
  marginBottom: "30px",
  "&:hover": {
    backgroundColor: "#1565C0",
    color: "white",
  },
});

const generateButtonColors = (rows: number, columns: number): string[][] => {
  return new Array(rows).fill("").map(() => Array(columns).fill(""));
};

const SubjectSection: React.FC<SubjectSectionProps> = ({
  subject,
  correct,
  silly,
  slight,
  tough,
  theory,
  setCorrect,
  setSilly,
  setSlight,
  setTough,
  setTheory,
}) => {
  const [buttonColors, setButtonColors] = useState<string[][]>(
    generateButtonColors(30, 5)
  );

  const router = useRouter();

  const handleButtonClick = (rowIndex: number, columnId: number) => {
    const newColors = [...buttonColors];
    newColors[rowIndex][columnId] =
      newColors[rowIndex][columnId] === "clicked" ? "" : "clicked";
    setButtonColors(newColors);
    console.log(newColors);

    switch (columnId) {
      case 0:
        setCorrect((prev) => (newColors[rowIndex][columnId] === "clicked" ? prev + 1 : prev - 1));
        break;
      case 1:
        setSilly((prev) => (newColors[rowIndex][columnId] === "clicked" ? prev + 1 : prev - 1));
        break;
      case 2:
        setSlight((prev) => (newColors[rowIndex][columnId] === "clicked" ? prev + 1 : prev - 1));
        break;
      case 3:
        setTough((prev) => (newColors[rowIndex][columnId] === "clicked" ? prev + 1 : prev - 1));
        break;
      case 4:
        setTheory((prev) => (newColors[rowIndex][columnId] === "clicked" ? prev + 1 : prev - 1));
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Typography variant="h4" style={{ margin: "30px" }}>
        {subject}
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
        <Table className="subject-table" size="small">
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              {Object.keys(COLORS).map((column, columnId) => (
                <TableCell key={columnId}>
                  <Button
                    variant="contained"
                    className="header-button"
                    style={{
                      backgroundColor: COLORS[column],
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
                        backgroundColor: color === "clicked" ? COLORS[Object.keys(COLORS)[columnId]] : "white",
                        color: color === "clicked" ? "white" : COLORS[Object.keys(COLORS)[columnId]],
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
    </>
  );
};

const MathsPage: React.FC = () => {
  const router = useRouter();
  const [correct, setCorrect] = useState(0);
  const [silly, setSilly] = useState(0);
  const [slight, setSlight] = useState(0);
  const [tough, setTough] = useState(0);
  const [theory, setTheory] = useState(0);

  const handleSubmit = async () => {
    const data = localStorage.getItem("jwt");
    const response = await fetch("https://jsmainsitebackend.onrender.com/mainsdata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data}`, // Include the JWT in the Authorization header
      },
      body: JSON.stringify({
        correct: correct * 4,
        silly: silly * 4,
        slight: slight * 4,
        tough: tough * 4,
        theory: theory * 4,
      }),
    });
    if (response.ok) {
      setCorrect(0);
      setSilly(0);
      setSlight(0);
      setTough(0);
      setTheory(0);



      router.push({
        pathname: "/analysis",
        query: {
          correct: correct,
          silly: silly,
          slight: slight,
          tough: tough,
          theory: theory,
        },
      });
    } else {
      console.log("Error");
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Typography variant="h2">Maths</Typography>
      <Typography variant="h4" style={{ margin: "30px" }}>
        Single Correct
      </Typography>

      <SubjectSection
        subject="Maths"
        correct={correct}
        silly={silly}
        slight={slight}
        tough={tough}
        theory={theory}
        setCorrect={setCorrect}
        setSilly={setSilly}
        setSlight={setSlight}
        setTough={setTough}
        setTheory={setTheory}
      />

      <SubjectSection
        subject="Chemistry"
        correct={correct}
        silly={silly}
        slight={slight}
        tough={tough}
        theory={theory}
        setCorrect={setCorrect}
        setSilly={setSilly}
        setSlight={setSlight}
        setTough={setTough}
        setTheory={setTheory}
      />

      <SubjectSection
        subject="Physics"
        correct={correct}
        silly={silly}
        slight={slight}
        tough={tough}
        theory={theory}
        setCorrect={setCorrect}
        setSilly={setSilly}
        setSlight={setSlight}
        setTough={setTough}
        setTheory={setTheory}
      />

      <StyledButton variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </StyledButton>
    </div>
  );
};

export default MathsPage;

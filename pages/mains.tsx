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
  CircularProgress,
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
    
    // Unselect other buttons in the same row
    newColors[rowIndex] = newColors[rowIndex].map((_, index) => (index === columnId ? "clicked" : ""));

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
  const [loading, setLoading] = useState(false); // Add loading state
  const [correctm, setCorrectm] = useState(0);
  const [sillym, setSillym] = useState(0);
  const [slightm, setSlightm] = useState(0);
  const [toughm, setToughm] = useState(0);
  const [theorym, setTheorym] = useState(0);
  const [correctp, setCorrectp] = useState(0);
  const [sillyp, setSillyp] = useState(0);
  const [slightp, setSlightp] = useState(0);
  const [toughp, setToughp] = useState(0);
  const [theoryp, setTheoryp] = useState(0);
  const [correctc, setCorrectc] = useState(0);
  const [sillyc, setSillyc] = useState(0);
  const [slightc, setSlightc] = useState(0);
  const [toughc, setToughc] = useState(0);
  const [theoryc, setTheoryc] = useState(0);



  const handleSubmit = async () => {
    try {
      setLoading(true); // Set loading to true on form submission
      const data = localStorage.getItem("jwt");
      if(router.query.date===undefined){
        router.push({
          pathname: "/tracker",
        });
      }
      const date = router.query.date;
      
    
      console.log(correctm, sillym, slightm, toughm, theorym, correctp, sillyp, slightp, toughp, theoryp, correctc, sillyc, slightc, toughc, theoryc)
      // const response = await fetch("http://localhost:3001/mainsdata", {
      const response = await fetch("https://jsmainsitebackend.onrender.com/mainsdata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data}`,
        },
        body: JSON.stringify({
          date: date,
          correctm: correctm * 4,
          sillym: sillym * 4,
          slightm: slightm * 4,
          toughm: toughm * 4,
          theorym: theorym * 4,
          correctp: correctp * 4,
          sillyp: sillyp * 4,
          slightp: slightp * 4,
          toughp: toughp * 4,
          theoryp: theoryp * 4,
          correctc: correctc * 4,
          sillyc: sillyc * 4,
          slightc: slightc * 4,
          toughc: toughc * 4,
          theoryc: theoryc * 4,

        }),
      });

      if (response.ok) {
        setCorrectm(0);
        setSillym(0);
        setSlightm(0);
        setToughm(0);
        setTheorym(0);
        setCorrectp(0);
        setSillyp(0);
        setSlightp(0);
        setToughp(0);
        setTheoryp(0);
        setCorrectc(0);
        setSillyc(0);
        setSlightc(0);
        setToughc(0);
        setTheoryc(0);
        console.log(response);

        router.push({
          pathname: "/analysis",
        });
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } 

  };

  return (
    <div style={{ textAlign: "center" }}>
      {loading===true ? (
        <CircularProgress/>
      ):(
        <>
      <Typography variant="h2">Maths</Typography>
      <Typography variant="h4" style={{ margin: "30px" }}>
        Single Correct
      </Typography>

      <SubjectSection
        subject="Maths"
        correct={correctm}
        silly={sillym}
        slight={slightm}
        tough={toughm}
        theory={theorym}
        setCorrect={setCorrectm}
        setSilly={setSillym}
        setSlight={setSlightm}
        setTough={setToughm}
        setTheory={setTheorym}
      />

      <SubjectSection
        subject="Chemistry"
        correct={correctc}
        silly={sillyc}
        slight={slightc}
        tough={toughc}
        theory={theoryc}
        setCorrect={setCorrectc}
        setSilly={setSillyc}
        setSlight={setSlightc}
        setTough={setToughc}
        setTheory={setTheoryc}
      />

      <SubjectSection
        subject="Physics"
        correct={correctp}
        silly={sillyp}
        slight={slightp}
        tough={toughp}
        theory={theoryp}
        setCorrect={setCorrectp}
        setSilly={setSillyp}
        setSlight={setSlightp}
        setTough={setToughp}
        setTheory={setTheoryp}
      />

      <StyledButton variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </StyledButton>
        </>
      )}


    </div>
  );
};

export default MathsPage;

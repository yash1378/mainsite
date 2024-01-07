// MathsPage.tsx
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import styled from "@emotion/styled";
import Head from "next/head";
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

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
  "Silly Error": "#Aa0000",
  "Slight Revision": "#331577",
  Toughness: "#1e81b0",
  Theory: "#0c016c",
};

interface ConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

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

  const [hoveredButton, setHoveredButton] = useState<{ rowIndex: number; columnId: number } | null>(null);

  const router = useRouter();

  const handleButtonClick = (rowIndex: number, columnId: number) => {
    const newColors = [...buttonColors];

    // Iterate over the whole row and adjust variables based on the previous selection
    newColors[rowIndex].forEach((value, index) => {
      if (value === "clicked") {
        switch (index) {
          case 0:
            setCorrect((prev) => prev - 4);
            break;
          case 1:
            setSilly((prev) => prev - 1);
            break;
          case 2:
            setSlight((prev) => prev - 1);
            break;
          case 3:
            setTough((prev) => prev - 1);
            break;
          case 4:
            setTheory((prev) => prev - 1);
            break;
          default:
            break;
        }
      }
    });

    // Unselect other buttons in the same row
    newColors[rowIndex] = newColors[rowIndex].map((_, index) =>
      index === columnId ? "clicked" : ""
    );

    setButtonColors(newColors);

    // Update the selected button
    switch (columnId) {
      case 0:
        setCorrect((prev) => prev + 4);
        break;
      case 1:
        setSilly((prev) => prev + 1);
        break;
      case 2:
        setSlight((prev) => prev + 1);
        break;
      case 3:
        setTough((prev) => prev + 1);
        break;
      case 4:
        setTheory((prev) => prev + 1);
        break;
      default:
        break;
    }
  };

  const handleMouseEnter = (rowIndex: number, columnId: number) => {
    setHoveredButton({ rowIndex, columnId });
  };

  const handleMouseLeave = () => {
    setHoveredButton(null);
  };
  const hoverStyle = {
    border: "1px solid #CBD5E0",
    color: "white",
    background: "transparent",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
  };


  return (
    <>
      <Typography variant="h4" color="white" style={{ margin: "30px" }}>
        <b>        {subject}</b>
      </Typography>
      <div
        style={{
          backgroundColor: "transparent",
          borderRadius: "10px",
          // boxShadow: "0 0 10px rgba(8, 8, 8, 0.7)",
          padding: "5px",
          margin: "10px",
          textAlign: "center",
        }}
      >
        <TableContainer
          component={Paper}
          style={{
            width: "100%",
            margin: "auto",
            maxHeight: "70vh",
            overflowY: "auto",
            scrollbarColor: "grey black",
            scrollbarWidth: "thin",
            backgroundColor: "transparent",
          }}
        >
          <style>
            {`
              ::-webkit-scrollbar {
                width: 10px;
                border-radius: 10px;
              }
              ::-webkit-scrollbar-thumb {
                background-color: #555 ;
                border-radius: 10px;
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
                <TableCell style={{color:'white',fontSize:'18px'}}><b>No.</b></TableCell>
                {Object.keys(COLORS).map((column, columnId) => (
                  <TableCell key={columnId}>
                    <Button
                      variant="contained"
                      className="header-button"
                      style={{
                        width: "100%",
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
                  <TableCell style={{color:'white',fontSize:'18px'}}><b>{rowIndex + 1}</b></TableCell>
                  {row.map((color, columnId) => (
                    <TableCell key={columnId}>
                      <Button
                        variant="contained"
                        className={`button ${color}`}
                        onMouseEnter={() => handleMouseEnter(rowIndex, columnId)}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => handleButtonClick(rowIndex, columnId)}
                        style={{
                          width: "100%",
                          fontSize: "18px",
                          backgroundColor:
                            color === "clicked"
                              ? COLORS[Object.keys(COLORS)[columnId]]
                              : hoveredButton?.rowIndex === rowIndex && hoveredButton?.columnId === columnId
                              ? COLORS[Object.keys(COLORS)[columnId]]
                              : "#383838",
                          color:
                            color === "clicked"
                              ? "white"
                              : hoveredButton?.rowIndex === rowIndex && hoveredButton?.columnId === columnId
                              ? hoverStyle.color
                              : "white",
                          border:
                          hoveredButton?.rowIndex === rowIndex && hoveredButton?.columnId === columnId
                            ? "none"
                            : "none",
                        }}
                      >
                        {columnId === 0 ? "+4" : (columnId === 1 || columnId === 2) ? "-1" : "0"}
                      </Button>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
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
  const [modal, setModal] = useState(false);

  const handleModalOpen = () => {
    setModal(true);
  };
  const handleModalClose = () => {
    setModal(false);
  };

  const handleSubmit = async () => {
    try {
      setModal(false);
      setLoading(true); // Set loading to true on form submission
      const data = localStorage.getItem("jwt");
      if (router.query.date === undefined) {
        router.push({
          pathname: "/tracker",
        });
      }
      const date = router.query.date;

      console.log(
        correctm,
        sillym,
        slightm,
        toughm,
        theorym,
        correctp,
        sillyp,
        slightp,
        toughp,
        theoryp,
        correctc,
        sillyc,
        slightc,
        toughc,
        theoryc
      );
      // const response = await fetch("https://jsgobackend.onrender.com/mainsdata", {
      const response = await fetch("https://jsmainsitebackend.onrender.com/mainsdata", {
      // const response = await fetch("http://localhost:3001/mainsdata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data}`,
        },
        body: JSON.stringify({
          date: date,
          correctm: correctm,
          sillym: sillym,
          slightm: slightm,
          toughm: toughm,
          theorym: theorym,
          correctp: correctp,
          sillyp: sillyp,
          slightp: slightp,
          toughp: toughp,
          theoryp: theoryp,
          correctc: correctc,
          sillyc: sillyc,
          slightc: slightc,
          toughc: toughc,
          theoryc: theoryc,
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
    <>
      <Head>
      <style>
          {`
            body {
              background-color: ${loading ? "white" : "#000000"};
              display: block;
              background-image: url('/bg.png');
              background-size: cover;
              background-repeat: no-repeat;
              background-attachment: fixed;
              border-radius: 15px;
              box-shadow: 0px 0px 10px 0px rgba(7, 7, 7, 0.8);
              padding: 20px;
              margin: 20px;
              text-align: center;
            }
          `}
        </style>
      </Head>
    <div style={{ textAlign: "center" }}>
      {loading === true ? (
        <>
        <div style={{ textAlign: "center",marginTop:"40vh" }}>
        <CircularProgress />
        <Typography variant="h6" style={{ marginTop: 16 }}>
          Loading...
        </Typography>
      </div>
      </>
      ) : (
        <>
          {modal && (
            <Dialog
              open={modal}
              PaperComponent={(props) => <Paper {...props} elevation={0} />} // Set elevation to 0 for a flat paper
              style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
            >
              <DialogTitle style={{ backgroundColor: "#2196F3", color: "white" }}>
                Confirm Submission
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Are you sure you want to submit?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleModalClose}
                  color="primary"
                  variant="outlined"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  color="primary"
                  variant="contained"
                  autoFocus
                  sx={{
                    backgroundColor: "#1565C0",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#0D47A1",
                    },
                  }}
                >
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>
          )}
          <div
          style={{
            display: 'block',
            // backgroundImage: "url('/bg.png')",
            // backgroundSize: 'cover',
            // backgroundRepeat: 'no-repeat',
            // backgroundAttachment: 'fixed', // Optional: Fixed background
            borderRadius: '15px',
            // boxShadow: '0px 0px 10px 0px rgba(7, 7, 7, 0.8)', // Add box shadow
            // padding: '20px',
            // margin: '20px',
            textAlign: 'center',
          }} 
          >
          <Typography variant="h2"
              style={{
                fontFamily: "'Graphik', sans-serif",
                color: "white",
              }} 
           ><b>Track Test</b></Typography>
          {/* <Typography variant="h4" style={{ margin: "30px" }} color='white'>
            <b>Single Correct</b>
          </Typography> */}

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

          <StyledButton
            variant="contained"
            color="primary"
            onClick={handleModalOpen}
          >
            Submit
          </StyledButton>
          <StyledButton
            variant="contained"
            color="primary"
            onClick={()=>{
              router.push({
                pathname: "/tracker",
              });
            }}
          >
            Go Back
          </StyledButton>

          </div>
        </>
      )}
    </div>
    </>
  );
};

export default MathsPage;

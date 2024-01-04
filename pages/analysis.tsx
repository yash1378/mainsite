import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import SignOutButton from "@/components/signout";
import { Tab, Tabs } from "@mui/material";
import TabPanel from "@/components/TabPanel";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { Button } from "@mui/material";
import Container from "@mui/material/Container";
import Head from "next/head";
interface UserDataPageProps {
  // Define your props if any
}

interface TestScore {
  date: string;
  type: string;
  totalMarks: number;
  [key: string]: any; // Allows any additional subject-specific properties
}

interface SubjectTest {
  marksScored: number;
  sillyError: number;
  revision: number;
  toughness: number;
  theory: number;
}

interface UserData {
  Name: string;
  Coaching: string;
  Class: string;
  testScores: TestScore[];
}

const UserDataPage: React.FC<UserDataPageProps> = (props) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null); // Track the hovered row index
  const handleNavigateToDataEntry = () => {
    // router.push("/"); // Replace "/data-entry" with the actual route for entering data
    const pre = router.query.new;
    if (pre === "true") {
      router.push({
        pathname: "/getenroll",
      });
    } else {
      router.push({
        pathname: "/tracker",
      });
    }
  };
  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    router.push("/");
  }
  const [isHovered, setIsHovered] = useState(false);
  const buttonStyle = {
    width: "300px", 
    padding: "1rem 2rem",
    border: "1px solid #CBD5E0",
    display: "flex",
    gap: "1rem",
    borderRadius: "0.5rem",
    color: "white",
    background: "#334244",
    cursor: "pointer",
    transition: "all 0.5s ease",
  };

  const hoverStyle = {
    border: "1px solid #CBD5E0",
    color: "white",
    background: "transparent",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
  };
  const handleRowHover = (index: number | null) => {
    setHoveredRow(index);
  };

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwt");

    if (!jwtToken) {
      console.error("JWT token not available");
      return;
    }
    // fetch(`http://localhost:3001/mainsdata`, {
      // fetch(`https://jsgobackend.onrender.com/mainsdata`, {
      fetch(`https://jsmainsitebackend.onrender.com/mainsdata`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        console.log(data);
        return data;
      })
      .then((userData) => {
        console.log(userData);
        setUserData(userData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error.message);
      });
  }, []);

  // console.log(userData);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };
  console.log("userData", userData);

  if (userData === null || userData.testScores.length === 0) {
    // If userData or userData.testScores is undefined or null, you can handle it here
    console.log("returned");
    return (
      <>
        {loading ? (
          <>
            <div style={{ textAlign: "center", marginTop: "40vh" }}>
              <CircularProgress />
              <Typography variant="h6" style={{ marginTop: 16 }}>
                Loading...
              </Typography>
            </div>
          </>
        ) : (
          <Container maxWidth="md">
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="80vh"
            >
              <Paper elevation={3} style={{ padding: "20px", width: "100%" }}>
                <Typography variant="h4" align="center" gutterBottom>
                  No data available to display.
                </Typography>
                <Typography variant="body1" align="center" paragraph>
                  Please enter your first set of data.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleNavigateToDataEntry}
                >
                  Enter Data
                </Button>
              </Paper>
            </Box>
          </Container>
        )}
      </>
    );
  }

  const subjects = Object.keys(userData.testScores[0]).filter(
    (key) => key !== "date" && key !== "type" && key !== "totalMarks"
  );

  return (
    <>
      <Head>
        <style>
          {`
          body {
            background-color: ${loading ? "white" : "#000000"};
          }
          .tableRow:hover {
            background-color: #334244 !important;
            color: white !important;
            cursor: pointer;
          }
          .tableRow .tableCell {
            color: white;
            font-size: 16px;
          }
          .tableRow:hover .tableCell {
            color: white !important;
          }
        `}
        </style>
      </Head>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        {loading ? (
          <>
            <div style={{ textAlign: "center", marginTop: "40vh" }}>
              <CircularProgress />
              <Typography variant="h6" style={{ marginTop: 16 }}>
                Loading...
              </Typography>
            </div>
          </>
        ) : (
          <>
            <Typography variant="h3" color="white" style={{
                              fontFamily: "'Graphik', sans-serif",
                              color: "white",
            }}>
              <b>User Data</b>
            </Typography>

            {userData.testScores.length > 0 && (
              <Tabs value={selectedTab} onChange={handleChangeTab} centered>
                {subjects.map((subject, index) => (
                  <Tab key={index} label={subject}
                  style={{
                    color: selectedTab === index ? '#1572bd' : 'white',
                    fontWeight: selectedTab === index ? 'bold' : 'normal',
                    // Add any other styles as needed
                  }}
                  />
                ))}
              </Tabs>
            )}

            <TabPanel value={selectedTab} index={selectedTab}>
              <TableContainer
                component={Paper}
                style={{
                  width: "100%",
                  backgroundColor: "black",
                  color: "white",
                }}
              >
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell className="tableCell" style={{color:'white',fontSize:'17px'}}><b>Date</b></TableCell>
                      <TableCell className="tableCell" style={{color:'white',fontSize:'17px'}}><b>Type</b></TableCell>
                      <TableCell className="tableCell" style={{color:'white',fontSize:'17px'}}><b>Total Marks</b></TableCell>
                      <TableCell className="tableCell" style={{color:'white',fontSize:'17px'}}><b>Marks Scored</b></TableCell>
                      <TableCell className="tableCell" style={{color:'white',fontSize:'17px'}}><b>Silly Error</b></TableCell>
                      <TableCell className="tableCell" style={{color:'white',fontSize:'17px'}}><b>Revision</b></TableCell>
                      <TableCell className="tableCell" style={{color:'white',fontSize:'17px'}}><b>Toughness</b></TableCell>
                      <TableCell className="tableCell" style={{color:'white',fontSize:'17px'}}><b>Theory</b></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {userData.testScores
                      .filter((test) => test[subjects[selectedTab]])
                      .map((test, index) => (
                        <TableRow
                          key={index}
                          className={`tableRow ${
                            index === hoveredRow ? "hoveredRow" : ""
                          }`}
                          onMouseEnter={() => handleRowHover(index)}
                          onMouseLeave={() => handleRowHover(null)}
                        >
                          <TableCell className="tableCell">
                            {new Date(test.date).toLocaleDateString("en-GB")}
                          </TableCell>
                          <TableCell className="tableCell">
                            {test.type}
                          </TableCell>
                          <TableCell className="tableCell">
                            {test.totalMarks}
                          </TableCell>
                          <TableCell className="tableCell">
                            {test[subjects[selectedTab]].marksScored}
                          </TableCell>
                          <TableCell className="tableCell">
                            {test[subjects[selectedTab]].sillyError}
                          </TableCell>
                          <TableCell className="tableCell">
                            {test[subjects[selectedTab]].revision}
                          </TableCell>
                          <TableCell className="tableCell">
                            {test[subjects[selectedTab]].toughness}
                          </TableCell>
                          <TableCell className="tableCell">
                            {test[subjects[selectedTab]].theory}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>
            <br />

            <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    gap: "1rem",
                  }}
                >
                  <br/>

                  <button
                    onClick={handleSignOut}
                    style={
                      isHovered
                        ? { ...buttonStyle, ...hoverStyle }
                        : buttonStyle
                    }
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    <span style={{ fontSize: "20px", marginTop: "6px",marginLeft:"80px" }}>
                      Sign Out
                    </span>
                  </button>
                </div>
          </>
        )}
      </div>
    </>
  );
};

export default UserDataPage;

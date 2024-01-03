
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
} from "@mui/material";

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
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwt");

    if (!jwtToken) {
      console.error("JWT token not available");
      return;
    }

    fetch(`https://jsgobackend.onrender.com/mainsdata`, {
      // fetch(`https://jsmainsitebackend.onrender.com/mainsdata`, {
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
      })
      .catch((error) => {
        console.error("Error fetching user data:", error.message);
      });
  }, []);

  // console.log(userData);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  if (!userData || !userData.testScores) {
    // If userData or userData.testScores is undefined, you can handle it here
    console.log("returned")
    return null;
  }

  const subjects = Object.keys(userData.testScores[0]).filter(
    (key) => key !== "date" && key !== "type" && key !== "totalMarks"
  );

  return (
    <>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Typography variant="h3">User Data</Typography>

        {userData.testScores.length > 0 && (
          <Tabs value={selectedTab} onChange={handleChangeTab} centered>
            {subjects.map((subject, index) => (
              <Tab key={index} label={subject} />
            ))}
          </Tabs>
        )}

        <TabPanel value={selectedTab} index={selectedTab}>
          <TableContainer component={Paper} style={{ width: "100%" }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Total Marks</TableCell>
                  <TableCell>Marks Scored</TableCell>
                  <TableCell>Silly Error</TableCell>
                  <TableCell>Revision</TableCell>
                  <TableCell>Toughness</TableCell>
                  <TableCell>Theory</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userData.testScores
                  .filter((test) => test[subjects[selectedTab]])
                  .map((test, index) => (
                    <TableRow key={index}>
                      <TableCell>{new Date(test.date).toLocaleDateString("en-GB")}</TableCell>
                      <TableCell>{test.type}</TableCell>
                      <TableCell>{test.totalMarks}</TableCell>
                      <TableCell>{test[subjects[selectedTab]].marksScored}</TableCell>
                      <TableCell>{test[subjects[selectedTab]].sillyError}</TableCell>
                      <TableCell>{test[subjects[selectedTab]].revision}</TableCell>
                      <TableCell>{test[subjects[selectedTab]].toughness}</TableCell>
                      <TableCell>{test[subjects[selectedTab]].theory}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        <SignOutButton />
      </div>
    </>
  );
};

export default UserDataPage;


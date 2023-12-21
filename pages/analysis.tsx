import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import SignOutButton from "@/components/signout";
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

const UserDataPage = () => {
  const { data: session } = useSession();
  const [userData, setUserData] = useState(null);
  const router = useRouter();

  interface UserData {
    date: string;
    type: string;
    totalMarks: number;
    marksScored: number;
    sillyError: number;
    revision: number;
    toughness: number;
    theory: number;
  }

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwt");

    if (!jwtToken) {
      console.error("JWT token not available");
      return;
    }

    fetch(`https://jsmainsitebackend.onrender.com/mainsdata`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        return response.json();
      })
      .then((userData) => {
        setUserData(userData);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error.message);
      });
  }, [session]);
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <Typography variant="h3">User Data</Typography>

      <Box display="flex" justifyContent="space-between">
        <TableContainer
          component={Paper}
          style={{ width: "48%", marginRight: "2%" }}
        >
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Total Marks</TableCell>
                <TableCell>Maths Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(userData) &&
                (userData as UserData[]).map((user: UserData, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{new Date(user.date).toLocaleDateString('en-GB')}</TableCell>
                    <TableCell>{user.type}</TableCell>
                    <TableCell>{user.totalMarks}</TableCell>
                    <TableCell>{user.marksScored}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TableContainer
          component={Paper}
          style={{ width: "48%", marginLeft: "2%" }}
        >
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Silly Error</TableCell>
                <TableCell>Slight Revision</TableCell>
                <TableCell>Toughness</TableCell>
                <TableCell>Theory</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(userData) &&
                (userData as UserData[]).map((user: UserData, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{user.sillyError}</TableCell>
                    <TableCell>{user.revision}</TableCell>
                    <TableCell>{user.toughness}</TableCell>
                    <TableCell>{user.theory}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <SignOutButton />
    </div>
  );
};

export default UserDataPage;

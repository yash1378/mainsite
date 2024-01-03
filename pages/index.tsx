import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Grow from '@mui/material/Grow';
import CircularProgress from '@mui/material/CircularProgress';

const SignIn = () => {
  const router = useRouter();
  const [data, setData] = useState("");
  const [user, setUser] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    // Use Google Sign-In API here
    // Redirect to backend for authentication
    // window.location.href = "https://jsgobackend.onrender.com/api/auth/google";
    // window.location.href = "http://localhost:3001/api/auth/google";
    // setLoading(true);
    // router.push("http://localhost:3001/api/auth/google");
    router.push("https://jsgobackend.onrender.com/api/auth/google");
    // router.push("/tracker");
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setData("");
    router.push("/");
  };

  const handleGetEnrolled = () => {
    if (user) {
      router.push("/getenroll");
    } else {
      router.push({
        pathname: "/tracker",
      });
    }
  };

  const handleGetMarks = () => {
    setLoading(true);
    router.push({
      pathname: "/analysis",
      query: {
        new: "true",
      },
    });
  };

  // const handleClick = () => {

  // };

  useEffect(() => {
    const jwt = Array.isArray(router.query.jwt)
      ? router.query.jwt[0]
      : router.query.jwt;
    const param = Array.isArray(router.query.new)
      ? router.query.new[0]
      : router.query.new;

    if (param === "true") {
      setUser(true);
    }

    if (jwt) {
      localStorage.setItem("jwt", jwt);
      console.log("Received JWT:", jwt);
      setData(jwt);
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 3000);
    }
  }, [router.query]);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      {loading ? (
        <>
        <div style={{ textAlign: "center",marginTop:"40vh" }}>
        <CircularProgress />
        <Typography variant="h6" style={{ marginTop: 16 }}>
          Loading...
        </Typography>
      </div>
      </>
      ):(
        <>
      <Typography variant="h4" gutterBottom>
        Welcome to Your App
      </Typography>
      {data !== "" ? (
        <>
          <Button variant="contained" color="secondary" onClick={handleSignOut}>
            Sign Out
          </Button>
          <br />
          <br />
          <Button
            variant="contained"
            color="secondary"
            onClick={handleGetEnrolled}
          >
            Get Enrolled
          </Button>
          <br />
          <br />
          <Button variant="contained" color="primary" onClick={handleGetMarks}>
            See the Marks
          </Button>
          <Snackbar
            open={open}
            TransitionComponent={Grow}
            autoHideDuration={6000}
            onClose={() => setOpen(false)}
          >
            <MuiAlert severity="success" style={{ width: '100%' }}>
              Logged In Successfully
            </MuiAlert>
          </Snackbar>
        </>
      ) : (
        <Button variant="contained" color="primary" onClick={handleSignIn}>
          Sign In with Google
        </Button>
      )}
        </>
      )}

    </div>
  );
};

export default SignIn;

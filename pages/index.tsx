

// pages/signin.tsx
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Grow from "@mui/material/Grow";
import CircularProgress from "@mui/material/CircularProgress";
import Head from "next/head";
import Typewriter from "../components/Typewriter";

const SignIn = () => {
  const router = useRouter();
  const [data, setData] = useState("");
  const [user, setUser] = useState(false);
  const [open, setOpen] = useState(false);
  const [openlogin, setOpenlogin] = useState(true);

  const [loading, setLoading] = useState(false);
  const [showSecondaryText, setShowSecondaryText] = useState(false);

  const handleSignIn = async () => {
    // Use Google Sign-In API here
    // router.push("http://localhost:3001/api/auth/google");
    // router.push("https://jsgobackend.onrender.com/api/auth/google");
    router.push("https://jsmainsitebackend.onrender.com/api/auth/google");
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
  const [isHovered, setIsHovered] = useState(false);
  const [isHovered1, setIsHovered1] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const [isHovered3, setIsHovered3] = useState(false);

  const buttonStyle = {
    width: "300px", 
    padding: "15px 2rem",
    margin:"10px",
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

  useEffect(() => {
    if(openlogin){
      setTimeout(() => {
        setOpenlogin(false);
      }, 3000);
    }
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

  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        setShowSecondaryText(true);
      }, 1000);
    }
  }, [loading]);

  return (
    <>
      <Head>
        <style>
          {`
          body {
            background-color: ${loading ? "white" : "#000000"};
          }
        `}
        </style>
      </Head>
      <div
        style={{
          textAlign: "center",
          padding: "20px",
          backgroundColor: `${loading ? "white" : "#000000"}`,
          borderRadius: "20px",
          height: "93vh",
        }}
      >
        {loading ? (
          <div style={{ textAlign: "center", marginTop: "40vh" }}>
            <CircularProgress />
            <Typography variant="h6" style={{ marginTop: 16 }}>
              Loading...
            </Typography>
          </div>
        ) : (
          <>
          <div style={{height:'85vh',display:'flex',flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <Typography
              style={{
                fontFamily: "'Graphik', sans-serif",
                color: "white",
                marginTop: "10vh",
              }}
              variant="h1"
              gutterBottom
              color="white"
            >
              <b> Welcome to Your App</b>
            </Typography>
            <div style={{ marginTop: "20px" }}>
              {data !== "" ? (
                <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    gap: "1rem",
                  }}
                >
                  {/* <br /> */}
                  <button
                    onClick={handleGetEnrolled}
                    style={
                      isHovered2
                        ? { ...buttonStyle, ...hoverStyle }
                        : buttonStyle
                    }
                    onMouseEnter={() => setIsHovered2(true)}
                    onMouseLeave={() => setIsHovered2(false)}
                  >
                    <span style={{ fontSize: "20px", display:'flex',alignItems:'center',marginLeft:"3.8rem"}}>
                      <b>Get Enrolled</b>
                    </span>
                  </button>
                  {/* <br /> */}
                  <button
                    onClick={handleGetMarks}
                    style={
                      isHovered3
                        ? { ...buttonStyle, ...hoverStyle }
                        : buttonStyle
                    }
                    onMouseEnter={() => setIsHovered3(true)}
                    onMouseLeave={() => setIsHovered3(false)}
                  >
                    <span style={{ fontSize: "20px",display:'flex',alignItems:'center',marginLeft:"3.2rem" }}>
                      <b>See your Marks</b>
                    </span>
                  </button>
                  </div>
                  <Snackbar
                    open={open}
                    TransitionComponent={Grow}
                    autoHideDuration={6000}
                    onClose={() => setOpen(false)}
                  >
                    <MuiAlert severity="success" style={{ width: "100%" }}>
                      Logged In Successfully
                    </MuiAlert>
                  </Snackbar>
                </>
              ) : (
                <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    gap: "1rem",
                  }}
                >
                  {showSecondaryText && (
                    <Typewriter
                      words={[
                        "We ",
                        "make ",
                        "IIT ",
                        "JEE ",
                        "PREP ",
                        "EASIER ",
                        "FOR ",
                        "YOU ",
                      ]}
                      speed={40}
                    />
                  )}
                  <br/>

                  <button
                    onClick={handleSignIn}
                    style={
                      isHovered
                        ? { ...buttonStyle, ...hoverStyle }
                        : buttonStyle
                    }
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    <img
                      style={{ width: "2.5rem", height: "2.5rem" }}
                      src="https://www.svgrepo.com/show/475656/google-color.svg"
                      loading="lazy"
                      alt="google logo"
                    />
                    <span style={{ fontSize: "20px", marginTop: "10px" }}>
                      Login with Google
                    </span>
                  </button>
                </div>
                  <Snackbar
                  open={openlogin}
                  TransitionComponent={Grow}
                  autoHideDuration={6000}
                  onClose={() => setOpen(false)}
                >
                  <MuiAlert severity="info" style={{ width: "100%" }}>
                    Sign In using the button above
                  </MuiAlert>
                </Snackbar>
                </>
              )}
            </div>
            </div>


          </>
        )}
      </div>
    </>
  );
};

export default SignIn;

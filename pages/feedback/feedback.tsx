import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { Container, Typography, Card, CardContent, Grid, Button, AppBar, Toolbar, IconButton } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward"; // Example icon, you can choose your own


interface MentorCard {
  _id: string;
  photo: string;
  name: string;
  college: string;
  experience: string;
  buttonLabel: string;
  image: string;
}

const MentorChooser: React.FC = () => {
  const router = useRouter();

  const [mentors, setMentors] = useState<MentorCard[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const limit = 6;
  const [isFirstTime, setIsFirstTime] = useState(true);
  const fetchTriggered = useRef(false); // Ref to track whether fetch has been triggered

  const fetchMentors = async () => {
    try {
      // const response = await fetch(
      //   `http://localhost:4000/api/feedbacks?page=${page}&limit=${limit}`
      // );
      const response = await fetch(
        `https://gp-backend-u5ty.onrender.com/api/feedbacks?page=${page}&limit=${limit}`
      );
      const data = await response.json();

      if (data.message === "No more feedbacks to send") {
        setHasMore(false);
        return;
      } else {
        // If there is no data and it's the first time, ignore it
        if (data.length === 0 && isFirstTime) {
          setIsFirstTime(false);
          return;
        }

        // If there is no data and it's not the first time, set hasMore to false to stop fetching
        if (data.length === 0 && !isFirstTime) {
          setHasMore(false);
          return;
        }

        // Update mentors and increment the page
        setMentors((prevMentors) => [...prevMentors, ...data]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (!fetchTriggered.current) {
      console.log("useEffect triggered");
      fetchMentors();
      fetchTriggered.current = true; // Set ref to true after the first fetch
    }
  }, [count]);

  // Scroll event listener to detect whether the user has scrolled to the bottom
  useEffect(() => {
    const handleScroll = () => {
      const isBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;

      if (isBottom) {
        // Update count to trigger fetch
        setCount((prevCount) => prevCount + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Typography variant="h1" style={{ marginLeft: "35%" }}>
        Choose Mentor
      </Typography>
      <br />
      <br />
      <InfiniteScroll
        dataLength={mentors.length}
        next={fetchMentors}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        <Container style={{ overflow: "hidden" }}>
          <Grid container spacing={11}>
            {mentors.map((mentor) => (
              <Grid key={mentor._id} item xs={12} sm={6}>
                <Card style={{ height: "110%", width: "100%" }}>
                  <CardContent
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={mentor.image}
                      alt={mentor.name}
                      style={{
                        width: "30%",
                        height: "30%",
                        marginBottom: "1rem",
                      }}
                    />
                    <div style={{ textAlign: "center" }}>
                      <Typography variant="h4">{mentor.name}</Typography>
                      <Typography variant="h5">{mentor.college}</Typography>
                      <Typography variant="body1" color="textSecondary">
                        Experience: {mentor.experience}
                      </Typography>
                    </div>
                  </CardContent>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ width: "90%", alignContent: "center", marginLeft: "5%" }}
                    onClick={()=>{
                      router.push({
                        pathname: `/mentor/${mentor._id}`,
                        query: {
                          image:mentor.image,
                          name:mentor.name,
                          college:mentor.college,
                        },
                      });
                      
                    }}
                  >
                    View Profile
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </InfiniteScroll>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <AppBar position="fixed" color="primary" style={{ top: "auto",height:'5vh', bottom: 0}}>
        <Toolbar>
          <IconButton color="inherit" onClick={scrollToTop}>
            <ArrowUpwardIcon />
          </IconButton>
          <Typography variant="body1" style={{ flexGrow: 1 }}>
            Click on this arrow to go upwards
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default MentorChooser;

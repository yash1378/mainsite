// pages/leaderboard.js

import { useEffect, useState ,useRef} from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';

type Mentor = {
  id: string; // replace with the actual type of your id property
  name: string;
  college: string;
  enrollments: string;
  rating: string;
  averageTime: string;
  image: string; // Assuming image is a base64 encoded string
  // add other properties as needed
};

const Leaderboard = () => {
    const [mentors, setMentors] = useState<Mentor[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const limit = 3;
    const [isFirstTime, setIsFirstTime] = useState(true);
    const fetchTriggered = useRef(false); // Ref to track whether fetch has been triggered
  
    const fetchMentors = async () => {
      try {
        // const response = await fetch(`http://localhost:4000/api/feedbacks?page=${page}&limit=${limit}`);
        const response = await fetch(`https://gp-backend-u5ty.onrender.com/api/feedbacks?page=${page}&limit=${limit}`);
        const data = await response.json();

        if(data.message === 'No more feedbacks to send'){
            setHasMore(false);
            return;
        }
        else{
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
        console.error('Error fetching data:', error);
      }
    };
  
    useEffect(() => {
      if (!fetchTriggered.current) {
        console.log('useEffect triggered');
        fetchMentors();
        fetchTriggered.current = true; // Set ref to true after first fetch
      }
    }, [count]);
  
    // Scroll event listener to detect whether the user has scrolled to the bottom
    useEffect(() => {
      const handleScroll = () => {
        const isBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight;
  
        if (isBottom) {
          // Update count to trigger fetch
          setCount((prevCount) => prevCount + 1);
        }
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

  return (
    <div>
      <InfiniteScroll
        dataLength={mentors.length}
        next={fetchMentors}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        {mentors.map((mentor) => (
          <Card key={mentor.id} sx={{ minWidth: 275, marginBottom: 2 }}>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                {mentor.name}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                {mentor.college}
              </Typography>
              {/* Add other details like photo, enrollments, rating, average time */}
              {/* You can replace the placeholder text with actual mentor data */}
              <Typography variant="body2">
                Enrollments: {mentor.enrollments}
              </Typography>
              <Typography variant="body2">
                Rating: {mentor.rating}
              </Typography>
              <Typography variant="body2">
                Average Time: {mentor.averageTime}
              </Typography>
              <img src={mentor.image} alt="Mentor" style={{ width: '10%', height: '10%' }} />
              <Button variant="outlined" color="primary">
                See More Reviews
              </Button>
            </CardContent>
          </Card>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default Leaderboard;

import React from 'react';
import {useRouter} from 'next/router';
import { Container, Typography, Card, CardContent, Grid, Button } from '@mui/material';

interface MentorCard {
  photo: string;
  name: string;
  college: string;
  experience: string;
  buttonLabel: string;
}



const MentorChooser: React.FC = () => {

  const router = useRouter();

  const mentors: MentorCard[] = [
    {
      photo: '/1.jpg',
      name: 'Mr X',
      college: 'Example University',
      experience: '5 years',
      buttonLabel: 'Give Review',
    },
    {
      photo: '/2.jpg',
      name: 'Mr Y',
      college: 'Another University',
      experience: '3 years',
      buttonLabel: 'Give Review',
    },
    {
      photo: '/3.jpg',
      name: 'Mr A',
      college: 'Another University',
      experience: '1 year',
      buttonLabel: 'Give Review',
  
    },
    {
      photo: '/4.jpg',
      name: 'Mr B',
      college: 'Another University',
      experience: '6 years',
      buttonLabel: 'Give Review',
  
    },
    {
      photo: '/1.jpg',
      name: 'Mr X',
      college: 'Example University',
      experience: '5 years',
      buttonLabel: 'Give Review',
  
    },
    {
      photo: '/2.jpg',
      name: 'Mr Y',
      college: 'Another University',
      experience: '3 years',
      buttonLabel: 'Give Review',
  
    },
    {
      photo: '/3.jpg',
      name: 'Mr A',
      college: 'Another University',
      experience: '1 year',
      buttonLabel: 'Give Review',
    },
    {
      photo: '/4.jpg',
      name: 'Mr B',
      college: 'Another University',
      experience: '6 years',
      buttonLabel: 'Give Review',
    },
    {
      photo: '/1.jpg',
      name: 'Mr X',
      college: 'Example University',
      experience: '5 years',
      buttonLabel: 'Give Review',
    },
    {
      photo: '/2.jpg',
      name: 'Mr Y',
      college: 'Another University',
      experience: '3 years',
      buttonLabel: 'Give Review',
    },
    {
      photo: '/3.jpg',
      name: 'Mr A',
      college: 'Another University',
      experience: '1 year',
      buttonLabel: 'Give Review',
    },
    {
      photo: '/4.jpg',
      name: 'Mr B',
      college: 'Another University',
      experience: '6 years',
      buttonLabel: 'Give Review',
    },
    {
      photo: '/1.jpg',
      name: 'Mr X',
      college: 'Example University',
      experience: '5 years',
      buttonLabel: 'Give Review',
    },
    {
      photo: '/2.jpg',
      name: 'Mr Y',
      college: 'Another University',
      experience: '3 years',
      buttonLabel: 'Give Review',
    },
    {
      photo: '/3.jpg',
      name: 'Mr A',
      college: 'Another University',
      experience: '1 year',
      buttonLabel: 'Give Review',
    },
    {
      photo: '/4.jpg',
      name: 'Mr B',
      college: 'Another University',
      experience: '6 years',
      buttonLabel: 'Give Review',
    },
    // Add more mentors as needed
  ];
  
  return (
    <>
      <div style={{marginLeft: "0px", width: "99vw" }}>
        <Container style={{ maxWidth: 'none', width: "90%" }}>
          <Typography variant="h2" gutterBottom style={{textAlign:"center"}}>
            Choose Mentor
          </Typography>
          <Grid container spacing={7}>
            {mentors.map((mentor, index) => (
              <Grid key={index} item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <span style={{display:"flex"}}>
                    <img src={mentor.photo} alt={mentor.name} style={{ width: '150px', height: '18vh',marginRight:"1vw" }} />
                    <span style={{width:"9vw",textAlign:"center",display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
                    <Typography variant="h4">{mentor.name}</Typography>
                    <Typography variant="body1">{mentor.college}</Typography>
                    <Typography variant="body1" color="textSecondary">
                      Experience: {mentor.experience}
                    </Typography>
                    </span>
                    </span>
                    <br />
                    <Button variant="contained" color="primary" onClick={()=>router.push(`/mentor/${index}`)} style={{width:"100%"}}>
                      {mentor.buttonLabel}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    </>
  );
};

export default MentorChooser;

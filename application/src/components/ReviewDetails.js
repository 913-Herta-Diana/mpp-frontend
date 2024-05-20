import { Button, Card, CardContent, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const ReviewDetails = () => {
    const {id} = useParams();
    const [review, setReview] = useState({});

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`http://localhost:5000/reviews/${id}`);
            setReview(response.data);
          } catch (error) {
            console.error("Error fetching flower:", error);
          }
        };
        fetchData();
  }, [id]  );
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card variant="outlined" style={{ width: '400px', padding: '20px' }}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            Flower Details
          </Typography>
          <div>ID: {id}</div>;
          <Typography variant="body1" gutterBottom>
            <strong>Reviewer:</strong> {review.reviewer}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Rating:</strong> {review.rating}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Text:</strong> {review.text}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Date:</strong> {review.date}
          </Typography>
          <Link to="/">
            <Button variant="outlined" color="primary">Back</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewDetails;
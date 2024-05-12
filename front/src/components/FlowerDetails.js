import { Button, Card, CardContent, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
const FlowerDetails = () => {
  const { id } = useParams();
  const [flower, setFlower] = useState({});
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState('');
  const [showReviews, setShowReviews] = useState(false); // State to control visibility of reviews
  const [editingReviewId, setEditingReviewId] = useState(null); // Track the ID of the review being edited
  const [editedReviewText, setEditedReviewText] = useState('');
  const [editedReviewRating, setEditedReviewRating] = useState('');
  useEffect(() => {
    const fetchFlower = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/flowers/${id}`);
        setFlower(response.data);
        setReviews(response.data.reviews || []); // Initialize with empty array if no reviews
      } catch (error) {
        console.error('Error fetching flower:', error);
      }
    };

    fetchFlower();
  }, [id]);
  const handleViewReviews = async () => {
    try {
      if (showReviews) {
        // If reviews are currently shown, hide them
        setShowReviews(false);
        setReviews([]); // Clear reviews when hiding
      } else {
        // Otherwise, fetch and display reviews
        const response = await axios.get(`http://localhost:5000/reviews/${id}`);
        setReviews(response.data);
        setShowReviews(true);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };
  

  const handleAddReview = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/reviews/${id}`, {
        reviewer: 'Anonymous', // Set reviewer (you can implement user authentication here)
        rating: reviewRating,
        text: reviewText,
        date: new Date().toISOString()
      });
      setReviewText('');
      setReviewRating('');
      // Update the local reviews state with the newly added review
      setReviews([...reviews, response.data]);
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/reviews/${id}/${reviewId}`);
      if (response.status === 200) {
        setReviews(reviews.filter((review) => review.reviewId !== reviewId)); // Filter by reviewId
      }
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };
  
  const handleUpdateReview = async (reviewId) => {
    try {
      await axios.put(`http://localhost:5000/reviews/${id}/${reviewId}`, {
        rating: editedReviewRating,
        text: editedReviewText
      });
      // Update the local reviews state with the edited review
      const updatedReviews = reviews.map((review) => {
        if (review.reviewId === reviewId) {
          return { ...review, rating: editedReviewRating, text: editedReviewText };
        }
        return review;
      });
      setReviews(updatedReviews);
      // Clear the editing state
      setEditingReviewId(null);
      setEditedReviewText('');
      setEditedReviewRating('');
    } catch (error) {
      console.error('Error updating review:', error);
    }
  };
  

  const renderReviewForm = (review) => {
    return (
      <div key={review._id}>
        <TextField
          label="Rating (1-5)"
          type="number"
          value={editedReviewRating}
          onChange={(e) => setEditedReviewRating(e.target.value)}
          InputProps={{ inputProps: { min: 1, max: 5 } }}
          fullWidth
        />
        <TextField
          label="Review Text"
          value={editedReviewText}
          onChange={(e) => setEditedReviewText(e.target.value)}
          multiline
          rows={4}
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={() => handleUpdateReview(review._id)}>
          Save
        </Button>
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card variant="outlined" style={{ width: '400px', padding: '20px' }}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            Flower Details
          </Typography>
          <div>ID: {id}</div>
          <Typography variant="body1" gutterBottom>
            <strong>Name:</strong> {flower.name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Uses:</strong> {flower.uses}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Bloom Month:</strong> {flower.bloomMonth}
          </Typography>
          <Button variant="outlined" color="primary" onClick={handleViewReviews}>
            View Reviews
          </Button>
          {showReviews && reviews.length > 0 && (
            <div style={{ marginTop: '20px' }}>
              <Typography variant="h6">Reviews:</Typography>
              {reviews.map((review) => (
                <div key={review._id}>
                  <Typography variant="body1">
                    <strong>Reviewer:</strong> {review.reviewer}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Rating:</strong> {review.rating}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Text:</strong> {review.text}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Date:</strong> {new Date(review.date).toLocaleDateString()}
                  </Typography>
                  {editingReviewId === review._id ? (
                    renderReviewForm(review)
                  ) : (
                    <div>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleDeleteReview(review._id)}
                        style={{ marginTop: '5px' }}
                      >
                        Delete
                      </Button>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => {
                          setEditingReviewId(review._id);
                          setEditedReviewText(review.text);
                          setEditedReviewRating(review.rating);
                        }}
                        style={{ marginTop: '5px', marginLeft: '10px' }}
                      >
                        Update
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          <div style={{ marginTop: '20px' }}>
            <Typography variant="h6">Add a Review:</Typography>
            <TextField
              label="Rating (1-5)"
              type="number"
              value={reviewRating}
              onChange={(e) => setReviewRating(e.target.value)}
              InputProps={{ inputProps: { min: 1, max: 5 } }}
              fullWidth
            />
            <TextField
              label="Review Text"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              multiline
              rows={4}
              fullWidth
            />
            <Button variant="contained" color="primary" onClick={handleAddReview} style={{ marginTop: '10px' }}>
              Add Review
            </Button>
          </div>
          <Link to="/">
            <Button variant="outlined" color="primary" style={{ marginTop: '20px' }}>
              Back
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default FlowerDetails;

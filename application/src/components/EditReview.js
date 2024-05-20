import { Button, TextField } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ReviewServiceContext } from '../App';

const EditReviewForm = () => {
  const { id } = useParams();
  const [review, setReview] = useState(null); // Initialize as null
  const [reviewer, setReviewer] = useState('');
  const [rating, setRating] = useState('');
  const [text, setText] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate();
  const reviewService = useContext(ReviewServiceContext);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedReview = await reviewService.getReviewById(id);
        console.log("Fetched review: ", fetchedReview);

        if (fetchedReview) {
          setReview(fetchedReview);
          setReviewer(fetchedReview.reviewer || ''); // Set name to fetched review's name (or empty string if null)
          setRating(fetchedReview.rating || ''); // Set uses to fetched review's uses (or empty string if null)
          setText(fetchedReview.text || ''); // Set bloomMonth to fetched review's bloomMonth (or empty string if null)
          setDate(fetchedReview.date || '');
        }
      } catch (error) {
        console.error('Error fetching review:', error);
        // Handle error (e.g., show error message)
      }
    };

    fetchData();

    return () => {
    };
  }, [reviewService, id]); // Depend on reviewService and id
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if name, uses, and bloomMonth are not empty
    if (!reviewer || !rating || !text  || !date) {
      alert('Please fill out all fields');
      return;
    }

    const updatedReview = { ...review, name: reviewer, uses: rating, bloomMonth: text };

    try {
      await reviewService.updateReview(updatedReview);
      navigate('/');
    } catch (error) {
      console.error('Error updating review:', error);
      // Handle error (e.g., show error message)
    }
  };
  // Inside EditReviewForm component


  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form onSubmit={handleSubmit} style={{ width: '300px' }}>
        <TextField label="Reviewer" value={reviewer} onChange={(e) => setReviewer(e.target.value)} fullWidth />
        <TextField label="Rating" value={rating} onChange={(e) => setRating(e.target.value)} fullWidth />
        <TextField label="Text" value={text} onChange={(e) => setText(e.target.value)} fullWidth />
        <TextField label="Date" value={date} onChange={(e) => setDate(e.target.value)} fullWidth />
        <Button label ="Update Review" type="submit" variant="contained" color="primary" fullWidth>Update Review</Button>
      </form>
    </div>
  );
};

export default EditReviewForm;

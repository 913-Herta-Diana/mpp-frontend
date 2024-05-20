import { Button, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReviewServiceContext } from "../App";

const AddReviewForm = () => {
    const [reviewer, setReviewer] = useState('');
    const [rating, setRating] = useState('');
    const [text, setText] = useState('');
    const [date, setDate] = useState('');
    const navigate = useNavigate();
  
    // Access review service from context
    const reviewService = useContext(ReviewServiceContext);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const newReview = { reviewer, rating, text, date };
      reviewService.addReview(newReview);

      navigate('/');
    };
  console.log('Rendering');
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <form onSubmit={handleSubmit} style={{ width: '300px' }}>
        <TextField label="Reviewer" value={reviewer} onChange={(e) => setReviewer(e.target.value)} fullWidth />
        <TextField label="Rating" value={rating} onChange={(e) => setRating(e.target.value)} fullWidth />
        <TextField label="Text" value={text} onChange={(e) => setText(e.target.value)} fullWidth />
        <TextField label="Date" value={date} onChange={(e) => setDate(e.target.value)} fullWidth />
          <Button type="submit" variant="contained" color="primary" fullWidth>Add Review</Button>
        </form>
      </div>
    );
  };
  
  export default AddReviewForm;
  
import { Button, Table, TableBody, TableCell, TableHead, TablePagination, TableRow } from "@mui/material";
import axios from 'axios';
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FlowerServiceContext } from "../App";

const ReviewList = () => {
  const reviewService = useContext(FlowerServiceContext);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [originalReviews, setOriginalReviews] = useState([]);
  const [serverIsDown, setServerIsDone] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        
        const response = await axios.get('http://localhost:5000/reviews'); // Fetch reviews from server
        setReviews(response.data);
        setOriginalReviews(response.data);
        
      } catch (error) {
        setServerIsDone(true);
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const handleDelete = async (id) => {

    
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        await reviewService.deleteReview(id);
        setReviews((prevReviews) => prevReviews.filter((review) => review.id !== id));
      } catch (error) {
        console.error("Error deleting review:", error);
      }
    }
  };

  const handleSortByName = () => {
    const sortedReviews = [...reviews].sort((a, b) => a.name.localeCompare(b.name));
    setReviews(sortedReviews);
  };

  const handleResetSort = () => {
    setReviews(originalReviews);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  return (
    !serverIsDown?
    (<div>
      <h1>All Reviews</h1>
      <Button onClick={handleSortByName}>Sort by Name</Button>
      <Button onClick={handleResetSort}>Reset Sort</Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reviews.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((review) => (
            <TableRow key={review.id}>
              <TableCell>{review.name}</TableCell>
              <TableCell>
                <Button component={Link} to={`/review/details/${review.id}`} variant="contained" color="primary">
                  View
                </Button>
                <Button onClick={() => handleDelete(review.id)} variant="contained" color="secondary">
                  Delete
                </Button>
                <div>
              <span>Name: {review.name}</span>
              <span>Uses: {review.uses}</span>
              <Link to={`/review/edit/${review.id}`}>
                <button>Edit</button>
              </Link>
            </div>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={reviews.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  ):<p>Server is Down!!</p>)
};

export default ReviewList;
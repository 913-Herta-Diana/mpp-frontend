import { Button, Table, TableBody, TableCell, TableHead, TablePagination, TableRow } from "@mui/material";
import axios from 'axios';
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FlowerServiceContext } from "../App";

const FlowerList = () => {
  const flowerService = useContext(FlowerServiceContext);
  const [flowers, setFlowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [originalFlowers, setOriginalFlowers] = useState([]);
  const [serverIsDown, setServerIsDone] = useState(false);

  useEffect(() => {
    const fetchFlowers = async () => {
      try {
        
        const response = await axios.get('http://localhost:5000/flowers'); // Fetch flowers from server
        setFlowers(response.data);
        setOriginalFlowers(response.data);
        
      } catch (error) {
        setServerIsDone(true);
        console.error('Error fetching flowers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlowers();
  }, []);

  const handleDelete = async (id) => {

    
    if (window.confirm("Are you sure you want to delete this flower?")) {
      try {
        await flowerService.deleteFlower(id);
        setFlowers((prevFlowers) => prevFlowers.filter((flower) => flower.id !== id));
      } catch (error) {
        console.error("Error deleting flower:", error);
      }
    }
  };

  const handleSortByName = () => {
    const sortedFlowers = [...flowers].sort((a, b) => a.name.localeCompare(b.name));
    setFlowers(sortedFlowers);
  };

  const handleResetSort = () => {
    setFlowers(originalFlowers);
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
      <h1>All Flowers</h1>
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
          {flowers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((flower) => (
            <TableRow key={flower.id}>
              <TableCell>{flower.name}</TableCell>
              <TableCell>
                <Button component={Link} to={`/flower/details/${flower.id}`} variant="contained" color="primary">
                  View
                </Button>
                <Button onClick={() => handleDelete(flower.id)} variant="contained" color="secondary">
                  Delete
                </Button>
                <Button component={Link} to={`/flower/edit/${flower.id}`} variant="outlined" color="primary">
        Edit
      </Button>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={flowers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  ):<p>Server is Down!!</p>)
};

export default FlowerList;

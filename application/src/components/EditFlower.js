import { Button, TextField } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FlowerServiceContext } from '../App';

const EditFlowerForm = () => {
  const { id } = useParams();
  const [flower, setFlower] = useState(null); // Initialize as null
  const [name, setName] = useState('');
  const [uses, setUses] = useState('');
  const [bloomMonth, setBloomMonth] = useState('');
  const navigate = useNavigate();
  const flowerService = useContext(FlowerServiceContext);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedFlower = await flowerService.getFlowerById(id);
        console.log("Fetched flower: ", fetchedFlower);

        if (fetchedFlower) {
          setFlower(fetchedFlower);
          setName(fetchedFlower.name || ''); // Set name to fetched flower's name (or empty string if null)
          setUses(fetchedFlower.uses || ''); // Set uses to fetched flower's uses (or empty string if null)
          setBloomMonth(fetchedFlower.bloomMonth || ''); // Set bloomMonth to fetched flower's bloomMonth (or empty string if null)
        }
      } catch (error) {
        console.error('Error fetching flower:', error);
        // Handle error (e.g., show error message)
      }
    };

    fetchData();

    return () => {
    };
  }, [flowerService, id]); // Depend on flowerService and id
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if name, uses, and bloomMonth are not empty
    if (!name || !uses || !bloomMonth) {
      alert('Please fill out all fields');
      return;
    }

    const updatedFlower = { ...flower, name, uses, bloomMonth };

    try {
      await flowerService.updateFlower(updatedFlower);
      navigate('/');
    } catch (error) {
      console.error('Error updating flower:', error);
      // Handle error (e.g., show error message)
    }
  };
  // Inside EditFlowerForm component


  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form onSubmit={handleSubmit} style={{ width: '300px' }}>
        <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
        <TextField label="Uses" value={uses} onChange={(e) => setUses(e.target.value)} fullWidth />
        <TextField label="Bloom Month" value={bloomMonth} onChange={(e) => setBloomMonth(e.target.value)} fullWidth />
        <Button label ="Update Flower" type="submit" variant="contained" color="primary" fullWidth>Update Flower</Button>
      </form>
    </div>
  );
};

export default EditFlowerForm;

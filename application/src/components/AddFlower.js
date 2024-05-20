import { Button, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FlowerServiceContext } from "../App";

const AddFlowerForm = () => {
    const [name, setName] = useState('');
    const [uses, setUses] = useState('');
    const [bloomMonth, setBloomMonth] = useState('');
    const navigate = useNavigate();
  
    // Access flower service from context
    const flowerService = useContext(FlowerServiceContext);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const newFlower = { name, uses, bloomMonth };
      flowerService.addFlower(newFlower);

      navigate('/');
    };
  console.log('Rendering');
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <form onSubmit={handleSubmit} style={{ width: '300px' }}>
          <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
          <TextField label="Uses" value={uses} onChange={(e) => setUses(e.target.value)} fullWidth />
          <TextField label="Bloom Month" value={bloomMonth} onChange={(e) => setBloomMonth(e.target.value)} fullWidth />
          <Button type="submit" variant="contained" color="primary" fullWidth>Add Flower</Button>
        </form>
      </div>
    );
  };
  
  export default AddFlowerForm;
  
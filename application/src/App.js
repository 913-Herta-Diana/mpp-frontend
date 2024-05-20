import { Button } from "@mui/material";
import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import './App.css';
import AddFlowerForm from "./components/AddFlower";
import EditFlowerForm from "./components/EditFlower";
import FlowerDetails from "./components/FlowerDetails";
import FlowerList from "./components/FlowerList";
import FlowerPieChart from "./components/FlowerPieChart";
import ReviewList from "./components/ReviewList";
import flowerService from "./services/flowerService";

export const FlowerServiceContext=React.createContext();
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <FlowerServiceContext.Provider value={flowerService}>
    
      <div style={{ maxWidth: 300, margin: 'auto' }}>
      <Button component={Link} to="/flower/add" variant="contained" color="primary" style={{ width: '100%', marginBottom: '10px' }}>
        Add Flower
      </Button>
      <Button component={Link} to="/charts" variant="contained" color="primary" style={{ width: '100%' }}>
        Charts
      </Button>
    </div>

      <Routes>
        <Route path="/" element={<FlowerList/>}/>
        <Route path="/reviews/:id" element={<ReviewList/>} />
        <Route path="/charts" element={<FlowerPieChart/>} />
        <Route path="/flower/add" element={<AddFlowerForm/>} />
        <Route path="/flower/edit/:id" element={<EditFlowerForm/>} />
        <Route path="/flower/details/:id" element={<FlowerDetails/>} />
      </Routes>
      </FlowerServiceContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;

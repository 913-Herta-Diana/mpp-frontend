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
    
      <Button component={Link} to="/flower/add" variant="contained" color="primary" fullWidth>
      Add Flower
    </Button>
    <Button component={Link} to="/charts" variant="contained" color="primary" fullWidth>
      Charts
    </Button>
    <Button component={Link} to="/reviews/e8b849bb-a0c9-4ace-b5ef-4067c3da9c8d" variant="contained" color="primary" fullWidth>
      Reviews
    </Button>

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

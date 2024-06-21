import React from "react";
import './index.css'
import Header from "./components/Header";
import Home from "./components/Home";
import ViewAll from "./pages/ViewAll";
import { Routes, Route } from "react-router-dom";
import AddBill from "./pages/AddBill";
import AddDriverReport from "./pages/AddDriverReport";
import ViewDriverReport from "./pages/ViewDriverReport";

function App() {
  return (
    <div className="">
      <Header />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/view" element={<ViewAll/>} />
          <Route path="/add" element={<AddBill/>} />
          <Route path="/adddrv" element={<AddDriverReport/>} />
          
          <Route path="/viewdrvreport" element={<ViewDriverReport/>} />
      </Routes>
    </div>

  );
}

export default App;

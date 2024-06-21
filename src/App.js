import React from "react";
import './index.css'
import Header from "./components/Header";
import Home from "./components/Home";
import ViewAll from "./pages/ViewAll";
import { Routes, Route } from "react-router-dom";
import AddBill from "./pages/AddBill";

function App() {
  return (
    <div className="">
      <Header />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/view" element={<ViewAll/>} />
          <Route path="/add" element={<AddBill/>} />
      </Routes>
    </div>

  );
}

export default App;

import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './index.css';
import Header from "./components/Header";
import Home from "./components/Home";
import ViewAll from "./pages/ViewAll";
import AddBill from "./pages/AddBill";
import AddDriverReport from "./pages/AddDriverReport";
import ViewDriverReport from "./pages/ViewDriverReport";
import BillDetail from "./pages/BillDetail";

function App() {
  return (
    <div className="">
      <Header />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/view" element={<ViewAll />} />
        <Route path="/view/:id" element={<BillDetail />} />
        <Route path="/add" element={<AddBill />} />
        <Route path="/adddrv" element={<AddDriverReport />} />
        <Route path="/viewdrvreport" element={<ViewDriverReport />} />
      </Routes>
    </div>
  );
}

export default App;

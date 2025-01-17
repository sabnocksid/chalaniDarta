import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/home/UI/Sidebar";
import Navbar from "./components/home/UI/Navbar";
import Header from "./components/home/UI/Header";
import Home from "./components/Home";
import Documents from "./components/home/Documents";
import Chalani from "./components/home/Chalani";
import CreateChalaniForm from "./components/Chalanis/createChalani";
import Darta from "./components/home/Darta";
import Search from "./components/home/search";
import AddDarta from "./components/Dartas/createDarta";
import DartaRemove from "./components/Dartas/removeDarta";
import LogIn from "./components/login";

import "./app.css";

function App() {
  const location = useLocation();

  const standAloneRoutes = ["/login"];
  const isStandAlone = standAloneRoutes.includes(location.pathname);

  return (
    <div className="App">
      {!isStandAlone ? (
        <div className="flex md:flex-row flex-col">
          <div className="md:w-1/5 w-full">
            <Sidebar />
          </div>

          <div className="w-full md:w-4/5">
            <div className="topSection w-full">
              <Navbar />
              <Header />
              <main className="px-4 md:px-8 py-4">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/documents" element={<Documents />} />
                  <Route path="/chalani" element={<Chalani />} />
                  <Route path="/addChalani" element={<CreateChalaniForm />} />
                  <Route path="/darta" element={<Darta />} />
                  <Route path="/addDarta" element={<AddDarta />} />
                  <Route path="/removeDarta/:id" element={<DartaRemove />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/allDartaPapers" element={<Home />} />
                </Routes>
              </main>
            </div>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<LogIn />} />
        </Routes>
      )}
    </div>
  );
}

export default App;

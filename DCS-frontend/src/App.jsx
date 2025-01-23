import React, { useEffect } from "react";
import { Routes, Route, useLocation, Navigate, useNavigate } from "react-router-dom";
import Sidebar from "./components/home/UI/Sidebar";
import Navbar from "./components/home/UI/Navbar";
import Header from "./components/home/UI/Header";
import Home from "./components/Home";
import DartaChalani from "./components/home/Documents";
import Chalani from "./components/home/Chalani";
import CreateChalaniForm from "./components/Chalanis/createChalani";
import Darta from "./components/home/Darta";
import Search from "./components/home/search";
import AddDarta from "./components/Dartas/createDarta";
import DartaRemove from "./components/Dartas/removeDarta";
import RemoveChalani from "./components/Chalanis/removeChalani";
import LogIn from "./components/Login/login";
import AddSenderForm from "./components/Sender/AddSender";
import FiscalYearDarta from "./components/FiscalYear/filterFiscalYear";
import FilterDocumentType from "./components/DocumentType/filterDocumentType";
import FilterDepartmentType from "./components/Department/filterDepartmentType";
import FilterOfficeType from "./components/Office/FilterOffice";
import Logout from "./components/home/Logout";

import "./app.css";

const ProtectedRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem("token") !== null;
  return isAuthenticated ? element : <Navigate to="/login" />;
};

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("token") !== null;

  const standAloneRoutes = ["/login"];
  const isStandAlone = standAloneRoutes.includes(location.pathname);

  useEffect(() => {
    if (isAuthenticated && location.pathname === "/login") {
      navigate("/dashboard");
    }
  }, [isAuthenticated, location, navigate]);

  return (
    <div className="App">
      {!isStandAlone ? (
        isAuthenticated ? (
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
                    <Route path="/dashboard" element={<ProtectedRoute element={<Home />} />} />
                    <Route path="/documents" element={<ProtectedRoute element={<DartaChalani />} />} />
                    <Route path="/chalani" element={<ProtectedRoute element={<Chalani />} />} />
                    <Route path="/addChalani" element={<ProtectedRoute element={<CreateChalaniForm />} />} />
                    <Route path="/darta" element={<ProtectedRoute element={<Darta />} />} />
                    <Route path="/addDarta" element={<ProtectedRoute element={<AddDarta />} />} />
                    <Route path="/removeDarta/:id" element={<ProtectedRoute element={<DartaRemove />} />} />
                    <Route path="/deleteChalani/:id" element={<ProtectedRoute element={<RemoveChalani />} />} />
                    <Route path="/search" element={<ProtectedRoute element={<Search />} />} />
                    <Route path="/allDartaPapers" element={<ProtectedRoute element={<Home />} />} />
                    <Route path="/addSender" element={<ProtectedRoute element={<AddSenderForm />} />} />
                    <Route path="/fiscalYear" element={<ProtectedRoute element={<FiscalYearDarta />} />} />
                    <Route path="/documentType" element={<ProtectedRoute element={<FilterDocumentType />} />} />
                    <Route path="/department" element={<ProtectedRoute element={<FilterDepartmentType />} />} />
                    <Route path="/office" element={<ProtectedRoute element={<FilterOfficeType />} />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="*" element={<Navigate to="/dashboard" />} />
                  </Routes>
                </main>
              </div>
            </div>
          </div>
        ) : (
          <Navigate to="/login" replace />
        )
      ) : (
        <Routes>
          <Route path="/login" element={<LogIn />} />
        </Routes>
      )}
    </div>
  );
}

export default App;

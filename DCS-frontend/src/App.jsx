import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/home/UI/Sidebar';
import Navbar from './components/home/UI/Navbar';
import Header from './components/home/UI/Header';
import Home from './components/Home'
import Documents from './components/home/Documents';
import Chalani from './components/home/Chalani';
import Darta from './components/home/Darta';
import Search from './components/home/search';
import AddDarta from './components/Dartas/createDarta';
import DartaRemove from './components/Dartas/removeDarta';
// import allDartaPapers from './components/home/allDartaPapers';

import './app.css';

function App() {
  return (
    <div className="App">
      <div className="Top flex">
        <Sidebar />
        <div className="topSection block w-4/5">
           <Navbar />
          <Header /> 
          <main>
             <Routes>
                 <Route path="/" element={<div className='MainContainer'><Home/></div>} />
                 <Route path="/documents" element={<div className='MainContainer'><Documents/></div>} />
                 <Route path="/chalani" element={<div className='MainContainer'><Chalani/></div>} />
                 <Route path="/darta" element={<div className='MainContainer'><Darta/></div>} />
                 <Route path="/addDarta" element={<div className='MainContainer'><AddDarta /></div>} />
                 <Route path="/removeDarta/:id" element={<div className='MainContainer'><DartaRemove/></div>} />
                 <Route path="/search" element={<div className='MainContainer'><Search/></div>} />
                 <Route path="/allDartaPapers" element={<div className='MainContainer'><allDartaPapers/></div>} />
             </Routes>
         </main>
        </div>
      </div>

    </div>
  );
}

export default App;

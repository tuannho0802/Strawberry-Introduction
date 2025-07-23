import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import StrawberryList from './components/StrawberryList';
import StrawberryDetail from './components/StrawberryDetail';
import Contact from './components/Contact';
import Login from './components/Login';
import Register from './components/Register';
import EditStrawberry from './components/EditStrawberry';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/strawberries" element={<StrawberryList />} />
            <Route path="/strawberries/:id" element={<StrawberryDetail />} />
            <Route path="/strawberries/edit/:id" element={<EditStrawberry />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;

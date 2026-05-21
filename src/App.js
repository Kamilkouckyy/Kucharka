import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ReceptDetail from './pages/ReceptDetail';
import ReceptForm from './pages/ReceptForm';
import Suroviny from './pages/Suroviny';
 
export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recepty/novy" element={<ReceptForm />} />
        <Route path="/recepty/:id" element={<ReceptDetail />} />
        <Route path="/recepty/:id/upravit" element={<ReceptForm />} />
        <Route path="/suroviny" element={<Suroviny />} />
      </Routes>
    </BrowserRouter>
  );
}
 
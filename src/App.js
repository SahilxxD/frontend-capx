import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import StoicexDashboard from './page/DashboardPage';
import PortfolioPage from './page/PortfolioPage';
import Navbar from './navbar/Navbar';
import NavbarMobile from './navbar/NavbarMobile';
import HistoryPage from './page/HistoryPage';

function App() {
  return (
    <Router>
      <div className="bg-black text-white w-full h-full space-y-6 pb-16 md:pb-0">
        <Navbar />
        <Routes>
          <Route path="/" element={<StoicexDashboard />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
        <div className='md:hidden'>
          <NavbarMobile />
        </div>
      </div>
    </Router>
  );
}

export default App;

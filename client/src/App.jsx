import { Route, Routes } from 'react-router-dom';

import './App.css';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import AdminPage from './pages/AdminPage';
import AdoptionPage from './pages/AdoptionPage';
import AnimalsList from './pages/AnimalsList';
import ApplicationPage from './pages/ApplicationPage';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import styles from './styles';

function App() {
  return (
    <div className="bg-[#f8f8f8] w-full overflow-hidden">
      <div className={`${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <NavBar />
        </div>
      </div>
      <div className="min-h-screen">
        <div className={`${styles.flexStart}`}>
          <div className={`${styles.boxWidth}`}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<AdminPage />} />
              <Route path="/animals/:id" element={<AdoptionPage />} />
              <Route path="/animals/" element={<AnimalsList />} />
              <Route path="/application/:id" element={<ApplicationPage />} />
            </Routes>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;

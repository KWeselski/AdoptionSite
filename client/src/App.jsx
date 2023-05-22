import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import './App.css';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import ErrorAlert from './components/ErrorAlert';
import AdminPage from './pages/AdminPage';
import AdoptionPage from './pages/AdoptionPage';
import AnimalsList from './pages/AnimalsList';
import ApplicationPage from './pages/ApplicationPage';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import UserPage from './pages/UserPage';
import styles from './styles';
import authRequest from './utils/authRequest';
import { setError } from './redux/actions/errors';

const ProtectedRoute = ({ adminComponent, userComponent }) => {
  const [isSuperUser, setIsSuperUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const CheckAuth = async () => {
      try {
        const response = await authRequest.get('/api/auth/me');
        if (response.data && response.data.isSuperUser) {
          setIsSuperUser(true);
        }
      } catch (error) {
        setError(error.response.data.error);
      }
      setLoading(false);
    };
    CheckAuth();
  }, []);

  if (loading) {
    return null;
  }
  if (token) {
    return isSuperUser ? adminComponent : userComponent;
  } else {
    return <Navigate to="/login" />;
  }
};

function App() {
  return (
    <div className="bg-[#f8f8f8] w-full overflow-hidden">
      <div className={`${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <NavBar />
        </div>
      </div>
      <ErrorAlert/>
      <div className="min-h-screen">
        <div className={`${styles.flexStart}`}>
          <div className={`${styles.boxWidth}`}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute
                    adminComponent={<AdminPage />}
                    userComponent={<UserPage />}
                  />
                }
              />
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

import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import styles from "./styles";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdoptionPage from "./pages/AdoptionPage";
import AnimalsList from "./pages/AnimalsList";
import AdminPage from "./pages/AdminPage";

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
            </Routes>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;

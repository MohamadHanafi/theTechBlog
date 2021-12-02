import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import BackToTop from "./components/BackToTop";
import Blogs from "./components/Blogs";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import HomeScreen from "./screens/HomeScreen";

function App() {
  return (
    <Router>
      <Header />
      <BackToTop />
      <main className="App">
        <Routes>
          <Route exact path="/" element={<HomeScreen />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;

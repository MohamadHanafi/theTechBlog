import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import BackToTop from "./components/BackToTop";
import Blogs from "./components/Blogs";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import HomeScreen from "./screens/HomeScreen";
import BlogScreen from "./screens/BlogScreen";
import SignInScreen from "./screens/SignInScreen";

function App() {
  return (
    <Router>
      <Header />
      <BackToTop />
      <main className="App" style={{ minHeight: "80vh" }}>
        <Routes>
          <Route exact path="/" element={<HomeScreen />} />
          <Route path="/blogs/:id" element={<BlogScreen />} />
          <Route path="/signin" element={<SignInScreen />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;

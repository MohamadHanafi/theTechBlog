import "./App.css";
import BackToTop from "./components/BackToTop";
import Blogs from "./components/Blogs";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";

function App() {
  return (
    <div className="App">
      <BackToTop />
      <Header />
      <Hero />
      <Blogs />
      <Footer />
    </div>
  );
}

export default App;

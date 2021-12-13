import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./bootstrap.min.css";
import "./App.css";

import BackToTop from "./components/BackToTop";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import BlogScreen from "./screens/BlogScreen";
import SignInScreen from "./screens/SignInScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RegisterScreen from "./screens/RegisterScreen";
import NewBlogScreen from "./screens/NewBlogScreen";
import UserListScreen from "./screens/UserListScreen";
import BookmarksScreen from "./screens/BookmarksScreen";
import EditBlogScreen from "./screens/EditBlogScreen";

function App() {
  return (
    <Router>
      <Header />

      <main className="App">
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <HomeScreen />
                <BackToTop />
              </>
            }
          />
          <Route path="/bookmarks" element={<BookmarksScreen />} />
          <Route path="/blogs/new" element={<NewBlogScreen />} />
          <Route path="/blogs/:slug" element={<BlogScreen />} />
          <Route path="/blogs/:slug/edit" element={<EditBlogScreen />} />
          <Route path="/login" element={<SignInScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/admin/users" element={<UserListScreen />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;

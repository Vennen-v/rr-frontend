import {
  BrowserRouter as Router,
  // Switch,
  Route,
  Link,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home";
import Sidebar from "./components/Sidebar";
import ProfilePage from "./pages/ProfilePage";
import PostPage from "./pages/PostPage";

function App() {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<ProfilePage />} />
          <Route path="about" element={<PostPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

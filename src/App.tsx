import {
  BrowserRouter as Router,
  // Switch,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home";
import Sidebar from "./components/Sidebar";
import ProfilePage from "./pages/ProfilePage";
import PostPage from "./pages/PostPage";

function App() {
  return (
    <Router>
      <div className="flex h-full w-full relative overflow-hidden">
        <Sidebar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="post" element={<PostPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

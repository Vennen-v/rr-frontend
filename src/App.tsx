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
import SearchPage from "./pages/SearchPage";
import SettingsPage from "./pages/SettingsPage";
import CreatePostPage from "./pages/CreatePostPage";
import Welcome from "./pages/Welcome";

function App() {
  return (
    <Router>
      <div className="flex h-full w-full relative overflow-hidden">
        <Sidebar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="profile/:userName" element={<ProfilePage />} />
          <Route path="posts" element={<PostPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="create" element={<CreatePostPage />} />
          <Route path="welcome" element={<Welcome />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

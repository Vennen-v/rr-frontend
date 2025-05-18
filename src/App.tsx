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

function Layout({ children }: any) {
  return (
    <div className="flex h-full w-full relative overflow-hidden">
      <Sidebar />
      {children}
    </div>
  );
}

function App() {
  return (
    <Router>
      {/* <div className="flex h-full w-full relative overflow-hidden">
        <Sidebar /> */}

      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path=":userName"
          element={
            <Layout>
              <ProfilePage />
            </Layout>
          }
        />
        <Route
          path="posts"
          element={
            <Layout>
              <PostPage />
            </Layout>
          }
        />
        <Route
          path="search"
          element={
            <Layout>
              <SearchPage />
            </Layout>
          }
        />
        <Route
          path="settings"
          element={
            <Layout>
              <SettingsPage />
            </Layout>
          }
        />
        <Route
          path="create"
          element={
            <Layout>
              <CreatePostPage />
            </Layout>
          }
        />
        <Route path="welcome" element={<Welcome />} />
      </Routes>
      {/* </div> */}
    </Router>
  );
}

export default App;

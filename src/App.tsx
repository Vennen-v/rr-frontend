import {
  BrowserRouter as Router,
  // Switch,
  Route,
  Routes,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Sidebar from "./components/Sidebar";
import ProfilePage from "./pages/ProfilePage";
import PostPage from "./pages/PostPage";
import SearchPage from "./pages/SearchPage";
import SettingsPage from "./pages/SettingsPage";
import CreatePostPage from "./pages/CreatePostPage";
import Welcome from "./pages/Welcome";
import { WebSocketContextProvider } from "./ws/Ws";
import NotificationsPage from "./pages/NotificationsPage";

function Layout({ children }: any) {
  return (
    <WebSocketContextProvider>
      <div className="flex h-full w-full relative overflow-hidden">
        <Sidebar />
        {children}
      </div>
    </WebSocketContextProvider>
  );
}

function App() {
  return (
    <>
      <Toaster
        position="bottom-right"
        toastOptions={{
          success: {
            style: {
              color: "#eeeeee",
              border: "1px solid gray",
              background: "#141414",
            },
          },
          error: {
            style: {
              color: "#eeeeee",
              border: "1px solid gray",
              background: "#141414",
            },
          },
        }}
      />
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
            path="posts/:id"
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
            path="notifications"
            element={
              <Layout>
                <NotificationsPage />
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
          <Route path="create" element={<CreatePostPage />} />
          <Route path="welcome" element={<Welcome />} />
        </Routes>
        {/* </div> */}
      </Router>
    </>
  );
}

export default App;

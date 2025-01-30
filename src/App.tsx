import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Navbar } from "./components/navbar";
import SearchPage from "./pages/search";
import ProfilePage from "./pages/profile";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import PrivateRoute from "./utils/PrivateRoute";
import NotFound from "./pages/NotFound";
import ProfileForm from "./components/profileForm";

function App() {

  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground dark:bg-gray-900 dark:text-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/search" element={<PrivateRoute><SearchPage /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/signup"
            element={<Signup />}
          />
          <Route path="/profile-setup" element={<ProfileForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
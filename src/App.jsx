import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import AddPollPage from './pages/admin/AddPollPage';
import PollListPage from './pages/public/PollListPage';
import VotePollPage from './pages/public/VotePollPage';
import PollResultsPage from './pages/public/PollResultsPage';
import './App.css'
import { isAdmin } from './utils/auth';
import MenuBar from './components/MenuBar';

function RequireAuth({ children }) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function RequireAdmin({ children }) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (!token || !isAdmin()) {
    return <Navigate to="/polls" replace />;
  }
  return children;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/add-poll" element={<RequireAdmin><><MenuBar /><AddPollPage /></></RequireAdmin>} />
        <Route path="/polls" element={<RequireAuth><><MenuBar /><PollListPage /></></RequireAuth>} />
        <Route path="/polls/:id/vote" element={<RequireAuth><><MenuBar /><VotePollPage /></></RequireAuth>} />
        <Route path="/polls/:id/results" element={<RequireAuth><><MenuBar /><PollResultsPage /></></RequireAuth>} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  )
}

export default App

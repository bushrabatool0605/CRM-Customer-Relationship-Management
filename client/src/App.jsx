import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

// Pages (we will create these in next steps)
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import LeadsPage from './pages/LeadsPage';
import CreateLeadPage from './pages/CreateLeadPage';
import EditLeadPage from './pages/EditLeadPage';
import ViewLeadPage from './pages/ViewLeadPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />

        {/* Protected Routes */}
        <Route path='/dashboard' element={
          <ProtectedRoute><DashboardPage /></ProtectedRoute>
        } />
        <Route path='/leads' element={
          <ProtectedRoute><LeadsPage /></ProtectedRoute>
        } />
        <Route path='/leads/create' element={
          <ProtectedRoute><CreateLeadPage /></ProtectedRoute>
        } />
        <Route path='/leads/edit/:id' element={
          <ProtectedRoute><EditLeadPage /></ProtectedRoute>
        } />
        <Route path='/leads/:id' element={
          <ProtectedRoute><ViewLeadPage /></ProtectedRoute>
        } />

        {/* Default redirect */}
        <Route path='/' element={<Navigate to='/login' replace />} />
      </Routes>
    </Router>
  );
}

export default App;
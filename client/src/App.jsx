import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar.jsx';
import ChatPage from './pages/ChatPage.jsx';
import DocumentsPage from './pages/DocumentsPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import LandingPage from './pages2/LandingPage.jsx';
import { authRoutes } from './routes/authRoutes.jsx';
import MagneticCursor from './components/MagneticCursor.jsx';
export default function App() {
  return (
    <div className="h-screen bg-navy">
     <MagneticCursor />
      {/* <Sidebar /> */}
      {/* <main className="flex-1 overflow-y-auto"> */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* <Route path="/" element={<ChatPage />} /> */}
          {/* <Route path="/documents" element={<DocumentsPage />} /> */}
          {/* <Route path="/dashboard" element={<DashboardPage />} /> */}
          {authRoutes}
        </Routes>
      {/* </main> */}
    </div>
  );
}

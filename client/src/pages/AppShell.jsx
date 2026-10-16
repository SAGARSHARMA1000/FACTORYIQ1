import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/Sidebar.jsx';
import ChatPage from './ChatPage.jsx';
import DocumentsPage from './DocumentsPage.jsx';
import DashboardPage from './DashboardPage.jsx';

export default function AppShell() {
  return (
    <div className="flex h-screen bg-navy">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <Routes>
          <Route index element={<ChatPage />} />
          <Route path="documents" element={<DocumentsPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
        </Routes>
      </main>
    </div>
  );
}

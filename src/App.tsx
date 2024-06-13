import { useEffect } from 'react';
import './App.css';
import ReactGA from "react-ga";
import { LocalizationProvider } from '@mui/x-date-pickers';
import 'dayjs/locale/he';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import adminService from './Services/Admin';
import linesService from './Services/Lines';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Components/Home';
import NotFoundPage from './Components/NotFoundPage';
import ProtectedRoute from './Services/ProtectedRoute';
import AdminPage from './Components/AdminArea/AdminPage';
import Login from './Components/Login';
import LinesList from './Components/AdminArea/LinesList';
import CancelLine from './Components/CancelLine';

function App() {
  useEffect(() => {
    adminService.getCurrentAdminAsync();
    linesService.getAllLinesAsync();
    ReactGA.initialize("UA-110570651-1");
    ReactGA.pageview(window.location.pathname);

  }, [])
  return (
    <div className="App">
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="he">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/auth/login" element={<Login />} />

            <Route path="/cancel/:lineId" element={<CancelLine />} />

            <Route path="/manage/settings" element={<ProtectedRoute redirectPath="/auth/login" protectedComponent={<AdminPage />} />} />
            <Route path="/manage/lines" element={<ProtectedRoute redirectPath="/auth/login" protectedComponent={<LinesList />} />} />

            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </LocalizationProvider>
    </div>
  );
}

export default App;

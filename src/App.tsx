import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Profile from './pages/Profile';
import HR from './pages/HR';
import Leaves from './pages/HR/Leaves';
import CalendarView from './pages/HR/Calendar';
import Assets from './pages/HR/Assets';
import Expenses from './pages/HR/Expenses';
import Payslips from './pages/HR/Payslips';
import Workline from './pages/Workline';
import RMTPipelineWrapper from './pages/RMT/Pipeline';
import AllCalls from './pages/RMT/Pipeline/AllCalls';
import Pipeline from './pages/RMT/Pipeline/Pipeline';
import Onboarded from './pages/RMT/Pipeline/Onboarded';
import PipelineCalendar from './pages/RMT/Pipeline/Calendar';

import OpsWrapper from './pages/Ops';
import Inward from './pages/Ops/Inward';
import Outward from './pages/Ops/Outward';
import AllEntries from './pages/Ops/AllEntries';
import Notes from './pages/Ops/Notes';

import { ProtectedRoute } from './components/ProtectedRoute';

import Layout from './components/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Protected Routes Wrapper */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/workline" element={<Workline />} />
            <Route path="/profile" element={<Profile />} />
            
            <Route path="/hr" element={<HR />}>
              <Route path="leaves" element={<Leaves />} />
              <Route path="calendar" element={<CalendarView />} />
              <Route path="assets" element={<Assets />} />
              <Route path="expenses" element={<Expenses />} />
              <Route path="payslips" element={<Payslips />} />
              <Route index element={<Navigate to="leaves" replace />} />
            </Route>

            {/* RMT Pipeline Route */}
            <Route path="/pipeline" element={<RMTPipelineWrapper />}>
              <Route path="all-calls" element={<AllCalls />} />
              <Route path="onboarded" element={<Onboarded />} />
              <Route path="pipeline" element={<Pipeline />} />
              <Route path="calendar" element={<PipelineCalendar />} />
            </Route>

            {/* Ops Route */}
            <Route path="/ops" element={<OpsWrapper />}>
              <Route path="inward" element={<Inward />} />
              <Route path="outward" element={<Outward />} />
              <Route path="all-entries" element={<AllEntries />} />
              <Route path="notes" element={<Notes />} />
              <Route index element={<Navigate to="inward" replace />} />
            </Route>

            {/* Default redirect to home if authenticated */}
            <Route path="/" element={<Navigate to="/home" replace />} />
          </Route>
        </Route>
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

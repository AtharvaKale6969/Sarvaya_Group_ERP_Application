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
import { RoleProtectedRoute } from './components/RoleProtectedRoute';

// HR Admin Routes
import HRAdminWrapper from './pages/HRAdmin';
import HRAdminDashboard from './pages/HRAdmin/Dashboard';
import HREmployees from './pages/HRAdmin/Employees';
import HRAdminDepartments from './pages/HRAdmin/Departments';
import HRAdminDesignations from './pages/HRAdmin/Designations';
import HRAdminAttendancePermission from './pages/HRAdmin/AttendancePermission';
import HRAdminManageBranch from './pages/HRAdmin/ManageBranch';
import HRAdminManageShifts from './pages/HRAdmin/ManageShifts';
import HRAdminShiftAssignment from './pages/HRAdmin/ShiftAssignment';
import HRAdminWeekOff from './pages/HRAdmin/WeekOff';
import HRAdminRoster from './pages/HRAdmin/Roster';
import HRAdminLeaveCreate from './pages/HRAdmin/LeaveCreate';
import HRAdminLeaveAssign from './pages/HRAdmin/LeaveAssign';
import HRAdminLeaveBalance from './pages/HRAdmin/LeaveBalance';
import HRAdminHolidayCreate from './pages/HRAdmin/HolidayCreate';
import HRAdminHolidayAssign from './pages/HRAdmin/HolidayAssign';
import HRAdminApprovals from './pages/HRAdmin/Approvals';
import HRAdminBulkAttendance from './pages/HRAdmin/BulkAttendance';
import HRAdminProcessPayroll from './pages/HRAdmin/ProcessPayroll';
import HRAdminPayrollGroup from './pages/HRAdmin/PayrollGroup';

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

          {/* HR Admin Route (Protected by Role, outside main Layout for full screen) */}
          <Route element={<RoleProtectedRoute requiredRole="HR Admin" />}>
            <Route path="/hr-admin" element={<HRAdminWrapper />}>
              <Route path="dashboard" element={<HRAdminDashboard />} />
              <Route path="employees" element={<HREmployees />} />
              <Route path="departments" element={<HRAdminDepartments />} />
              <Route path="designations" element={<HRAdminDesignations />} />
              <Route path="attendance-permission" element={<HRAdminAttendancePermission />} />
              <Route path="manage-branch" element={<HRAdminManageBranch />} />
              <Route path="shifts" element={<HRAdminManageShifts />} />
              <Route path="shift-assignment" element={<HRAdminShiftAssignment />} />
              <Route path="week-off" element={<HRAdminWeekOff />} />
              <Route path="roster" element={<HRAdminRoster />} />
              <Route path="leave-create" element={<HRAdminLeaveCreate />} />
              <Route path="leave-assign" element={<HRAdminLeaveAssign />} />
              <Route path="leave-balance" element={<HRAdminLeaveBalance />} />
              <Route path="holiday-create" element={<HRAdminHolidayCreate />} />
              <Route path="holiday-assign" element={<HRAdminHolidayAssign />} />
              <Route path="approvals" element={<HRAdminApprovals />} />
              <Route path="bulk-attendance" element={<HRAdminBulkAttendance />} />
              <Route path="process-payroll" element={<HRAdminProcessPayroll />} />
              <Route path="payroll-group" element={<HRAdminPayrollGroup />} />
              <Route index element={<Navigate to="dashboard" replace />} />
            </Route>
          </Route>
        </Route>
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

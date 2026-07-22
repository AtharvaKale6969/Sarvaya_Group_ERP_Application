# User Onboarding & Access Flow Architecture

This document serves as the official architecture reference for how users are onboarded, gatekept, and managed within the ERP system. It ensures the strict separation of powers between the **HR Role** and the **Admin Role**.

## 1. Phase 1: Onboarding Initiation (HR)
**Actor:** HR User  
**Location:** `HR Admin -> Employee Onboarding`

HR is responsible for the operational data entry of a new hire. During this phase, HR collects and submits:
- **Personal Information:** Name, Email, Phone Number, Date of Joining.
- **Designation:** The employee's formal Job Title (e.g., "Executive Analyst", "Data Scientist"). *Note: This is NOT a system role.*
- **Primary Assignment:** The base Organization and Department the employee was hired for (e.g., Plastroots Waste Management -> Government Services).

**Security Constraint:** HR *cannot* assign System Roles (BDE, Ops, Lead, etc.). Once HR submits the form, the employee's status becomes "Pending Approval" and is sent to the Admin queue.

---

## 2. Phase 2: Security Gatekeeping & Approval (Admin)
**Actor:** Admin (`admin@test01.com`)  
**Location:** `Admin Management -> HR Approval`

The Admin acts as the ultimate gatekeeper for system access. 
- The Admin reviews the pending request submitted by HR.
- The Admin uses the **System Access Builder** to define the employee's exact access matrix.
- The builder allows the Admin to strictly bind specific System Roles to specific Departments.
- **Example Matrix:**
  - `Plastroots Foundation -> CSR -> BDE`
  - `Geoclaim Energy -> PMS -> Ops`

**Activation:** Once the Admin has configured the necessary cross-organization access blocks, they click "Approve & Activate". The employee is now formally active in the database with their respective permissions.

---

## 3. Phase 3: Operational Management (HR)
**Actor:** HR User  
**Location:** `HR Admin -> Shift Management / Leaves / Payroll`

Once activated by the Admin, the employee becomes available in HR's operational dropdowns. 
- HR can now assign Shifts, approve Leaves, and process Payroll for the active employee.
- HR can view the employee's profile to see the access matrices granted by the Admin, but HR *cannot* edit them.

---

## 4. Phase 4: Ongoing Access Management (Admin)
**Actor:** Admin (`admin@test01.com`)  
**Location:** `Admin Management -> User Management`

If an employee gets promoted, transferred, or takes on dual-responsibilities across organizations, the Admin manages this via the User Management table.
- The Admin can click "Edit Access" on any active employee.
- The Admin uses the **System Access Builder** to dynamically add new `Org -> Dept -> Role` blocks, or revoke existing ones.

## Summary of Responsibilities
| Data Type | Managed By | Description |
| :--- | :--- | :--- |
| Personal Info (Name, Contact) | HR | Basic demographic data. |
| Designation (Job Title) | HR | The formal title of the employee. |
| Operational Data (Shifts, Payroll) | HR | Day-to-day HR operations. |
| **System Roles & Matrices** | **Admin Only** | Cross-org system permissions and module access. |

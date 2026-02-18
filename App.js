import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AddBook from "./pages/AddBook";
import BookAvailable from "./transactions/BookAvailable";
import IssueBook from "./transactions/IssueBook";
import ReturnBook from "./transactions/ReturnBook";
import FinePay from "./transactions/FinePay";
import AddMembership from "./maintenance/AddMembership";
import UserManagement from "./maintenance/UserManagement";
import UpdateBook from "./pages/UpdateBook";
import UpdateMembership from "./maintenance/UpdateMembership";
import AdminRoute from "./AdminRoute";
import Reports from "./Reports";
import UserReports from "./UserReports";
import Books from "./pages/Books";



function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user"
          element={
            <ProtectedRoute role="user">
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/update-membership" element={<UpdateMembership />} />

        <Route
          path="/add-book"
          element={
            <ProtectedRoute role="admin">
              <AddBook />
            </ProtectedRoute>
          }
        />

        <Route path="/update-book" element={<UpdateBook />} />

        
        <Route
  path="/books-available"
  element={
    <ProtectedRoute>
      <BookAvailable />
    </ProtectedRoute>
  }
/>

<Route path="/return-book" element={<ReturnBook />} />

        <Route
  path="/issue-book"
  element={
    <ProtectedRoute>
      <IssueBook />
    </ProtectedRoute>
  }
/>

<Route path="/user-reports" element={<UserReports />} />

<Route
  path="/reports"
  element={
    <AdminRoute>
      <Reports />
    </AdminRoute>
  }
/>



<Route
  path="/return"
  element={
    <ProtectedRoute>
      <ReturnBook />
    </ProtectedRoute>
  }
/>

<Route
  path="/fine-Pay"
  element={
    <ProtectedRoute>
      <FinePay />
    </ProtectedRoute>
  }
/>

<Route path="/add-membership" element={<AddMembership />} />

<Route
  path="/users"
  element={
    <ProtectedRoute role="admin">
      <UserManagement />
    </ProtectedRoute>
  }
/>

<Route path="/user-management" element={<UserManagement />} />
<Route path="books-view" element={Books}></Route>






      </Routes>
    </BrowserRouter>
  );
}

export default App;

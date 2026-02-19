import { useNavigate } from "react-router-dom";

function AdminDashboard() {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div style={{ padding: "20px" }}>

      <h1>Admin Dashboard</h1>

      <h3>Maintenance</h3>
        <div style={{ marginBottom: "15px",  display: "flex", 
  gap: "10px", 
  flexWrap: "wrap", }}>

      <button onClick={() => navigate("/add-book")}>Add Book</button>
      <button onClick={() => navigate("/update-book")}>Update Book</button>
      <button onClick={() => navigate("/add-membership")}>Add Membership</button>
      <button onClick={() => navigate("/update-membership")}>Update Membership</button>
      <button onClick={() => navigate("/user-management")}>User Management</button>
      </div>

      <hr />

      <h3>Transactions</h3>
       <div style={{ marginBottom: "15px", display: "flex", 
  gap: "10px", 
  flexWrap: "wrap",}}>

      <button onClick={() => navigate("/books-available")}>Book Available</button>
      <button onClick={() => navigate("/issue-book")}>Issue Book</button>
      <button onClick={() => navigate("/return-book")}>Return Book</button>
      </div>

      <hr />

      <h3>Reports</h3>
      <div style={{ marginBottom: "15px",  display: "flex", 
  gap: "10px", 
  flexWrap: "wrap",}}>

      <button onClick={() => navigate("/reports")}>View Reports</button>
      </div>

      <hr />

      <button onClick={logout}>Logout</button>

    </div>
  );
}

export default AdminDashboard;

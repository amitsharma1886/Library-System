import { useNavigate } from "react-router-dom";

function UserDashboard() {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div style={{ padding: "20px" }}>

      <h2>User Dashboard</h2>
      <h3>Transactions</h3>

      <div
        style={{
          display: "flex",
          gap: "15px",
          flexWrap: "wrap",
          marginBottom: "25px"
        }}
      >
        <button onClick={() => navigate("/books-available")}>
          Book Available
        </button>

        <button onClick={() => navigate("/issue-book")}>
          Issue Book
        </button>

        <button onClick={() => navigate("/return-book")}>
          Return Book
        </button>
      </div>
      <h3>Reports</h3>

      <div style={{ marginBottom: "25px" }}>
       <button onClick={() => navigate("/user-reports")}>
  View Reports
</button>
      </div>

      <hr />

      <button onClick={logout}>
        Logout
      </button>

    </div>
  );
}

export default UserDashboard;

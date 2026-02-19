import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    setLoading(true);

    try {

      const res = await api.get("/users");

      const user = res.data.find(
        (u) =>
          u.email.trim() === email.trim() &&
          u.password.trim() === password.trim()
      );

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));

        navigate(user.role === "admin" ? "/admin" : "/user");

      } else {
        alert("Invalid Credentials");
      }

    } catch (error) {

      console.log(error);
      alert("Server Error! Make sure JSON Server is running");

    }

    setLoading(false);
  };

  return (
    <div style={{ marginTop: "100px", textAlign: "center" }}>
      
      <h2>Library Login</h2>

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
      />

      <br/><br/>
      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
      />

      <br/><br/>

      <button onClick={handleLogin}>
        {loading ? "Logging in..." : "Login"}
      </button>

    </div>
  );
}

export default Login;

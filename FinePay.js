import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function FinePay() {

  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  const [fine, setFine] = useState(0);
  const [paid, setPaid] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {

    if (!data) {
      navigate("/return-book");
      return;
    }

    const issue = new Date(data.issueDate);
    const allowed = new Date(issue);
    allowed.setDate(issue.getDate() + 15);

    const actual = new Date(data.returnDate);

    const diff = Math.ceil(
      (actual - allowed) / (1000 * 60 * 60 * 24)
    );

    if (diff > 0) {
      setFine(diff * 10);
    } else {
      setFine(0);
    }

  }, [data, navigate]);

  const confirmReturn = async () => {

    if (fine > 0 && !paid) {
      setError("Please confirm fine payment!");
      return;
    }

    await axios.delete(
      `http://localhost:3000/issues/${data.id}`
    );

    alert("Book Returned Successfully ");

    navigate("/admin");
  };

  if (!data) return null;

  return (
    <div style={{ padding: "30px", minHeight: "100vh" }}>

      <h2>Fine Payment</h2>

      <p><b>Book:</b> {data.book}</p>
      <p><b>Author:</b> {data.author}</p>
      <p><b>Serial:</b> {data.serial}</p>

      <h3>Fine: ₹{fine}</h3>

      {fine > 0 && (
        <label>
          <input
            type="checkbox"
            checked={paid}
            onChange={() => setPaid(!paid)}
          />
          Fine Paid
        </label>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}

      <br /><br />

      <button onClick={confirmReturn}>
        Confirm
      </button>

    </div>
  );
}

export default FinePay;

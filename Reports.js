import { useEffect, useState } from "react";
import axios from "axios";

function Reports() {

  const [books, setBooks] = useState([]);
  const [issues, setIssues] = useState([]);
  const [users, setUsers] = useState([]);
  const [memberships, setMemberships] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/books")
      .then(res => setBooks(res.data));

    axios.get("http://localhost:3000/issues")
      .then(res => setIssues(res.data));

    axios.get("http://localhost:3000/users")
      .then(res => setUsers(res.data));

    axios.get("http://localhost:3000/memberships")
      .then(res => setMemberships(res.data));
  }, []);

  const today = new Date().toISOString().split("T")[0];

  const totalBooks = books.length;
  const totalIssues = issues.length;
  const totalUsers = users.length;
  const totalMemberships = memberships.length;

  const availableBooks = books.filter(b => b.available === true).length;

  const overdue = issues.filter(i => i.returnDate < today).length;

  return (
    <div style={{ padding: "30px" }}>
      <h2>Admin Reports</h2>

      <h3>Summary</h3>
      <p>Total Books: {totalBooks}</p>
      <p>Total Active Issues: {totalIssues}</p>
      <p>Available Books: {availableBooks}</p>
      <p>Total Users: {totalUsers}</p>
      <p>Total Memberships: {totalMemberships}</p>
      <p>Overdue Returns: {overdue}</p>

      <hr />

      <h3>Active Issues</h3>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Book</th>
            <th>Author</th>
            <th>Issue Date</th>
            <th>Return Date</th>
          </tr>
        </thead>
        <tbody>
          {issues.map(i => (
            <tr key={i.id}>
              <td>{i.bookName}</td>
              <td>{i.author}</td>
              <td>{i.issueDate}</td>
              <td>{i.returnDate}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default Reports;

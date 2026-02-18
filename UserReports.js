import { useEffect, useState } from "react";

function UserReports() {

  const [myIssues, setMyIssues] = useState([]);
  const [overdueBooks, setOverdueBooks] = useState([]);
  const [totalFine, setTotalFine] = useState(0);

  useEffect(() => {

    const currentUser = JSON.parse(localStorage.getItem("user"));
    const issues = JSON.parse(localStorage.getItem("issues")) || [];

    // Filter only current user's issues
    const userIssues = issues.filter(
      issue => issue.userEmail === currentUser.email
    );

    setMyIssues(userIssues);

    // Overdue logic
    const today = new Date();

    const overdue = userIssues.filter(issue => {
      return new Date(issue.returnDate) < today;
    });

    setOverdueBooks(overdue);

    // Fine calculation (example: ₹10 per overdue day)
    let fineTotal = 0;

    overdue.forEach(issue => {
      const returnDate = new Date(issue.returnDate);
      const diffDays = Math.floor(
        (today - returnDate) / (1000 * 60 * 60 * 24)
      );
      fineTotal += diffDays * 10;
    });

    setTotalFine(fineTotal);

  }, []);

  return (
    <div style={{ padding: "20px" }}>

      <h2>User Reports</h2>

      {/* Active Issues */}
      <h3>My Active Issues</h3>

      {myIssues.length === 0 ? (
        <p>No active books.</p>
      ) : (
        <ul>
          {myIssues.map((issue, index) => (
            <li key={index}>
              {issue.bookName} - {issue.author}
            </li>
          ))}
        </ul>
      )}

      <hr />

      {/* Overdue Books */}
      <h3>My Overdue Books</h3>

      {overdueBooks.length === 0 ? (
        <p>No overdue books.</p>
      ) : (
        <ul>
          {overdueBooks.map((issue, index) => (
            <li key={index}>
              {issue.bookName} - Return Date: {issue.returnDate}
            </li>
          ))}
        </ul>
      )}

      <hr />

      {/* Fine Section */}
      <h3>My Fine Details</h3>

      <p>Total Fine: ₹ {totalFine}</p>

    </div>
  );
}

export default UserReports;

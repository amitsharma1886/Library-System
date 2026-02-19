import { useEffect, useState } from "react";
import axios from "axios";

function IssuedList(){

  const [issues, setIssues] = useState([]);

  const fetchIssues = () => {
    axios.get("http://localhost:3000/issues")
      .then(res => setIssues(res.data));
  };

  useEffect(()=>{
    fetchIssues();
  },[]);

  const returnBook = async (id) => {
    await axios.delete(`http://localhost:3000/issues/${id}`);
    fetchIssues();
  };

  return(
    <div>

      <h2>Issued Books</h2>

      <table border="1">
        <thead>
          <tr>
            <th>Book</th>
            <th>Member</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {issues.map(issue=>(
            <tr key={issue.id}>
              <td>{issue.bookName}</td>
              <td>{issue.memberName}</td>
              <td>{issue.issueDate}</td>

              <td>
                <button onClick={()=>returnBook(issue.id)}>
                  Return
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  )
}

export default IssuedList;

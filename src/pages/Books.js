import { useEffect, useState } from "react";
import axios from "axios";

function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("http://localhost:3001/books");
      console.log("Books fetched:", res.data); // Debugging
      setBooks(res.data);
    } catch (err) {
      console.error("Error fetching books:", err);
      setError("Failed to fetch books. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Books List</h2>

      {loading ? (
        <p>Loading books...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : books.length === 0 ? (
        <p>No books available.</p>
      ) : (
        <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr style={{ backgroundColor: "#ddd" }}>
              <th>Title</th>
              <th>Author</th>
              <th>Available</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr
                key={book.id}
                style={{ backgroundColor: index % 2 === 0 ? "#f9f9f9" : "white" }}
              >
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.available ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <br />
      <button onClick={fetchBooks}>Refresh Books</button>
    </div>
  );
}

export default Books;

import { useState } from "react";
import api from "../api";

function BookAvailable(){

  const [search,setSearch] = useState("");
  const [books,setBooks] = useState([]);
  const [error,setError] = useState("");

  const handleSearch = async () => {

  if(!search){
    setError("Please enter book name");
    return;
  }

  setError("");

  const res = await api.get("/books");

  const filteredBooks = res.data.filter(book =>
    book.name.toLowerCase().includes(search.toLowerCase())
  );

  setBooks(filteredBooks);
};

  return(
    <div style={{padding:"20px"}}>

      <h2>Book Available</h2>

      <input
        placeholder="Enter book name"
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
      />

      <button onClick={handleSearch}>
        Search
      </button>

      {error && <p style={{color:"red"}}>{error}</p>}

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Select</th>
            <th>Book Name</th>
            <th>Author</th>
          </tr>
        </thead>

        <tbody>
          {books.map(book=>(
            <tr key={book.id}>

              {/* Excel requirement → radio button */}
              <td>
                <input type="radio" name="selectedBook"/>
              </td>

              <td>{book.name}</td>
              <td>{book.author}</td>

            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}

export default BookAvailable;

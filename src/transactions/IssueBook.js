import { useEffect, useState } from "react";
import api from "../api";

function IssueBook(){

  const [books,setBooks] = useState([]);
  const [selectedBook,setSelectedBook] = useState(null);
  const [issueDate,setIssueDate] = useState("");
  const [returnDate,setReturnDate] = useState("");
  const [remarks,setRemarks] = useState("");
  const [error,setError] = useState("");

  useEffect(()=>{
    getBooks();
  },[]);

  const getBooks = async () => {
    const res = await api.get("/books");
    setBooks(res.data);
  }

  const handleBookSelect = (book) => {

    setSelectedBook(book);

    const today = new Date().toISOString().split("T")[0];

    setIssueDate(today);

    const returnDay = new Date();
    returnDay.setDate(returnDay.getDate() + 15);

    setReturnDate(returnDay.toISOString().split("T")[0]);
  }

  const handleSubmit = async () => {

    if(!selectedBook || !issueDate || !returnDate){
      setError("Please select book and valid dates");
      return;
    }

    const today = new Date().toISOString().split("T")[0];

    if(issueDate < today){
      setError("Issue date cannot be past");
      return;
    }

    const maxReturn = new Date(issueDate);
    maxReturn.setDate(maxReturn.getDate()+15);

    if(new Date(returnDate) > maxReturn){
      setError("Return must be within 15 days");
      return;
    }

    setError("");

    await api.post("/issues",{
      bookName:selectedBook.name,
      author:selectedBook.author,
      issueDate,
      returnDate,
      remarks
    });

    alert("Book Issued Successfully ");

  }

  return(
    <div style={{padding:"20px"}}>

      <h2>Issue Book</h2>

      {error && <p style={{color:"red"}}>{error}</p>}

      <h3>Select Book</h3>

      {books.map(book=>(
        <div key={book.id}>
          <input
            type="radio"
            name="book"
            onChange={()=>handleBookSelect(book)}
          />
          {book.name} — {book.author}
        </div>
      ))}

      {selectedBook && (
        <>
          <p>Author: {selectedBook.author}</p>

          <label>Issue Date:</label>
          <input
            type="date"
            value={issueDate}
            onChange={(e)=>setIssueDate(e.target.value)}
          />

          <br/><br/>

          <label>Return Date:</label>
          <input
            type="date"
            value={returnDate}
            onChange={(e)=>setReturnDate(e.target.value)}
          />

          <br/><br/>

          <textarea
            placeholder="Remarks (Optional)"
            onChange={(e)=>setRemarks(e.target.value)}
          />

          <br/><br/>

          <button onClick={handleSubmit}>
            Issue Book
          </button>
        </>
      )}

    </div>
  )
}
export default IssueBook;

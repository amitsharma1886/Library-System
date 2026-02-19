import { useState } from "react";
import axios from "axios";

function AddBook(){

 const [type,setType] = useState("book"); // default ✅
 const [name,setName] = useState("");
 const [author,setAuthor] = useState("");
 const [serial,setSerial] = useState("");
 const [error,setError] = useState("");

 const addBook = async()=>{

  if(!name || !author || !serial){
    setError("Please fill all fields!");
    return;
  }

  try{

    await axios.post("http://localhost:3000/books",{
      type,
      name,
      author,
      serial,
      available:true
    });
    setName("");
    setAuthor("");
    setSerial("");
    setError("");

    alert("Book Added Successfully");

  }catch{
    setError("Server error!");
  }
 }

 return(
  <div style={{padding:"30px"}}>

    <h2>Add Book</h2>
    {error && <p style={{color:"red"}}>{error}</p>}

    <label>
      <input
        type="radio"
        checked={type==="book"}
        onChange={()=>setType("book")}
      />
      Book
    </label>

    <label style={{marginLeft:"20px"}}>
      <input
        type="radio"
        checked={type==="movie"}
        onChange={()=>setType("movie")}
      />
      Movie
    </label>

    <br/><br/>

    <input
      placeholder="Book Name"
      value={name}
      onChange={(e)=>setName(e.target.value)}
    />

    <br/><br/>

    <input
      placeholder="Author"
      value={author}
      onChange={(e)=>setAuthor(e.target.value)}
    />

    <br/><br/>

    <input
      placeholder="Serial Number"
      value={serial}
      onChange={(e)=>setSerial(e.target.value)}
    />

    <br/><br/>

    <button onClick={addBook}>
      Add Book
    </button>

  </div>
 )
}

export default AddBook;

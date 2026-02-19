import { useEffect, useState } from "react";
import axios from "axios";

function UpdateBook(){

 const [books,setBooks] = useState([]);
 const [selected,setSelected] = useState("");
 const [type,setType] = useState("book");
 const [name,setName] = useState("");
 const [author,setAuthor] = useState("");
 const [serial,setSerial] = useState("");
 const [error,setError] = useState("");

 useEffect(()=>{
   axios.get("http://localhost:3000/books")
   .then(res=>setBooks(res.data));
 },[]);


 const handleSelect = (id)=>{

   const book = books.find(b=>b.id === id);

   setSelected(id);
   setType(book.type);
   setName(book.name);
   setAuthor(book.author);
   setSerial(book.serial);
 };


 const updateBook = async()=>{

   if(!name || !author || !serial){
     setError("All fields are mandatory!");
     return;
   }

   await axios.put(`http://localhost:3000/books/${selected}`,{
     id:selected,
     type,
     name,
     author,
     serial,
     available:true
   });

   setError("");
   alert("Book Updated ");
 };


 return(
   <div style={{padding:"30px"}}>

     <h2>Update Book</h2>

     {error && <p style={{color:"red"}}>{error}</p>}

     <select onChange={(e)=>handleSelect(e.target.value)}>

        <option>Select Book</option>

        {books.map(b=>(
          <option key={b.id} value={b.id}>
            {b.name}
          </option>
        ))}

     </select>

     <br/><br/>

     {selected && (
      <>
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
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />

        <br/><br/>

        <input
          value={author}
          onChange={(e)=>setAuthor(e.target.value)}
        />

        <br/><br/>

        <input
          value={serial}
          onChange={(e)=>setSerial(e.target.value)}
        />

        <br/><br/>

        <button onClick={updateBook}>
          Update Book
        </button>
      </>
     )}

   </div>
 )
}

export default UpdateBook;

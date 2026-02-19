import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ReturnBook(){

 const [issues,setIssues] = useState([]);
 const [selected,setSelected] = useState("");

 const [book,setBook] = useState("");
 const [author,setAuthor] = useState("");
 const [serial,setSerial] = useState("");
 const [issueDate,setIssueDate] = useState("");
 const [returnDate,setReturnDate] = useState("");

 const [error,setError] = useState("");

 const navigate = useNavigate();


useEffect(()=>{
 axios.get("http://localhost:3000/issues")
 .then(res=>setIssues(res.data));
},[]);

const handleSelect = (id)=>{
    if(!id) return;


 const data = issues.find(i=>i.id === id);
  if(!data) return;

 setSelected(id);
 setBook(data.bookName);
 setAuthor(data.author);
 setSerial(data.serial || "N/A" );
 setIssueDate(data.issueDate);
 setReturnDate(data.returnDate);
};


const confirmReturn = ()=>{

 if(!selected){
   setError("Please select a book!");
   return;
 }

 navigate("/fine-pay",{
   state:{
     id:selected,
     book,
     author,
     serial,
     issueDate,
     returnDate
   }
 });
};


return(
 <div style={{padding:"30px"}}>

   <h2>Return Book</h2>

   {error && <p style={{color:"red"}}>{error}</p>}
   <select onChange={(e)=>handleSelect(e.target.value)}>
     <option>Select Book</option>

     {issues.map(i=>(
       <option key={i.id} value={i.id}>
          {i.bookName} - {i.id}
       </option>
     ))}
   </select>

   <br/><br/>

   {selected && (
     <>
       <input value={book} disabled />
       <br/><br/>

       <input value={author} disabled />
       <br/><br/>

       <input value={serial} disabled />
       <br/><br/>

       <label>Issue Date</label>
       <input type="date" value={issueDate} disabled />
       <br/><br/>

       <label>Return Date</label>
       <input
         type="date"
         value={returnDate}
         onChange={(e)=>setReturnDate(e.target.value)}
       />

       <br/><br/>

       <button onClick={confirmReturn}>
         Confirm Return
       </button>
     </>
   )}

 </div>
)

}

export default ReturnBook;

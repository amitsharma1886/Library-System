import { useState } from "react";
import axios from "axios";

function AddMembership(){

 const [name,setName] = useState("");
 const [email,setEmail] = useState("");
 const [phone,setPhone] = useState("");
 const [duration,setDuration] = useState("6 months"); // default ✅
 const [error,setError] = useState("");

 const addMembership = async()=>{

   if(!name || !email || !phone){
     setError("Please fill all fields!");
     return;
   }

   try{

     await axios.post("http://localhost:3000/memberships",{
       name,
       email,
       phone,
       duration,
       status:"active"
     });

     setName("");
     setEmail("");
     setPhone("");
     setDuration("6 months");
     setError("");

     alert("Membership Added");

   }catch{
     setError("Server Error!");
   }
 };

 return(
   <div style={{padding:"30px"}}>

     <h2>Add Membership</h2>

     {error && <p style={{color:"red"}}>{error}</p>}

     <input
       placeholder="Name"
       value={name}
       onChange={(e)=>setName(e.target.value)}
     />

     <br/><br/>

     <input
       placeholder="Email"
       value={email}
       onChange={(e)=>setEmail(e.target.value)}
     />

     <br/><br/>

     <input
       placeholder="Phone"
       value={phone}
       onChange={(e)=>setPhone(e.target.value)}
     />

     <br/><br/>

     <p>Select Duration:</p>

     <label>
       <input
         type="radio"
         checked={duration==="6 months"}
         onChange={()=>setDuration("6 months")}
       />
       6 Months
     </label>

     <label style={{marginLeft:"20px"}}>
       <input
         type="radio"
         checked={duration==="1 year"}
         onChange={()=>setDuration("1 year")}
       />
       1 Year
     </label>

     <label style={{marginLeft:"20px"}}>
       <input
         type="radio"
         checked={duration==="2 years"}
         onChange={()=>setDuration("2 years")}
       />
       2 Years
     </label>

     <br/><br/>

     <button onClick={addMembership}>
       Add Membership
     </button>

   </div>
 )
}

export default AddMembership;

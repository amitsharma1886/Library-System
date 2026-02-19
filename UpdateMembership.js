import { useEffect, useState } from "react";
import axios from "axios";

function UpdateMembership(){

 const [members,setMembers] = useState([]);
 const [selected,setSelected] = useState("");

 const [name,setName] = useState("");
 const [email,setEmail] = useState("");
 const [phone,setPhone] = useState("");

 const [action,setAction] = useState("extend"); // default ✅
 const [duration,setDuration] = useState("6 months"); // default ✅

 const [error,setError] = useState("");

 useEffect(()=>{
   axios.get("http://localhost:3000/memberships")
   .then(res=>setMembers(res.data));
 },[]);

 const handleSelect = (id)=>{

   if(!id){
     setError("Membership Number is mandatory!");
     return;
   }

   const member = members.find(m=>m.id === id);

   setSelected(id);
   setName(member.name);
   setEmail(member.email);
   setPhone(member.phone);
   setError("");
 };


 const updateMembership = async()=>{

   if(!selected){
     setError("Please select membership number!");
     return;
   }

   try{

     if(action === "cancel"){

       await axios.put(`http://localhost:3000/memberships/${selected}`,{
         id:selected,
         name,
         email,
         phone,
         duration,
         status:"cancelled"
       });

     }else{

       await axios.put(`http://localhost:3000/memberships/${selected}`,{
         id:selected,
         name,
         email,
         phone,
         duration,
         status:"active"
       });

     }

     alert("Membership Updated ");

   }catch{
     setError("Server Error!");
   }
 };



 return(
   <div style={{padding:"30px"}}>

     <h2>Update Membership</h2>

     {error && <p style={{color:"red"}}>{error}</p>}
     <select onChange={(e)=>handleSelect(e.target.value)}>
        <option value="">Select Membership Number</option>

        {members.map(m=>(
          <option key={m.id} value={m.id}>
            {m.id}
          </option>
        ))}
     </select>

     <br/><br/>

     {selected && (
      <>
        <input value={name} disabled />
        <br/><br/>

        <input value={email} disabled />
        <br/><br/>

        <input value={phone} disabled />
        <br/><br/>


        <p>Choose Action:</p>

        <label>
          <input
            type="radio"
            checked={action==="extend"}
            onChange={()=>setAction("extend")}
          />
          Extend Membership
        </label>

        <label style={{marginLeft:"20px"}}>
          <input
            type="radio"
            checked={action==="cancel"}
            onChange={()=>setAction("cancel")}
          />
          Cancel Membership
        </label>

        <br/><br/>
        {action==="extend" && (
          <>
            <p>Select Extension:</p>

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
          </>
        )}

        <br/><br/>

        <button onClick={updateMembership}>
          Update Membership
        </button>
      </>
     )}

   </div>
 )
}

export default UpdateMembership;

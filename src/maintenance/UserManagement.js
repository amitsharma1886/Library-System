import { useEffect, useState } from "react";
import axios from "axios";

function UserManagement(){

 const [mode,setMode] = useState("new"); // default ✅
 const [users,setUsers] = useState([]);

 const [selected,setSelected] = useState("");

 const [name,setName] = useState("");
 const [email,setEmail] = useState("");
 const [password,setPassword] = useState("");
 const [role,setRole] = useState("user");

 const [error,setError] = useState("");

useEffect(()=>{
 axios.get("http://localhost:3000/users")
 .then(res=>setUsers(res.data));
},[]);

const handleSelect = (id)=>{

 const user = users.find(u=>u.id === id);

 setSelected(id);
 setName(user.name || "");
 setEmail(user.email);
 setPassword(user.password);
 setRole(user.role);
};

const addUser = async()=>{

 if(!name || !email || !password){
   setError("All fields are mandatory!");
   return;
 }

 await axios.post("http://localhost:3000/users",{
   name,
   email,
   password,
   role
 });

 alert("User Added");

 setName("");
 setEmail("");
 setPassword("");
 setRole("user");
 setError("");
};

const updateUser = async()=>{

 if(!selected){
   setError("Select a user first!");
   return;
 }

 await axios.put(`http://localhost:3000/users/${selected}`,{
   id:selected,
   name,
   email,
   password,
   role
 });

 alert("User Updated");
};


return(
 <div style={{padding:"30px"}}>

   <h2>User Management</h2>

   {error && <p style={{color:"red"}}>{error}</p>}
   <label>
     <input
       type="radio"
       checked={mode==="new"}
       onChange={()=>setMode("new")}
     />
     New User
   </label>

   <label style={{marginLeft:"20px"}}>
     <input
       type="radio"
       checked={mode==="existing"}
       onChange={()=>setMode("existing")}
     />
     Existing User
   </label>

   <br/><br/>
   {mode==="existing" && (
     <>
       <select onChange={(e)=>handleSelect(e.target.value)}>
         <option>Select User</option>

         {users.map(u=>(
           <option key={u.id} value={u.id}>
             {u.email}
           </option>
         ))}
       </select>

       <br/><br/>
     </>
   )}

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
     type="password"
     placeholder="Password"
     value={password}
     onChange={(e)=>setPassword(e.target.value)}
   />

   <br/><br/>

   <select value={role} onChange={(e)=>setRole(e.target.value)}>
     <option value="user">User</option>
     <option value="admin">Admin</option>
   </select>

   <br/><br/>

   {mode==="new" ? (
      <button onClick={addUser}>Add User</button>
   ) : (
      <button onClick={updateUser}>Update User</button>
   )}

 </div>
)

}

export default UserManagement;

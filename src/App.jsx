import React from 'react'
import { useState, useEffect } from 'react'
import { v4 as uuid } from 'uuid'
import axios from 'axios'



const API_URL = " http://localhost:8000"

const App = () => {

  const [ alluser, setAlluser ] = useState([])
  const [ editState, setEditState] = useState(false)
  const [ user, setUser ] = useState(
    {
      id:uuid(),
      name:"",
      email:""
    }
  )

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (editState) {
      await updateUser();
    } else {
      try {
        await axios.post(`${API_URL}/`, user);
        getData()
        setUser(
          {
            id:uuid(),
            name:"",
            email:""
          }
        )

      } catch (err) {
        console.log(err);
      }
    }
  };

const getData = async() =>{
  try{
    const response = await axios.get(`${API_URL}/`)
    setAlluser(response.data)
    console.log(alluser)
  }catch(err){
    console.log(err)
}
}


const handleChange = (e) =>{
    const { name, value } = e.target
    setUser(
     (curr) => (
      {
        ...curr,
        [name]:value
       }
     )
    )
}

useEffect(() => {
  getData();
}, []);


const editUser = (u) =>{
  setUser(u)
  setEditState(true)
}

const deleteuser = async(id) => {
  try{
    await axios.delete(`${API_URL}/${id}`)
    getData()
  }catch(err){
    console.log(err)
}
}

const updateUser = async() =>{
  try{
     const response = await axios.put(`${API_URL}/${user._id}`, user)
     setUser(
      {
        id:uuid(),
        name:"",
        email:""
      }
    )
    setEditState(false)
    getData()

  }catch(err){
    console.log(err)
}
}


  return (
    <div>
      

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='name' name='name' value={user.name} onChange={handleChange}  />
        <input type="text" placeholder='email' name="email" value={user.email} onChange={handleChange} />

       {
       editState === true ? ( <button type='submit'> Submit</button>) :  <button type='edit' onClick={ ()=> updateUser(user._id)}> Update</button>
       }
      </form>

      
      <table>
           <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
           </thead>
           <tbody>
             {
              alluser.map( (u, index) =>{
                return <tr key={index}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>
                        <button onClick={ ()=> editUser(u)}> Edit</button>
                        <button onClick={ () => deleteuser(u._id)}> Delete</button>
                    </td>
                </tr>
              } )
             }
                
           </tbody>
        </table>

    </div>
  )
}

export default App

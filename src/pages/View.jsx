import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import LoadingSpinner from '../components/LoadingSpinner'
import { useParams } from 'react-router-dom'
import { getUsers } from '../services/allApi'
import { BASE_URL } from '../services/baseurl'


function View() {

  // single view section

  const [user,setUser]=useState({})

  const {id}=useParams()

  console.log(id);

  useEffect(() => {
   getUser()
  }, [])
  

  const getUser=async()=>{
    const {data}= await getUsers("")
    console.log(data);

    console.log(data.find(item=>item._id===id));

    setUser(data.find(item=>item._id===id))

  }





  const [showSpin,setShowSpin]=useState(true)

  useEffect(() => {
    
    setTimeout(()=>{
      setShowSpin(false)
    },2000);
  }, [])

  return (
    <>

{
          showSpin?
       <LoadingSpinner/>:

    <div className="container" style={{height:'80vh'}}>

      {

        user?

        <Card className="shadow ms-auto mt-5 p-3">

        <div className="image text-center ">
        <img
              style={{ widows: "70px", height: "70px" }}
              src={`${BASE_URL}/uploads/${user.profile}`}
              alt="Error"
            />
        </div>

        <div className="text-center ">
          <h3>{user.fname} {user.lname}</h3><br />
          <h3>Email: {user.email}</h3>
          <h3>Mobile: {user.mobile}</h3>
          <h3>Gender: {user.gender}</h3>
          <h3>Status: {user.status}</h3>
          <h3>Location: {user.location}</h3>
        </div>

      </Card> : ""

      }

    </div>

}


    </>
  )
}

export default View
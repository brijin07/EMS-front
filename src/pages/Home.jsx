import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Hometable from '../components/Hometable'
import LoadingSpinner from '../components/LoadingSpinner'
import { registerContext } from '../components/ContextShare'
import Alert from 'react-bootstrap/Alert';
import { deleteUser, getUsers } from '../services/allApi'




function Home() {

  const [alluserData, setalluserData] = useState([])

  const { registerData, setRegisterData } = useContext(registerContext)

  const [showSpin, setShowSpin] = useState(true)

  const [search, setSearch] = useState("")
  console.log(search);



  useEffect(() => {

    getAllEmployees()

    setTimeout(() => {
      setShowSpin(false)
    }, 2000);
  }, [search])


  // api call for all employees

  const getAllEmployees = async () => {

    const response = await getUsers(search)

    console.log(response);

    if (response.status == 200) {
      setalluserData(response.data)
    }
    else {
      alert('can not fetch data')
    }

  }

  console.log(alluserData);


  // delete employee

  const removeUser = async (id) => {
    const response = await deleteUser(id)
    console.log(removeUser);

    if (response.status === 200) {
      getAllEmployees()
    }
    else {
      alert('operation failed !')
    }

  }




  return (
    <>



      {

        registerData && <Alert variant='danger' onClose={() => setRegisterData("")} dismissible >

          {registerData.fname.toUpperCase()}  registerd ........

        </Alert>


      }



      {
        showSpin ?
          <LoadingSpinner /> :



          <div className='container'>

            <div className='search d-flex align-items-center mt-3 '>
              <span> <svg fill="#000000" width='30px' viewBox="-1.6 -1.6 19.20 19.20" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"><path transform="translate(-1.6, -1.6), scale(1.2)" fill="#7ed0ec" d="M9.166.33a2.25 2.25 0 00-2.332 0l-5.25 3.182A2.25 2.25 0 00.5 5.436v5.128a2.25 2.25 0 001.084 1.924l5.25 3.182a2.25 2.25 0 002.332 0l5.25-3.182a2.25 2.25 0 001.084-1.924V5.436a2.25 2.25 0 00-1.084-1.924L9.166.33z" strokewidth="0"></path></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12.027 9.92L16 13.95 14 16l-4.075-3.976A6.465 6.465 0 0 1 6.5 13C2.91 13 0 10.083 0 6.5 0 2.91 2.917 0 6.5 0 10.09 0 13 2.917 13 6.5a6.463 6.463 0 0 1-.973 3.42zM1.997 6.452c0 2.48 2.014 4.5 4.5 4.5 2.48 0 4.5-2.015 4.5-4.5 0-2.48-2.015-4.5-4.5-4.5-2.48 0-4.5 2.014-4.5 4.5z" fill-rule="evenodd"></path> </g></svg> </span>
              <input onChange={e => setSearch(e.target.value)} type="text" placeholder='Search By Employee Name' className='form-control ms-3 w-50' />
              <Link to={'/add'} className='btn btn-danger ms-auto'><i class="fa-solid fa-user-plus"></i>Add</Link>
            </div>

            <div className="table mt-5">
              <h2 className='fw-bolder'>List Of All Employees</h2>

              <Hometable displayData={alluserData} removeUser={removeUser} />

            </div>

          </div>

      }


    </>
  )
}

export default Home
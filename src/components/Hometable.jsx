import React from 'react'
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../services/baseurl';



function Hometable({ displayData,removeUser }) {


    console.log(displayData);





    return (
        <>

            <Table striped bordered hover variant="dark" className="text-center">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Status</th>
                        <th>Profile</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>

                    {/* the duplication table row is wraping {....} */}

                    {

                        displayData.length > 0 ?

                            displayData.map((item, index) => (

                                <tr>
                                    <td>{index+1}</td>
                                    <td>{item.fname} {item.lname}</td>
                                    <td>{item.email}</td>
                                    <td>{item.mobile}</td>
                                    <td><button className={item.status==="Active"? "btn btn-success" : "btn btn-danger " } >{item.status}</button></td>
                                    <td><img src={`${BASE_URL}/uploads/${item.profile}`} alt="user image" height={'50px'} 
                                                    style={{ width: "60px", height: "60px", borderRadius: "50px" }}
                                                    /></td>

                                    <td>
                                        <Link to={`/view/${item._id}`}><i class="fa-regular fa-eye fs-3 me-2 text-primary rounded"></i></Link>
                                        <Link to={`/edit/${item._id}`}><i class="fa-solid fa-pen fs-3 me-2"></i></Link>
                                        <span onClick={()=>removeUser(item._id)} ><i class="fa-solid fa-trash text-warning fs-3"></i></span>


                                    </td>

                                </tr>


                            )): <tr className='fw-bolder mt-5 text-danger ' >
                                nothing to display
                                </tr>


                    
                    }

                </tbody>
            </Table>


        </>
    )
}

export default Hometable
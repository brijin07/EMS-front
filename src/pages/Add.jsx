import React, { useContext, useEffect, useState } from "react";
import { Form, FloatingLabel, Row, Button } from "react-bootstrap";
import Select from "react-select";
import LoadingSpinner from "../components/LoadingSpinner";
import { addUser } from "../services/allApi";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerContext } from "../components/ContextShare";
import { useNavigate } from "react-router-dom";



function Add() {


  const { registerData, setRegisterData } = useContext(registerContext)

  const navigate = useNavigate()

  const options = [
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
  ];


  // to hold normal inputs

  const [normalInputs, setNormalInputs] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    gender: "",
    location: ""
  })

  // to hold status

  const [status, setStatus] = useState("")

  // to hold file uploading content

  const [profile, setProfile] = useState("")

  const [preview, setPreview] = useState("")

  useEffect(() => {

    if (profile) {
      // uploading file is converted in url format
      // only url format is storing in backend
      URL.createObjectURL(profile)
      setPreview(URL.createObjectURL(profile))
    }

  }, [profile])


  // To get normal inputs from text box

  const getandsetInputs = (e) => {
    const { name, value } = e.target
    setNormalInputs({ ...normalInputs, [name]: value })
    // rest operator
  }

  console.log(normalInputs);

  // To get status

  console.log(status);

  //  To get profile

  const getandsetprofile = (e) => {
    console.log(e.target.files[0]);
    setProfile(e.target.files[0])
  }
  console.log(profile);

  const handleSubmit = async (e) => {
    e.preventDefault()

    // destructure the inputs
    const { fname, lname, email, mobile, gender, location } = normalInputs

    if (!fname || !lname || !email || !mobile || !gender || !location || !status || !profile) {
      toast.warning("please fill the form completely")
    } else {
      // toast.success("form completly filled")


      const data = new FormData()

      data.append("fname", fname)
      data.append("lname", lname)
      data.append("email", email)
      data.append("mobile", mobile)
      data.append("gender", gender)
      data.append("status", status)
      data.append("profile", profile)
      data.append("location", location)

      const headers = {
        "content-type": "multipart/form-data"
      }

      // make api call

      const result = await addUser(data, headers)

      console.log(result);

      if (result.status === 200) {

        setNormalInputs({
          ...normalInputs,
          fname: "",
          lname: "",
          email: "",
          mobile: "",
          gender: "",
          location: ""
        })

        setStatus("")

        setProfile("")

        setRegisterData(result.data)
        navigate('/')


      }
      else {
        toast.error("request failed")
      }


    }


  }




  const [showSpin, setShowSpin] = useState(true)

  useEffect(() => {

    setTimeout(() => {
      setShowSpin(false)
    }, 2000);
  }, [])


  return (
    <>

      {
        showSpin ?
          <LoadingSpinner /> :


          <div className="container">
            <h2 className="text-center fw-bolder mt-3 text-uppercase">
              Add new Employee Details
            </h2>

            <div className="shadow border rounded p-3 mt-3 ">
              <div className="text-center">
                <img
                  style={{ widows: "70px", height: "70px" }}
                  src={preview ? preview : "https://cdn-icons-png.flaticon.com/512/7085/7085798.png"}
                  alt="Error"
                />
              </div>

              <Form className="mt-3">
                <Row className="mb-3 ">


                  {/* FIRST NAME  */}

                  <FloatingLabel
                    controlId="floatingInputfName" label="First Name" className="mb-3 col-lg-6 text-light ps-2">
                    <Form.Control type="text" name="fname" value={normalInputs.value} onChange={e => getandsetInputs(e)} placeholder=" First Name" />
                  </FloatingLabel>


                  {/* LAST NAME  */}

                  <FloatingLabel
                    controlId="floatingInputlName" label="Last Name" className="mb-3 col-lg-6 text-light   ps-2">
                    <Form.Control type="text" name="lname" value={normalInputs.value} onChange={e => getandsetInputs(e)} placeholder=" Last Name" />
                  </FloatingLabel>


                  {/* EMAil  */}

                  <FloatingLabel
                    controlId="floatingInputEmail" label=" Email" className="mb-3 col-lg-6 text-light  ps-2">
                    <Form.Control type="email" name="email" value={normalInputs.value} onChange={e => getandsetInputs(e)} placeholder=" Email" />
                  </FloatingLabel>


                  {/* Number  */}

                  <FloatingLabel
                    controlId="floatingInputMobile" label=" Mobile" className="mb-3 col-lg-6 text-light ps-2 ">
                    <Form.Control type="text" name="mobile" value={normalInputs.value} onChange={e => getandsetInputs(e)} placeholder=" Mobile" />
                  </FloatingLabel>


                  {/* GENDER  */}

                  <Form.Group className=" mb-3 col-lg-6">
                    <Form.Label>Select Gender</Form.Label>

                    <Form.Check
                      value={"male"}
                      type={"radio"}
                      label={"male"}
                      name="gender"
                      onChange={e => getandsetInputs(e)}
                    />

                    <Form.Check
                      value={"Famale"}
                      type={"radio"}
                      label={"Female"}
                      name="gender"
                      onChange={e => getandsetInputs(e)}
                    />
                  </Form.Group>


                  {/* STATUS  */}

                  <Form.Group className=" mb-3 col-lg-6">
                    <Form.Label>Select Employee status</Form.Label>
                    <Select options={options} onChange={e => setStatus(e.value)} />
                  </Form.Group>



                  {/* PROFILE PIC  */}

                  <Form.Group className=" mb-3 col-lg-6">
                    <Form.Label>Choose a Profile picture</Form.Label>
                    <Form.Control type="file" name="user_profile" onChange={e => getandsetprofile(e)} />

                  </Form.Group>


                  {/* LOCATION  */}


                  <FloatingLabel
                    controlId="floatingInputLocation" label=" Location" className="mb-3 col-lg-6 mt-3 text-light ps-2 ">
                    <Form.Control type="text" name="location" value={normalInputs.value} onChange={e => getandsetInputs(e)} placeholder=" Location" />
                  </FloatingLabel>



<div className="w-100 text-center ">
  
                    <Button type="submit" className="w-50 " onClick={e => handleSubmit(e)} >Submit</Button>
  
</div>

                </Row>
              </Form>
            </div>
          </div>

      }

      <ToastContainer />


    </>
  );
}

export default Add;
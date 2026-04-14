import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { RegSchemas } from '../schemas'
import axios from 'axios'

export default function Registe() {
 
    const [ButtonValue,setButtonValue] = useState("Sign Up")

    const [initialValues,setinitialValues] = useState({
        Name:"",
        Email:"",
        Password:""
    })

    const {values,errors,touched,handleBlur,handleSubmit,resetForm,handleChange} = useFormik({
        initialValues:initialValues,
        validationSchema:RegSchemas,
        onSubmit : async (values) => {
           try {
              const Data ={
                Name:values.Name,
                Email:values.Email,
                Password:values.Password
               }
               setButtonValue("Please Wait...");
               const response = await axios.post("http://localhost:1212/api/register",Data)
               alert(response.data.message);
               console.log(response.res);
               resetForm();
           } catch (error) {
              console.log("error is",error);
           }
        }
    })

  return (
    <>
      <div className='col-md-4 m-auto bg-success py-3 text-center mt-5'>
         <b>Sign Up</b>
      </div>
      <div className='card col-md-4 m-auto'>
        <form method='post' onSubmit={handleSubmit} className="card-body row">
            <div className="col-md-12 mt-2 mb-2">
                <b>Name <label className='text-danger'>{errors.Name && touched.Name ? errors.Name : null}</label></b>
                <input type="text" name="Name" id="Name" value={values.Name} onBlur={handleBlur} onChange={handleChange} className='form-control' />
            </div>
            <div className="col-md-12 mt-2 mb-2">
                <b>Email <label className='text-danger'>{errors.Email && touched.Email ? errors.Email : null}</label></b>
                <input type="email" name="Email" id="Email" value={values.Email} onBlur={handleBlur} onChange={handleChange}   className='form-control' />
            </div>
            <div className="col-md-12 mt-2 mb-2">
                <b>Password <label className='text-danger'>{errors.Password && touched.Password ? errors.Password : null}</label></b>
                <input type="password" name="Password" id="Password"  value={values.Password} onBlur={handleBlur} onChange={handleChange}  className='form-control' />
            </div>
            <div className="col-md-12 mt-3 mb-2">
                <button type="submit" className='btn btn-success w-100'>Sign Up</button>
            </div>
            <Link to="/" style={{ textDecoration: 'none' }} className='text-center'>Sign Up</Link>
        </form>
      </div>
    </>
  )
}

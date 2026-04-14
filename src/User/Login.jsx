import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { LoginSchemas } from '../schemas'
import axios from 'axios';

function Login() {

    const [Buttonvalue,setButtonvalue] = useState("Sign In");
    const [initialValues,setinitialValues] = useState({
        Email:"",
        Password:""
    })
    const {values,errors,touched,handleBlur,handleChange,handleSubmit,resetForm} = useFormik({
      initialValues:initialValues,
      validationSchema:LoginSchemas,
      onSubmit :async(values) => {
        try {
             var Data ={
                Email:values.Email,
                Password:values.Password
            }
            setButtonvalue("Please Wait...");
            const response = await axios.post("http://localhost:1212/api/Login/",Data)
            if(response.data.Status == "Ok")
            {
                alert('Login Successfull');
                console.log("Login data is ", response.data.Result);
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("Username", response.data.Result.Name);
                setTimeout(() => {
                    window.location.href = '/Dashboard';
                }, 1000);
            }
            else{
                console.log("Login data is ", response.data.Result)
            }
        } catch (error) {
            console.log(error);
        }
      }
    })

  return (
    <>
      <div className='col-md-4 m-auto bg-success py-3 text-center'>
         <b>Login</b>
      </div>
      <div className='card col-md-4 m-auto'>
        <form method='post' onSubmit={handleSubmit} className="card-body row">
            <div className="col-md-12 mt-2 mb-2">
                <b>Email <label className='text-danger'>{errors.Email && touched.Email ? errors.Email : null}</label></b>
                <input type="email" name="Email" id="Email" value={values.Email} onBlur={handleBlur} onChange={handleChange}  className='form-control' />
            </div>
            <div className="col-md-12 mt-2 mb-2">
                <b>Password <label className='text-danger'>{errors.Password && touched.Password ? errors.Password : null}</label></b>
                <input type="password" name="Password" id="Password"   value={values.Password} onBlur={handleBlur} onChange={handleChange} className='form-control' />
            </div>
            <div className="col-md-12 mt-3 mb-2">
                <button type="submit" className='btn btn-success w-100'>Sign In</button>
            </div>
           <Link to="/Registen" style={{ textDecoration: 'none' }} className='text-center'>Sign Up</Link>
        </form>
      </div>
    </>
  )
}
export default Login
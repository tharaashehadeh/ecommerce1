
import React, { useContext } from "react";
import Input from "../../pages/Input";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/User.jsx";
export default function sendCode() {
    const navigate = useNavigate();
    let{userToken,setUserToken}= useContext(UserContext);
    const initialValues={
        email:'',
     
    };
    const onSubmit=async (email)=>{
        const {data} =await axios.patch(`https://ecommerce-node4.vercel.app/auth/sendcode`,email);
       if(data.message=='success'){
       localStorage.setItem("userToken",data.token);
       setUserToken(data.token);
       toast.success('Send Code succesfully', {
         position: "top-right",
         autoClose: false,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "dark",
         });
         navigate('/forgetpassword');
        }
        console.log(data);
        }

        const formik = useFormik({
            initialValues,
            onSubmit,
          });

  return (
   <>
     <div className="container">
        <h1 className=" mt-5 text-center">Send Code</h1>
        <form className="mt-5" onSubmit={formik.handleSubmit} encType="multipart/form-data" >
          <Input className="mt-5"
            type={"email"}
            name={"email"}
            id={"email"}
            title={"User Email"}
            value={formik.values.email}
            errors={formik.errors}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            touched={formik.touched}
          />
          <div className=" mt-5 text-center  ">
            <input type="submit" className="  bg-info  text-black"  value="Send Code" />
          </div>
        </form>
      </div>
   </>
  )
}

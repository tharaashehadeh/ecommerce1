import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import './Reviews.css'
import Input from '../../pages/Input';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Reviews() {
  const { productId } = useParams();
  let navigate = useNavigate();
  const initialValues = {
    comment: "",
    rating: "",
  };
  let token = localStorage.getItem("userToken");
  console.log(productId),
    console.log(token);
  const onSubmit = async (comment) => {
    const { data } = await axios.post(

      `https://ecommerce-node4.vercel.app/products/${productId}/review`,
      comment,
      { headers: { Authorization: `Tariq__${token}` } });
    console.log(productId),
      console.log(token);
    console.log(data);
    if (data.message == "success") {
      toast.success(" Add To Comment successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      navigate('/productt');
    }
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validateOnBlur: true,
    validateOnChange: false,
  });

  const inputs = [
    {
      id: "comment",
      type: "text",
      name: "comment",
      title: "Comment",
      value: formik.values.comment,
    },
    {
      id: "rating",
      type: "number",
      name: "rating",
      title: "Rating",
      value: formik.values.rating,
    },
  ];
  const renderInputs = inputs.map((input, index) =>

    <Input
      type={input.type}
      name={input.name}
      id={input.id}
      title={input.title}
      value={input.value}
      key={index}
      errors={formik.errors}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      touched={formik.touched}
    />
  );
  return (
    < div className='bodyy'>
      <div >
        <div className='container  '>
          <h2 className=' Send  text-center'>Send Comment</h2>
          <form onSubmit={formik.handleSubmit} className='mt-4'>
            {renderInputs}
            <div className=" text-center input-group my-4 d-block m-auto w-50 ">
            <input
              type="submit"
              className=" t  text-center submit text-white"
              value="Send Comment"
            />
            </div>
          </form>
        </div>
      </div>
    </div>

  )
}

import axios from "axios";
import React, { useContext, useState } from "react";
import { CartContext } from "../context/Cart";
import { useQuery } from "react-query";
import Input from "../../pages/Input";
import { useFormik } from "formik";
import { UserContext } from "../context/User.jsx";
import { toast } from "react-toastify";
export default function CreateOrder() {
    const { getCartContext } = useContext(CartContext);
    const getCart = async () => {
        const res = await getCartContext();
        return res;
    };
    let token = localStorage.getItem("userToken");
    const initialValues = {
        address: "",
        phone: "",
        couponName: "",
    };
    const onSubmit = async (info) => {
        try {
            const { data } = await axios.post(
                "https://ecommerce-node4.vercel.app/order",
                info,
                { headers: { Authorization: `Tariq__${token}` } }
            );
            console.log(data);
            if (data.message == "success") {
                toast.success("Create Order successfully created!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        } catch (err) {
            console.log(err);
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
            id: "address",
            type: "text",
            name: "address",
            title: "Address",
            value: formik.values.address,
        },
        {
            id: "phone",
            type: "number",
            name: "phone",
            title: "Phone Number",
            value: formik.values.phone,
        },
        {
            id: "couponName",
            type: "text",
            name: "couponName",
            title: "Coupon Name",
            value: formik.values.couponName,
        },
    ];
    const renderInputs = inputs.map((input, index) => (
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
    ));
    const { data, isLoading } = useQuery("cart", getCart);
    console.log(data);
    if (isLoading) {
        return <h2>Loading...</h2>;
    }
    let total = 0;
    return (
        <> 
        <div className="login">
            <div className="container  pt-5">
                <div className="row">
                    <div className="rr row">
                        {data?.products
                            ? data.products.map((product, index) => (
                                <React.Fragment key={index}>
                                    <div className="card mx-1 my-3 col-md-5">
                                        <div className=" mb-2 ">
                                            <div className=" pt-5">
                                                <div className="card-body text-center">
                                                    <h2>{product.details.name}</h2>
                                                    <img className=' imag mt-5 text-center ' src={product.details.mainImage.secure_url} alt="" />
                                                    <h2 className='mt-5'>Discount: {product.details.discount}</h2>
                                                    <h2 className='mt-5'> Price: {product.details.price}</h2>
                                                    <h2 className='mt-5'>Final Price: {product.details.finalPrice}</h2>
                                                    <h2 className='mt-5'>Quantity: {product.quantity}</h2>
                                                </div>
                                                <div className=' text-center'>
                                    {(total = total + product.details.finalPrice)}
                                    </div>
                                            </div>
                                        </div>
                                    </div>
                                  
                                </React.Fragment>
                            ))
                            : ""}
                    </div>
                    <div className="rr">
                        <h2 className="CreateOrder text-center  mt-4">CreateOrder</h2>
                        <form className="name" onSubmit={formik.handleSubmit} >
                            {renderInputs}
                            <div className=" text-center input-group my-4 d-block m-auto w-50 ">
                                <input
                                    type="submit"
                                    className=" t  my-3 submit text-white"
                                    disabled={!formik.isValid}
                                    value="Create Order"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            </div>
        </>
    );
}
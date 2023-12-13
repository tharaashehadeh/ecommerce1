import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react'
import { useQuery } from 'react-query';

export default function GetOrder() {
    const order = async () => {
        try {
          const token = localStorage.getItem("userToken");
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/order`,
            { headers: { Authorization: `Tariq__${token}` } }
            )
            console.log(data);
            return data;
        }
        catch (error) {
            console.log(error)
        }
    }
    const { data, isLoading } = useQuery("getOrder", order);
    console.log(data);
    if (isLoading) {
        return <h2>loading...</h2>
    }
    return (
        <>
            <div className=" col-md-4">{
                data?.orders ?
                    data.orders.map((order, index) => (
                        <div className='col-md-12'key={index}>
                            <div className="pro pt-5">
                                <h2>Address : {order.address}</h2>
                                <h2>Phone : {order.phoneNumber}</h2>
                                <h2>coupon-Name : {order.couponName}</h2>
                                <h2>final-Price : {order.finalPrice}</h2>
                                <h2>payment-Type : {order.paymentType}</h2>
                            </div>
                        </div>
                    )) : <h2> Get Order</h2>}


            </div>
        </>
    )
}

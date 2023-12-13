import React, { useContext } from 'react'
import { CreateOrderSchema } from '../validation/Validation';
import { useFormik } from 'formik';
import Input from '../../pages/Input';
import axios from 'axios';
import { toast } from 'react-toastify';
import { CartContext } from '../context/Cart';
import { useQuery } from 'react-query';

export default function CreateOrder() {

    const { getCartContext } = useContext(CartContext);
    const getCart = async () => {
        const result = await getCartContext();
        return result;
    };

    const initialValues = {
        couponName: '',
        address: '',
        phone: '',
    };

    const onSubmit = async (users) => {
        try {
            const token = localStorage.getItem("userToken");
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/order`, users,

                { headers: { Authorization: `Tariq__${token}` } }
            )
            if (data.message == 'success') {
                toast.success('CreateOrder succesfully', {
                    position: "top-right",
                    autoClose: false,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                navigate('/createOrder');
            }
            console.log(data);
            return data;
        }
        catch (error) {
            console.log(error)
        }
    }
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema: CreateOrderSchema,
    });
    const inputs = [
        {
            id: 'couponName',
            type: 'text',
            name: 'couponName',
            title: 'couponName',
            value: formik.values.couponName,
        },
        {
            id: 'address',
            type: 'text',
            name: 'address',
            title: 'address',
            value: formik.values.address,
        },
        {
            id: 'phone',
            type: 'text',
            name: 'phone',
            title: 'phone',
            value: formik.values.phone,
        },
    ];
    const renderInputs = inputs.map((input, index) =>

        <Input
            type={input.type}
            id={input.id}
            name={input.name}
            title={input.title}
            value={input.value}
            key={index}
            errors={formik.errors}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            touched={formik.touched}
        />
    )
    const { data, isLoading } = useQuery("cart", getCart);
  console.log(data);
  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  let total = 0;
    return (
        <>
            <div className='login'>
                <div className='container bg-info mt-5  '>
                   
                <h2 className='mt-5 text-center'>CreateOrder</h2>
                            <form onSubmit={formik.handleSubmit} className='mt-4'>
                                {renderInputs}
                                <div className='mt-5 text-center '>
                                    <button type="submit" disabled={!formik.isValid}>Submit</button>
                                </div>
                            </form>
                                 <div className=" col-md-4">{
                            data?.products ?
                                data.products.map((product, index) => (
                                    <React.Fragment key={index}>
                                        <div className=" pt-5">
                                            <h2>{product.details.name}</h2>
                                            <img src={product.details.mainImage.secure_url} alt="" />
                                            <h2>Discount:{product.details.discount}</h2>
                                            <h2>Price:{product.details.price}</h2>
                                            <h2>Final Price:{product.details.finalPrice}</h2>
                                            <h2>Quantity:{product.quantity}</h2>
                                        </div>
                                        {(total = total + product.details.finalPrice)}
                                    </React.Fragment>
                                )) :<h2> Cart Is add</h2>}
                              
                         
                        </div>
                        </div>
                   
                </div>
          
        </>
    )
}

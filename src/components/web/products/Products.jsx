import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom'
import { useContext } from 'react';
import { CartContext } from '../context/Cart.jsx';
import { IoMdStarOutline } from "react-icons/io";
import { FaStar } from "react-icons/fa6";
import './Productt.css'
export default function Product() {
    const{productId}=useParams();
     const{addToCartContext}=useContext(CartContext);
    const getProduct=async()=>{
        const {data} =await axios.get(`${import.meta.env.VITE_API_URL}/products/${productId}`);
        console.log(data);
        return data.product;
    }
    const{data,isLoading} = useQuery('product',getProduct);
 
     const addToCart= async (productId)=>{
     const result =await addToCartContext(productId);
     console.log(result);
     }
     
    const getStar = (getRating) => {
      let star = [];
      for(let i=0;i<getRating;i++){
         star.push(<FaStar color="#87ceeb"/>);
      }
      while(star.length<5){
        star.push(<IoMdStarOutline />);
      }
      return star;
    }

    if(isLoading){
        return<p>...Loading</p>
    }
  return (
    <div className='pro'>
    <div className='container'>
        <div className='oo row'>
           
            {data.subImages.map((image, index) => (
               <div className='col-md-4 mt-3'>
                <React.Fragment key={index}>
                  <img className='mt-5 mx-5 imag' src={image.secure_url} />
                </React.Fragment>
                </div>
          ))}
                </div>



            <div className='par col-md-8 text-center'>
            <h2 className='mt-5'>{data.name}</h2>
            <p className='mt-3 text-center'><b>Description:</b> {data.description}</p>
            <p className='mt-3'><b>Price: {`$ ${data.price}`}</b></p>
            <button className='btn btn-outline-info my-3' onClick={()=>addToCart(data._id)}>Add To Cart</button>
            </div>

      
        <h2 className='mt-5 text-center'>Reviews</h2>
        <div className="row ">
          {data.reviews.map((review) => (
           <div className="col-md-3 mt-5">
            <div className="card mb-4 ">
              <img src={review.createdBy.image.secure_url}  className={`review_img mt-3 rounded-circle text-center `}/>
              <div className="card-body text-center">
                <h5 className="card-title">{review.createdBy.userName}</h5>
                <h3 className="card-text text-dark">
                  {getStar(review.rating)}
                </h3>
                <h3 className="card-text">
                  <small className="text-body-secondary">
                    {review.comment}
                  </small>
                </h3>
              </div>
            </div>
         </div>
          ))}
        </div>
        </div>
        <div className="create_Review d-flex justify-content-center ">
        <Link className='mt-4 btn btn-outline-info my-5' to={`review`}>Add To Reviews</Link>
        </div>
        </div>
  

  )
}

import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom'
import'./CategoriesDetails.css'

export default function CategoriesDetails() {
    const{categoryId}=useParams();
    const getCategoryDetails=async()=>{
        const {data} =await axios.get(`${import.meta.env.VITE_API_URL}/products/category/${categoryId}`);
        return data.products;
    }
    const{data,isLoading} = useQuery('category_details',getCategoryDetails);
    if(isLoading){
        return<p>...Loading</p>
    }
  return (
   <div className='container'>
    <div className='row'>
    <div className='col-lg-8'>
    <div className='products'>
    {data.length?data.map((product)=>

   <div className='product' key={product._id}>
    <img className='imgg mt-2 mx-2' src={product.mainImage.secure_url} alt="" />
   <h2 className='mt-2 mx-2'>{product.name}</h2>
   <Link className='mt-2 mx-2' to={`/product/${product._id}`}>details</Link>
   </div>
    ):<h2>no product</h2>}
    </div>
 </div>
 </div>
 </div>
  )
}

import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom'
import'./CategoriesDetails.css'

export default function Categoriesails() {
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
    <div className='bo'>
   <div className='container'>
    <div className='oo row'>
    {data.length?data.map((product)=>
   <div className='col-md-4 mt-5'>
   <div className='product' key={product._id}>
    <img className='imag mt-2 mx-2 text-center' src={product.mainImage.secure_url} alt="" />
   <h2 className='mt-2 mx-2'>{product.name}</h2>
   <Link className='button mt-5 mx-2' to={`/product/${product._id}`}>Details</Link>
   </div>
   </div>
    ):<h2>no product</h2>}
    </div>
 </div>
 
 </div>

  )
}

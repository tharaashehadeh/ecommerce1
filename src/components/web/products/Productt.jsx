import axios from "axios";
import React, { useState, useEffect } from "react";
import './Productt.css'
import { IoMdStarOutline } from "react-icons/io";
import { FaStar } from "react-icons/fa6";
import { Link } from "react-router-dom";
export default function Productt() {
    const [product, setProduct] = useState();
    const [isLoading, setIsLoading] = useState(true);
    let [page, setPage] = useState(1);
    const getProductt = async (page) => {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products?page=${page}`);
        console.log(data);

        console.log(page);
        setProduct(data);
        setIsLoading(false);
    };
    const getPage = async (pageNum) => {
        setPage(pageNum);
        setIsLoading(true);
        await getProductt(pageNum);
    }
    const getRating = (product)=>{
     let sum=0;
     product.reviews.map((review)=>
     sum=sum+review.rating
     );
    return Math.round(sum/product.reviews.length);
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
     
    useEffect(() => {
        getProductt();
    }, []);
    if (isLoading) {
        return <p>...Loading</p>
    }
    return (
        <div className="pro">
        <div className="container">
            <div className=" row">
                {product.products.map((product) => (

                    <div key={product.id} 
                    className=" col-md-4 mt-5">
                         <div className=" card mx-1  ">
                            <div className=" mb-2 ">
                        <div className=" ">
                        <div className="card-body text-center">
                            <img className="imag" src={product.mainImage.secure_url} alt={product.name} />
                            <p className="mt-5">description : {product.description}</p>
                            <h2 className="mt-3">Price : ${product.price}</h2>
                            <h2 className="mt-3">Discount : {product.discount}</h2>
                            <h3 className=" mt-3 ">{product.name}</h3>
                            <h2>Rating : {getRating(product)}</h2>
                            <h2>Stars : {getStar(getRating(product))}</h2>
                            <Link className='button mt-5 mx-2' to={`/product/${product._id}`}>Reviews Details</Link>
                        </div>
                    </div>
                    </div>
                    </div>
                    </div>
                    
                ))}
              
<div className="pagee">
                <nav aria-label="Page navigation example  ">
                    <ul className="pagination ">
                        <li className="page-item">
                            <button className="page-link" onClick={() => getPage(page - 1)} disabled={page === 1}>Previous</button>
                        </li>
                        {Array.from({ length: product.total / product.page }).map((_, index) => (
                            <li className="page-item" key={index}>
                                <button className="page-link" onClick={() => getPage(index + 1)}>
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                        <li className="page-item">
                            <a className="page-link" onClick={() => getPage(page + 1)} disabled={page === product.total / product.page}>Next</a></li>
                    </ul>
                </nav>
            </div>
        </div>
        <div>
        </div>
    </div>
        </div>
        
    );
    
}
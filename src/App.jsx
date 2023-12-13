import {RouterProvider,} from "react-router-dom";
import { CartContexrProvider, CartContext } from './components/web/context/Cart.jsx';
import {router} from"./layout/Routes.jsx";
import { useContext, useEffect } from "react";
import { UserContext } from "./components/web/context/User.jsx";
export default function App() {
   let {setUserToken} =useContext(UserContext);
   let{setCount,getCartContext} =useContext(CartContext);
useEffect(()=>{
   if(localStorage.getItem("userToken")!=null){
     setUserToken(localStorage.getItem("userToken"));
     setCount(getCartContext().count);
   }
   },[])
  return (
  
   
    <RouterProvider router={router} />
 

    
  )
}

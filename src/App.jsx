import {RouterProvider,} from "react-router-dom";
import { CartContexrProvider } from './components/web/context/Cart.jsx';
import {router} from"./layout/Routes.jsx";
import { useContext, useEffect } from "react";
import { UserContext } from "./components/web/context/User.jsx";
export default function App() {
   let {setUserToken} =useContext(UserContext);
useEffect(()=>{
   if(localStorage.getItem("userToken")!=null){
     setUserToken(localStorage.getItem("userToken"));
   }
   },[])
  return (
  
    <CartContexrProvider>
    <RouterProvider router={router} />
    </CartContexrProvider>

    
  )
}

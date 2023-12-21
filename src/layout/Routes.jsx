import {createBrowserRouter} from "react-router-dom";
import Layout from "./Layout";
import Home from "./../components/web/home/Home";
import Categories from "../components/web/categories/Categories";
import DashbordLayout from "./DashbordLayout";
import Register from "../components/web/register/Register.jsx";
import Login from "../components/web/login/Login.jsx";
import Cart from "../components/web/cart/Cart.jsx";
import CategoriesDetails from "../components/web/categories/CategoriesDetails.jsx";
import Product from "../components/web/products/Products.jsx";
import ProtectedRoute from "../components/web/protectedRoute/ProtectedRoute.jsx";
import Profile from "../components/web/profile/Profile.jsx";
import SendCode from "../components/web/sendCode/sendCode.jsx";
import ForgetPassword from "../components/web/forgetPassword/ForgetPassword.jsx";
import UserInfo from "../components/web/profile/UserInfo.jsx";
import UserContact from "../components/web/profile/UserContact.jsx";
import CreateOrder from "../components/web/createOrder/CreateOrder.jsx";
import GetOrder from "../components/web/createOrder/GetOrder.jsx";
import Productt from "../components/web/products/Productt.jsx";
import Reviews from "../components/web/reviews/Reviews.jsx";


export  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
     
      children:[
        {
            path: "register",
            element:<Register/>,
          },
          {
            path: "login",
            element:<Login />,
           
          },
          {
            path: "productt",
            element:<Productt />,
           
          },
          {
            path:"/product/:productId",
            element:<Product/>
          },
          {
            path: "/product/:productId/review",
            element: <Reviews/>,
          },
        
        {
         // path: "/",
         index:true,
          element:<Home/>,
        },
        {
          path: "cart",

          element:
        < ProtectedRoute >
          <Cart/>
          </ProtectedRoute>
        },
        {
          path: "createOrder",
          element:<CreateOrder />,
        },
        {
            path:"profile",

            element:  
            < ProtectedRoute >
             <Profile/>
            </ProtectedRoute>,
            children:[
              {
                index:true,
           
                element:<UserInfo>

                </UserInfo>
              },
              {
               path:'contact',
               element:<UserContact>

               </UserContact>

              },
          
              {
                path:'getorder',
                element:<GetOrder>
                </GetOrder>
 
               },
              
            ]
           
            
          },
          {
            path:"sendCode",
            element:<SendCode/>
          },
          {
            path:"forgetPassword",
            element:<ForgetPassword/>
          },
        {
          path: "categories",
          element:<Categories/>,
        },
        {
          path:"/products/category/:categoryId",
          element:<CategoriesDetails/>
        },
       
        {
          path:"*",
          element:<h2>404 page not found ---- web</h2>,
        }
      ] 
    },


    {
      path:"/dashbord",
      element:<DashbordLayout/>,
     
      children:[
        /*{
          path: "home",
          element:<HomeDashbord/>,
        },
        {
          path:"categories",
          element:<CategoriesDashbord/>
        },*/
        {
          path:"*",
          element:<h2>404 page not found ---- dashbord</h2>,
        }
      ]
    }
   
  ]);
  
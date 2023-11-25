import {createBrowserRouter} from "react-router-dom";
import Layout from "./Layout";
import Home from "./../components/web/home/Home";
import Categories from "../components/web/categories/Categories";
import DashbordLayout from "./DashbordLayout";
import HomeDashbord from './../components/dashbord/home/Home.jsx';
import CategoriesDashbord from'./../components/dashbord/categories/Categories.jsx'
import Register from "../components/web/register/Register .jsx";
export const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
     
      children:[
        {
            path: "register",
            element:<Register/>,
          },
        {
          path: "home",
          element:<Home/>,
        },
        {
          path: "categories",
          element:<Categories/>,
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
        {
          path: "home",
          element:<HomeDashbord/>,
        },
        {
          path:"categories",
          element:<CategoriesDashbord/>
        },
        {
          path:"*",
          element:<h2>404 page not found ---- dashbord</h2>,
        }
      ]
    }
   
  ]);
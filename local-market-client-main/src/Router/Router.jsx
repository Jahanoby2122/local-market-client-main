import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../components/Home";
import Banner from "../components/Banner";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import AddProductForm from "../Pages/AddProductForm";
import PrivateRoute from "../Provider/PrivateRoute";
import DashBord from "../DashBordLayout/DashBord";
import MyProduct from "../DashBordLayout/MyProduct";
import ViewPriceTrands from "../UserPages/ViewPriceTrands";
import AllProduct from "../Pages/AllProduct";
import AllUsers from "../Pages/AllUsers";
import AllProductsAdmin from "../DashBordLayout/AllProductsAdmin";
import ViewDetails from "../Pages/ViewDetails";
import Advertisement from "../Pages/Advertisement";
import ManageWatchlist from "../components/ManageWatchlist";
import Payment from "../DashBord/Payment";
import MyOrderList from "../DashBord/MyOrderList";
import PriceTrendChart from "../DashBord/PriceTrendChart";
import Update from "../DashBord/Update";
import MyAdvertisements from "../DashBord/MyAdvertisements";
import AllAdvertisements from "../DashBord/AllAdvertisements";
import ErrorPages from "../Pages/ErrorPages";
import AllOrders from "../DashBord/AllOrders";
import AboutUs from "../Pages/AboutUs";
import Support from "../Pages/Support";
import UserInfoPanel from "../DashBord/UserInfoPanel";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement:<ErrorPages></ErrorPages>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/banner",
        element: <Banner></Banner>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <Signup></Signup>,
      },
      {
        path:'/allproduct',
        element:<AllProduct></AllProduct>
      },
      {
        path:'/about',
        element:<AboutUs></AboutUs>
      },
      {
        path: '/support',
        element:<Support></Support>
      },
      {
      path: 'viewdetails/:id',
      loader: async ({ params }) => {
        const res = await fetch(`https://local-market-server.vercel.app/products/${params.id}`);
        return res.json();
      },
      element: <PrivateRoute><ViewDetails></ViewDetails></PrivateRoute>
    },
    {
            path:'payment/:id',
            element:<Payment></Payment>
          },
   


      {
        path: "/dashbord",
        element: (
          <PrivateRoute>
            <DashBord></DashBord>
          </PrivateRoute>
        ),
        children: [
          {
            index: true,
            element: <UserInfoPanel></UserInfoPanel>
          },
          {
            path:'myproduct',
            element: <MyProduct></MyProduct>,
          },
          {
            path: "viewprice",
            element: <ViewPriceTrands></ViewPriceTrands>,
          },
          {
            path: "addproduct",
            element: <AddProductForm></AddProductForm>,
          },
          {
            path:'allusers',
            element:<AllUsers></AllUsers>
          },
          {
            path:'allproduct',
            element:<AllProductsAdmin></AllProductsAdmin>
          },
          {
            path:'advertisement',
            element:<Advertisement></Advertisement>
          },
          {
            path:'watchlist',
            element:<ManageWatchlist></ManageWatchlist>
          },
          
          {
            path: 'myorders',
            element: <MyOrderList></MyOrderList>,
          },
          {
            path:'price-trend',
            element:<PriceTrendChart></PriceTrendChart>
          },
          {
            path:'myadvertisements',
            element:<MyAdvertisements></MyAdvertisements>
          },
          {
            path:'alladvertisements',
            element:<AllAdvertisements></AllAdvertisements>
          },
          {
            path:'all-orders',
            element:<AllOrders></AllOrders>
          },
            {
            path:'update/:id',
            element:<Update></Update>
          },
          {
            path:'userinfopannel',
            element:<UserInfoPanel></UserInfoPanel>
          }
         
          
        ],
      },
    ],
  },
]);

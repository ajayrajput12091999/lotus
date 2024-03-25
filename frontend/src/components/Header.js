import React from 'react'
import { Link } from 'react-router-dom';
import { FaRegUserCircle } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa6";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const Header = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") ? JSON.parse(localStorage.getItem("isLoggedIn")) : "";
  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : "";
  const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : "";
  console.log(user);
  const API_URL = 'http://127.0.0.1:8000/api/logout';
  // const [getData, setData] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [geterror, setError] = useState();
  const navigate = useNavigate();

  const submitLogout = async (e) => {
    e.preventDefault();
    try {
      // setLoading(true);
      const response = await axios.post(API_URL,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          token: token
        }
      );
      if (response.data.success === true) {
        // setData(response.data);
        localStorage.setItem("token", "");
        localStorage.setItem("user", "");
        localStorage.setItem("isLoggedIn", JSON.stringify(false));
        setTimeout(() => {
          toast.success(response.data.message);
        }, 700);

        navigate("/login");
      } else {
        if (response.data.message === 'Token expired') {
          localStorage.setItem("token", "");
          localStorage.setItem("user", "");
          localStorage.setItem("isLoggedIn", JSON.stringify(false));
        } else {
          localStorage.setItem("token", "");
          localStorage.setItem("user", "");
          localStorage.setItem("isLoggedIn", JSON.stringify(false));
        }
        // alert(response.data.message);
        setTimeout(() => {
          toast.error(response.data.message);
        }, 700);

        navigate("/home");
        // setError(response.data.message);
      }
      // console.log(JSON.stringify(response.data.message));
      // setLoading(false);

    } catch (error) {
      console.log(error);
      // setLoading(false);
      console.log("error");
      // setError(error);
    }

  }
  return (

    <nav className="navbar navbar-expand-lg navbar-dark bg-dark text-white">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/home">Ecommerce</Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            {(isLoggedIn && isLoggedIn === true && user.role_type === 'user') || !isLoggedIn ?
              <li className="nav-item ml-2">
                <Link className="nav-link text-white btn btn-info" to="/carts"><FaCartPlus /> <span className='badge badge-info' id="cartCount">0</span></Link>
              </li>
              : ""}
            {isLoggedIn && isLoggedIn === true && user.role_type === 'admin' ?
              <>
                <li className="nav-item ml-2">
                  <Link className="nav-link btn btn-warning text-white" to="/myproducts">My Product</Link>
                </li>
                <li className="nav-item ml-2">
                  <Link className="nav-link btn btn-info text-white" to="/orders">Orders</Link>
                </li>
                <li className="nav-item ml-2">
                  <Link className="nav-link btn btn-primary text-white" to="/dashboard">Dashboard</Link>
                </li>
              </>
              : ""}
            {isLoggedIn && isLoggedIn === true && user.role_type === 'user' ?
              <li className="nav-item ml-2">
                <Link className="nav-link btn btn-secondary text-white" to="/myorderhistory">My Order</Link>
              </li>
              : ""}

            {isLoggedIn && isLoggedIn === true ?
              <li className="nav-item">
                <Link className="nav-link text-white btn btn-danger" to="/profile">< FaRegUserCircle /> My Profile</Link>
              </li> : ""}

            {isLoggedIn && isLoggedIn === true ?
              <li className="nav-item">

                <Link type="button" onClick={submitLogout} className='btn btn-success nav-link text-white'>Logout</Link>
              </li>
              :
              <>
                <li className="nav-item">
                  <Link className="nav-link btn btn-danger text-white" to="/signup">Signup</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link btn btn-warning text-white" to="/login">Login</Link>
                </li>
              </>
            }

          </ul>
          <ToastContainer />

        </div>
      </div>
    </nav>
  )
}

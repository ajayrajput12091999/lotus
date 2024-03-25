import React, { useState } from 'react'
import { Layout } from '../../components/Layout'
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [geterror, setError] = useState();
  // const [getData, setData] = useState();
  const navigate = useNavigate();

  const API_URL = "http://127.0.0.1:8000/api/login";
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      setLoading(true);
      const response = await axios.post(API_URL,
        {
          headers: {
            // Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          email: email, password: password
        }
      );
      console.log(JSON.stringify(response.data.message));
      if (response.data.success === true) {
        setLoading(false);
        // setData(response.data);
        localStorage.setItem("token", JSON.stringify(response.data.authorisation.token));
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("isLoggedIn", JSON.stringify(true));

        setTimeout(() => {
          toast.success(response.data.message);
        }, 700);
        navigate("/");
      } else {
        localStorage.setItem("token", "");
        localStorage.setItem("user", "");
        localStorage.setItem("isLoggedIn", JSON.stringify(false));
        setLoading(false);
        toast.error(response.data.message);
        setError(response.data.message);
      }
      // console.log(JSON.stringify(response.data.message));


    } catch (error) {
      localStorage.setItem("token", "");
      localStorage.setItem("user", "");
      localStorage.setItem("isLoggedIn", JSON.stringify(false));
      console.log(error);
      setLoading(false);
      // setError(error);
    }

  }
  return (
    <Layout>
      <div className='container row col-12'>

        <form onSubmit={handleSubmit} className='col-12'>
          <h3 className='text-center mt-3'>Login</h3>

          {loading && loading === true ? <div className='col-md-8 formCenter mt-2 warning'> Loading </div> : ""}
          {geterror && geterror !== '' ? <div className='col-md-8 formCenter mt-2 text-danger'> {geterror} </div> : ""}

          <div className='col-md-8 formCenter mt-2'>
            <label>Email</label>
            <input className='form-control' id="email" type='email' name="email" onChange={(e) => setEmail(e.target.value)} value={email} required />
          </div>
          <div className='col-md-8 formCenter mt-2'>
            <label>Password</label>
            <input className='form-control' id="password" type='password' name="password" onChange={(e) => setPassword(e.target.value)} value={password} required minLength="6" />
          </div>
          <div className='col-md-8 formCenter mt-3'>
            <button type='submit' className='btn btn-primary'>Submit</button>
            <Link className='btn btn-success ml-2' to="/signup">Signup</Link>
          </div>
        </form>

      </div>
    </Layout>
  )
}

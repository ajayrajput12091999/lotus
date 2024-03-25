import React, { useState } from 'react'
import { Layout } from '../../components/Layout'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const SignUp = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role_type, setRoleType] = useState("user");
  const [loading, setLoading] = useState(false);
  const [geterror, setError] = useState();
  // const [getData, setData] = useState();
  const navigate = useNavigate();

  const API_URL = "http://127.0.0.1:8000/api/register";
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
          name: name, email: email, password, role_type
        }
      );
      console.log(JSON.stringify(response.data.message));
      if (response.data.success === true) {
        setLoading(false);
        // setData(response.data);
        // alert(response.data.message);
        setTimeout(() => {
          toast.success(response.data.message);
        }, 700);
        // alert(response.data.message);
        console.log("fdf");
        navigate("/login");
      } else {
        setLoading(false);
        setError(response.data.message);
        toast.error(response.data.message);
      }
      // console.log(JSON.stringify(response.data.message));


    } catch (error) {
      console.log(error);
      setLoading(false);
      // setError(error);
    }

  }
  return (
    <Layout>
      <div className='container row col-12'>

        <form onSubmit={handleSubmit} className='col-12'>
          <h3 className='text-center mt-3'>Sign Up</h3>

          {loading && loading === true ? <div className='col-md-8 formCenter mt-2 warning'> Loading </div> : ""}
          {geterror && geterror !== '' ? <div className='col-md-8 formCenter mt-2 text-danger'> {geterror} </div> : ""}

          <div className='col-md-8 formCenter mt-2'>
            <label>Name</label>
            <input className='form-control' type="text" name="name" id="name" onChange={(e) => setName(e.target.value)} value={name} required />
          </div>
          <div className='col-md-8 formCenter mt-2'>
            <label>Email</label>
            <input className='form-control' id="email" type='email' name="email" onChange={(e) => setEmail(e.target.value)} value={email} required />
          </div>
          <div className='col-md-8 formCenter mt-2'>
            <label>Password</label>
            <input className='form-control' id="password" type='password' name="password" onChange={(e) => setPassword(e.target.value)} value={password} required minLength="6" />
          </div>
          <div className='col-md-8 formCenter mt-2'>
            <label>Role Type</label>
            <select className='form-control mt-2' onChange={(e) => setRoleType(e.target.value)} value={role_type} required data-placeholder="Select Role">
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className='col-md-8 formCenter mt-3'>
            <button type='submit' className='btn btn-primary'>Submit</button>
            <Link className='btn btn-success ml-2' to="/login">Login</Link>
          </div>
        </form>

      </div>
    </Layout>
  )
}

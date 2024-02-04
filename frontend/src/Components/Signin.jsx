import React from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
const Signin = () => {

const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Map 'email' field to 'username' for backend compatibility
      const { email, ...postData } = formData;

      // Make a POST request to the backend with form data
      const response = await axios.post(`${import.meta.env.VITE_EXPRESS_URL}/user/signin`, {
        username: formData.email,  // Map 'email' to 'username'
        password: formData.password,
      }); 
      
      // Extract the JWT token from the response
      const token = response.data.token;

      // Store the token in localStorage
      localStorage.setItem('jwtToken', token);
 console.log('Signin successful:', response.data);


      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);

    } catch (error) {
      // Handle errors
      console.error('Signin error:', error);
    }
  };

  return (
    <div>
        <section className="bg-white">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    <a
      href="#"
      className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
    >
       <img
        className="h-8 w-auto"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Paytm_Logo_%28standalone%29.svg/2560px-Paytm_Logo_%28standalone%29.svg.png"
        alt="logo"
      />
    </a>
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Sign in to your account
        </h1>
        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@company.com"
              required=""
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required=""
            />
          </div>
          <div className="flex items-center justify-between">
            {/* <a
              href="#"
              className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Forgot password?
            </a> */}
          </div>
          <button
            type="submit"
            className="w-full text-white font-bold bg-sky-500 rounded-lg p-2"
          >
            Sign in
          </button>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Don't have an account yet?{" "}
            <Link to="/signup" className='font-medium text-primary-600 hover:underline dark:text-primary-500'>Sign up</Link>
            
          </p>
        </form>
      </div>
    </div>
  </div>
</section>

    </div>
  )
}

export default Signin
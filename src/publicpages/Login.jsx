import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { connectAPIViaPost } from '../services/Post';
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/AuthSlice";
import logo from '../assets/logo/logo.png';
import { userSignUp } from '../constants/Apicalls';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  

const userLogIn = "dfg"

  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      username,
      password,
      
    };
    try {
      const response = await connectAPIViaPost(data, userSignUp);
      console.log(response,"response-01");
      
      if (response.status === 200) {

        setError("");
        localStorage.clear();
        localStorage.setItem('access_token', response.data.access);
        const userdata = {
          accessToken: response.data.access,
          // username:response.data.username,
          // email:response.data.email
        };
        
  
        if (userdata && userdata.accessToken) {
          dispatch(setCredentials(userdata));
        } else {
        }
  
        localStorage.setItem('username', username);
  
        navigate('/cars/car-list/');
      }
    } catch (error) {
      if (error.response) {
        console.error('Error response from API:', error.response);
        const errorMessage = error.response.data.error || 'An error occurred. Please try again.';
        setError(errorMessage);



      } else {
        console.error('Network error:', error);
        setError('A network error occurred. Please try again.');



      }
    }
  };

  return (
    <>
      <div className='bg-gradient-to-r from-[#B41749] to-[#387BBF] '>
        <div className="min-h-screen w-full h-full">
          <div className="md:flex">
            <div className="md:w-1/2 w-full h-full flex justify-center items-center md:mt-14 ">
            
              <img src={logo} alt="" />

            </div>
            <div className="md:w-1/2 w-full flex justify-center items-end md:mt-24">
              <div className='bg-white bg-opacity-10 md:h-[540.66px] h-[500px] w-[350px] md:w-[410px] rounded-xl border border-white border-opacity-15 md:mb-0 mb-16'>
                <div className='md:p-10 p-4'>
                  <div className='flex justify-center items-center p-1 mb-4'>
                    <img className='w-36 h-32' src={logo} alt="" />
                  </div>
                  <div className='mb-4 flex justify-start'>
                    <h1 className='text-4xl font-bold font-poppins text-white'>Log in</h1>
                  </div>
                  <div className='text-white'>
                    <div className="flex flex-col">
                      <div className="mb-4">
                        <label className="px-1 text-sm mb-2 flex justify-start" htmlFor="username">
                       Username
                        </label>
                        <input
                          className='text-black rounded w-full py-2 px-3'
                          id="email"
                          type="text"
                          placeholder="Enter Username"
                          onChange={(e) => {
                            setUsername(e.target.value);
                            setError(null);
                          }}
                        />
                      </div>
                      <div className="py-2 mb-[40px]">
                        <div className='flex justify-between'>
                          <span className="px-1 text-sm mb-2">Password</span>
                        </div>
                        <div className="relative text-grey-darker">
                          <input
                            placeholder="Enter your password"
                            type={showPassword ? 'text' : 'password'}
                            className='text-black rounded w-full py-2 px-3 text-grey-darker'
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                            {showPassword ? (
                              <FaEyeSlash
                                className="h-6 text-gray-400 cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                              />
                            ) : (
                              <FaEye
                                className="h-6 text-gray-400 cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                              />
                            )}
                          </div>
                        </div>
                        {/* <span className="px-1 text-sm text-white hover:cursor-pointer"
                          onClick={() => navigate('/forgotpassword')}>Forgot Password?</span> */}
                      </div>
                      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
                      <div className='rounded-md h-[40px] flex justify-center text-white md:mb-4 mb-3 bg-[#003465]'>
                        <button className='flex justify-center items-center' onClick={handleSubmit}>
                          <div className='pr-[10px]'>Sign in</div>
                        </button>
                      </div>
                      {/* <div className='flex justify-center'>
                        <p className='md:text-sm text-xs'>
                          Don't have an account?{' '}
                          <button className='font-poppins font-semibold' onClick={() => navigate('/signup')}>
                            Create account
                          </button>
                        </p>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;

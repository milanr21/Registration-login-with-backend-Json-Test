import { useEffect, useState } from 'react';
import loginImg from '../assets/login.jpg';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, usernameUpdate] = useState('');
  const [password, passwordUpdate] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.clear();
  });

  const proceedLogin = (e) => {
    e.preventDefault();
    if (validate()) {
      fetch('http://localhost:3000/user/' + username)
        .then((res) => {
          return res.json();
        })
        .then((resp) => {
          console.log(resp);
          if (Object.keys(resp).length === 0) {
            toast.error('Please enter a valid username');
          } else {
            if (resp.password === password) {
              toast.success('Login Sucessfull!!!!');
              sessionStorage.setItem('username', username);
              navigate('/');
            } else {
              toast.error('Please Enter valid crediatials');
            }
          }
        })
        .catch((err) => {
          toast.error('Login Failed due to : ' + err.messsage);
        });
    }
  };

  const validate = () => {
    let result = true;
    if (username === '' || username === null) {
      result = false;
      toast.warning('Please Enter Username');
    }
    if (password === '' || password === null) {
      result = false;
      toast.warning('Please Enter Password');
    }
    return result;
  };

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
      <div className='hidden sm:block'>
        <img className='w-full h-full object-cover' src={loginImg} alt='' />
      </div>

      <div className='bg-indigo-400 flex flex-col justify-center'>
        <form
          onSubmit={proceedLogin}
          className='max-w-[315px] w-full mx-auto bg-indigo-500 p-8 px-8 rounded-lg '
          action=''
        >
          <h2 className='uppercase text-4xl text-gray-100 dark:text-white font-bold text-center'>
            sign in
          </h2>
          <div className='flex flex-col text-gray-100 py-3'>
            <label htmlFor='username'>User Name</label>
            <input
              className='rounded-lg bg-indigo-900 mt-2 p-2 focus:border-red-500 
              focus:bg-gray-800 
              focus:outline-none'
              type='text'
              name='username'
              id='username'
              value={username}
              onChange={(e) => usernameUpdate(e.target.value)}
            />
          </div>
          <div className='flex flex-col text-gray-100 py-3 mt-2'>
            <label htmlFor='password'>Password</label>
            <input
              className='rounded-lg bg-indigo-900 mt-2 p-2 focus:border-red-500 focus:bg-gray-800'
              type='password'
              name='password'
              id='password'
              value={password}
              onChange={(e) => passwordUpdate(e.target.value)}
            />
          </div>
          <div className='flex justify-evenly py-2 text-gray-300 '>
            <p className='flex flex-row mr-5'>
              <input className='mr-2' type='checkbox' />
              Remember Me
            </p>
            <p>Forgot Password</p>
          </div>
          <button className='rounded-lg w-full my-5 py-3 bg-teal-500 shadow-lg shadow-teal-500/50 uppercase text-gray-100 hover:shadow-teal-400 font-bold '>
            Sign In
          </button>
          <p className='text-gray-100'>
            Not a user yet ?
            <Link to='/Register' className='uppercase underline '>
              <span className='ml-3'>Register</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

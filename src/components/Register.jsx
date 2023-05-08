import { useState } from 'react';
import RegisterImg from '../assets/registration.jpg';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [id, idChange] = useState('');
  const [name, nameChange] = useState('');
  const [password, passwordChange] = useState('');
  const [email, emailChange] = useState('');
  const [phone, phoneChange] = useState('');
  const [country, countryChange] = useState('Nepal');
  const [address, addressChange] = useState('');

  const isValidate = () => {
    let isproceed = true;
    let errorMessage = 'Please enter the value in ';
    if (id === null || id === '') {
      isproceed = false;
      errorMessage += 'username ';
    }
    if (name === null || name === '') {
      isproceed = false;
      errorMessage += 'FullName ';
    }
    if (password === null || password === '') {
      isproceed = false;
      errorMessage += 'password ';
    }
    if (email === null || email === '') {
      isproceed = false;
      errorMessage += 'Email ';
    }

    if (!isproceed) {
      toast.warning(errorMessage);
    }
    return isproceed;
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let regObj = { id, name, password, email, phone, country, address };
    // console.log(regObj);
    if (isValidate()) {
      fetch('http://localhost:3000/user', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(regObj),
      })
        .then((res) => {
          toast.success('Registered Sucessfully');
          navigate('/login');
        })
        .catch((err) => {
          toast.error('Failed :' + err.message);
        });
    }
  };

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
      <div className='hidden sm:block'>
        <img src={RegisterImg} className='w-full h-full object-cover' />
      </div>
      <div className='bg-indigo-400 flex flex-col justify-center'>
        <form
          onSubmit={handleSubmit}
          className='max-w-[315px] w-full mx-auto bg-indigo-500 p-8 px-8 rounded-lg '
        >
          <h2 className='uppercase text-4xl text-gray-100 dark:text-white font-bold text-center'>
            Registration
          </h2>
          <div className='flex flex-col text-gray-100 mt-2'>
            <label className='mb-2' htmlFor=''>
              User Name
            </label>
            <input
              className='mb-2 rounded-lg  focus:border-red-500 
               text-gray-700
              focus:outline-none pl-3'
              type='text'
              name='username'
              id='username'
              value={id}
              onChange={(e) => idChange(e.target.value)}
            />

            <label className='mb-2' htmlFor='password'>
              Password
            </label>
            <input
              className='mb-2 rounded-lg  focus:border-red-500 
              text-gray-700
              focus:outline-none pl-3'
              type='password'
              name='password'
              id='password'
              value={password}
              onChange={(e) => passwordChange(e.target.value)}
            />
          </div>
          <div className='flex flex-col text-gray-100'>
            <label className='mb-2' htmlFor='fullname'>
              Full Name
            </label>
            <input
              className='mb-2 rounded-lg  focus:border-red-500 
              text-gray-700
              focus:outline-none pl-3'
              type='text'
              name='fullname'
              id='fullname'
              value={name}
              onChange={(e) => nameChange(e.target.value)}
            />

            <label className='mb-2' htmlFor='Email'>
              Email
            </label>
            <input
              className='mb-2 rounded-lg  focus:border-red-500 
              text-gray-700
              focus:outline-none pl-3'
              type='email'
              name='email'
              id='email'
              value={email}
              onChange={(e) => emailChange(e.target.value)}
            />
          </div>
          <div className='flex flex-col text-gray-100'>
            <label className='mb-2' htmlFor='phone'>
              Phone Number
            </label>
            <input
              className='mb-2 rounded-lg  focus:border-red-500 
              text-gray-700 
              focus:outline-none pl-3'
              type='text'
              name='phone'
              id='phone'
              value={phone}
              onChange={(e) => phoneChange(e.target.value)}
            />

            <label className='mb-2' htmlFor='country '>
              Country
            </label>
            <select
              className='form-control mb-2 rounded-lg cursor-pointer  focus:border-red-500 
              text-gray-700
              focus:outline-none pl-3'
              value={country}
              onChange={(e) => countryChange(e.target.value)}
            >
              <option value='nepal'>Nepal</option>
              <option value='usa'>USA</option>
              <option value='singapore'>Singapore</option>
            </select>
          </div>
          <div className='flex flex-col text-gray-100 '>
            <label className='mb-2 ' htmlFor='address'>
              Address
            </label>
            <input
              className='mb-2 rounded-lg  focus:border-red-500 
              text-gray-700
              focus:outline-none pl-3'
              type='text'
              name='address'
              id='address'
              value={address}
              onChange={(e) => addressChange(e.target.value)}
            />
          </div>
          <button className='rounded-lg w-full my-5 py-3 bg-teal-500 shadow-lg shadow-teal-500/50 uppercase text-gray-100 hover:shadow-teal-400 font-bold '>
            Register
          </button>
          <p className='text-gray-100'>
            Already a user ?
            <Link to='/Login' className='uppercase underline '>
              <span className='ml-3'>Login</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;

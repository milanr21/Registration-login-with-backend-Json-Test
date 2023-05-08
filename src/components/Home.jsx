import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Home = () => {
  const usenavigate = useNavigate();
  useEffect(() => {
    let username = sessionStorage.getItem('username');
    if (username === '' || username === null) {
      toast.error('Redirecting to Login Page');
      usenavigate('/login');
    }
  }, []);

  return (
    <div>
      <div className='w-full bg-purple-500 h-14 flex'>
        <Link to={'/'}>Home</Link>
        <Link className='float-right' to={'/login'}>
          Logout
        </Link>
      </div>
      <h1>Welcome</h1>
    </div>
  );
};

export default Home;

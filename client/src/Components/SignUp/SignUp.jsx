import { Input, Text, useToast } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { FaEyeSlash } from 'react-icons/fa';
import { signUpUser } from '../../Service/api';
const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showError, setShowError] = useState(false);

  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setShowError(false), 5000);
  }, [showError]);

  const handlePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (confirmPassword !== password) {
      setShowError(true);
      return;
    }

    const data = {
      Name: username,
      email: email,
      password: password,
    };

    const response = await signUpUser(data);

    if (response.status === 409) {
      toast({
        title: 'Email',
        description: 'Email is already Exist',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    }

    if (response.status === 200) {
      toast({
        title: 'Account created.',
        description: "We've created your account for you.",
        status: 'success',
        duration: 4000,
        isClosable: true,
      });

      navigate('/Login');
    }
  };

  return (
    <div
      className='flex min-h-full flex-col justify-center px-10 py-6 lg:px-8 bg-slate-100 max-w-96 mx-auto 
    mt-11 rounded-md drop-shadow-lg'
    >
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <h2 className='mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
          Sign Up to your account
        </h2>
      </div>

      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-sm'>
        <form className='space-y-5' onSubmit={(e) => submitHandler(e)}>
          <div>
            <label
              htmlFor='name'
              className='block text-sm font-medium leading-6 text-gray-900'
            >
              Username
            </label>
            <div className='mt-2'>
              <input
                id='name'
                name='name'
                type='text'
                value={username}
                required
                className='block w-full rounded-md border-0 py-1.5  px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor='email'
              className='block text-sm font-medium leading-6 text-gray-900'
            >
              Email address
            </label>
            <div className='mt-2'>
              <input
                id='email'
                name='email'
                type='email'
                value={email}
                autoComplete='email'
                required
                className='block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
          </div>

          <div>
            <div className='flex items-center justify-between'>
              <label
                htmlFor='password'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Password
              </label>
              {showPassword ? (
                <FaEyeSlash
                  className='relative top-10 right-2 cursor-pointer'
                  onClick={handlePassword}
                />
              ) : (
                <FaEye
                  className='relative top-10 right-2 cursor-pointer'
                  onClick={handlePassword}
                />
              )}
            </div>

            <div className='mt-2 flex items-center '>
              <input
                id='password'
                name='password'
                type={showPassword ? 'text' : 'password'}
                autoComplete='current-password'
                value={password}
                required
                className='block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          </div>

          <div>
            <div className='flex items-center justify-between'>
              <label
                htmlFor='password'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Confirm Password
              </label>
              {showConfirmPassword ? (
                <FaEyeSlash
                  className='relative top-10 right-2 cursor-pointer'
                  onClick={handleConfirmPassword}
                />
              ) : (
                <FaEye
                  className='relative top-10 right-2 cursor-pointer'
                  onClick={handleConfirmPassword}
                />
              )}
            </div>
            <div className='mt-2'>
              <input
                id='password'
                name='password'
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                autoComplete='current-password'
                required
                className='block w-full rounded-md border-0 py-1.5  px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />

              {showError ? (
                <Text color={'red'}>Confirm password should match.</Text>
              ) : (
                ''
              )}
            </div>
          </div>
          <div>
            <button
              type='submit'
              className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              Sign Up
            </button>
          </div>
        </form>

        <Text textAlign={'center'} marginTop={'10px'}>
          Already User ?{' '}
          <Link to={'/Login'} className='text-blue-600 underline'>
            SignIn
          </Link>
        </Text>
      </div>
    </div>
  );
};

export default SignUp;

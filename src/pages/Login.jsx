import React, { useState } from 'react';

const Login = () => {
    const [currentState, setCurrentState] = useState('Sign Up');

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt14 gap-4 text-gray-800'>
            <div className='inline-flex items-center gap-2 mb-2 mt-10'>
                <p className='prata-regular text-3xl'>{currentState}</p>
                <hr className='border-none h-[1.5px] w-8 bg-gray-800'/>
            </div>

            {currentState === 'Login' ? '' :  <input required type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Name' />}
            <input required type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Your@email.com' />
            <input required type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Password' />
            <div className='w-full flex justify-between text-sm mt-[8px]'>
                <p className='prata-regular'>{currentState === 'Login' ? 'Forgot Password?' : 'Already have an account?'}</p>
                <p onClick={() => currentState === 'Login' ? setCurrentState('Sign Up') : setCurrentState('Login')} className='prata-regular cursor-pointer'>{currentState === 'Login' ? 'Create an account' : 'Login Here'}</p>
            </div>

            <button className='bg-black text-white font-light px-8 py-2 mt-4'>{currentState === 'Login' ? 'Sign In' : 'Sign Up'}</button>


            
        </form>
    );
};

export default Login;
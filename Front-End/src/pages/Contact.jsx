import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/frontend_assets/assets';
import NewsLetterBox from '../components/NewsLetterBox';

const Contact = () => {
    return (
        <div>
            <div className='text-center border-gray-200 text-2xl pt-10 border-t'>
            <Title text1={'Contact'} text2={'Us'}></Title>
            </div>

            <div className='mt-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
                <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="" />
                <div className='flex flex-col justify-center items-start gap-6'>
                    <p className='font-semibold text-xl text-gray-600'>Our Store</p>
                    <p className='text-gray-500'>53 Miramar Cres <br />Scarborough, ON M1M 1M1</p>
                    <p className='text-gray-500'>tel: 416-555-5555 <br />Email: 9FtFt@example.com</p>
                    <p className='font-semibold text-gray-600 text-xl'>Careers at Forever</p>
                    <p className='text-gray-500'> Learn more about our teams and job opportunities</p>
                    <button className='border border-black hover:bg-black hover:text-white px-6 py-2 transition-all duration-500'>Explore Careers</button>
                </div>
            </div>
            <NewsLetterBox />
        </div>
    );
};

export default Contact;
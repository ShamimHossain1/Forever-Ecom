import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';

const CartTotal = () => {
    const {currency, delivery_fee, getCartAmount} = useContext(ShopContext);
    return (
        <div className='w-full text-gray-600 font-semibold'>
            <div className='text-2xl'>
                <Title text1={'CART'} text2={'TOTAL'}></Title>

            </div>
            <div className='flex flex-col gap-2 mt-2 text-sm'>
                <div className='flex justify-between'>
                    <div>Subtotal</div>
                    <div>{currency}{getCartAmount()}.00</div>
                </div>
                <hr className='text-gray-200' />
                <div className='flex justify-between'>
                    <div>Delivery Fee</div>
                    <div>{currency}{delivery_fee}.00</div>
                    
                </div>
                <hr className='text-gray-200' />
                <div className='flex justify-between'>
                    <div>Total</div>
                    <div>{currency}{getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}.00</div>

                </div>

            </div>

            
        </div>
    );
};

export default CartTotal;
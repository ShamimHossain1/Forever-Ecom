import React from 'react';
import assets from '../assets/assets';

const Add = () => {
    return (
        <>
            <form> 
                <div>
                    <p>Upload Image</p>
                </div>
                <div>
                    <label htmlFor="">
                        <img src={assets.upload_area} alt="" />
                        <input type="file" id='image1' hidden  />
                    </label>
                </div>
            </form >
        </>
    );
};

export default Add;
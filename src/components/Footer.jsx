import React from "react";
import { assets } from "../assets/frontend_assets/assets";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img src={assets.logo} className="mb-5 w-32" alt="" />
          <p className="w-full md:w-2/3 text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid
            aspernatur architecto placeat facilis dignissimos veritatis
            explicabo itaque provident similique vel enim nisi amet ea cum ut ab
            earum eius sequi magnam alias suscipit, rem eligendi vero
            necessitatibus! Quisquam, ut veritatis?
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        <div>
            <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
            <ul className="flex flex-col gap-1 text-gray-600">
                <li>Address: 123, Main Street, New York</li>
                <li>Phone: +1 123-456-7890</li>
                <li>Email: 0pYB8@example.com</li>
            </ul>
        </div>

      </div>

      <div>
        <hr className="border-t border-gray-200" />
        <p className="text-xs text-gray-600 text-center py-5">
          &copy; 2024@ forever.com - All Right Reserved..
        </p>
      </div>


    </div>
  );
};

export default Footer;

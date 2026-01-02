import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t border-gray-200">
        <Title text1={"About"} text2={"Us"}></Title>
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
          <img
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione,
            aspernatur natus, consectetur accusamus facilis ab magni quos rerum
            minus repellat minima et animi ut commodi vero alias voluptates
            sequi sed quibusdam soluta magnam autem! Atque aliquam porro
            possimus sint voluptates quos earum consequuntur commodi pariatur
            laborum, perferendis, natus hic omnis!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta atque
            in porro aliquam sint nulla ducimus alias hic rerum nam iste
            pariatur ex sunt, ipsum nostrum exercitationem itaque quia laborum.
            Nam amet alias autem illum architecto quibusdam, vero officia quia.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus,
            totam! Adipisci nostrum quod ratione numquam tempore quisquam,
            mollitia dignissimos expedita? Iusto dolores nemo, doloribus
            provident quos magni harum minus sequi expedita odio corrupti cumque
            ullam. Nisi aut possimus laborum id fugiat. Perferendis amet quidem
            iste quae laborum cumque facere labore.
          </p>
        </div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={"WHY"} text2={"CHOOSE US"}></Title>

      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border border-gray-200 px-10 md:px-16 py-8 sm:py-10 flex flex-col gap-5'>
            <b>Exceptional Customer Service:</b>
            <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur sit eius recusandae doloribus laudantium voluptate.</p>
        </div>
        <div className='border border-gray-200 px-10 md:px-16 py-8 sm:py-10 flex flex-col gap-5'>
            <b>Convenience:</b>
            <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur sit eius recusandae doloribus laudantium voluptate.</p>
        </div>
        <div className='border border-gray-200 px-10 md:px-16 py-8 sm:py-10 flex flex-col gap-5'>
            <b>Quality Assurance:</b>
            <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur sit eius recusandae doloribus laudantium voluptate.</p>
        </div>
      </div>
    </div>
  );
};

export default About;

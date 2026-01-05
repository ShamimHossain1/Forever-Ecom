import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();

  const { products, currency, addToCart } = useContext(ShopContext);

  const [productData, setProductData] = useState(false);
  const [img, setImg] = useState("");
  const [size, setSize] = useState("");
  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        // console.log(item);
        setImg(item.image[0]);

        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [productId]);

  return productData ? (
    <div className="border-t border-gray-300 pt-10 transition-opacity ease in duration-500 opacity-100">
      {/* --------------Products data ------------------- */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* --------------Product Image ------------------- */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                src={item}
                alt=""
                key={index}
                className="w-[24%] sm:w-full cursor-pointer sm:mb-3 flex-shrink-0"
                onClick={() => setImg(item)}
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto " src={img} alt="" />
          </div>
        </div>

        {/* -------------------Product Details------------------ */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="" className="w-3 5" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2 sm:w-1/3">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  key={index}
                  className={`border-2 w-full text-gray-600 py-2 px-4 bg-gray-100 ${
                    item === size ? "border-blue-400" : "border-white"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button onClick={() => addToCart(productData._id, size)} className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700">
            ADD TO CART
          </button>
          <hr className="mt-8 border-t border-gray-300 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original Product</p>
            <p>Free Shipping</p>
            <p>Easy 30 day returns and exchanges</p>
            <p>Secure Payment</p>
          </div>
        </div>
      </div>
      {/* ---------Description & Review --------- */}
      <div className="mt-20">
              <div className="flex"> <b className="border border-gray-200 px-5 py-3 text-sm">Description</b>
              <p className="border border-gray-200 px-5 py-3 text-sm">Reviews (123)</p></div>
      </div>
      <div className="flex flex-col gap-4 border border-gray-200 px-6 py-6 text-sm text-gray-500">
<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illum quas ad nesciunt, optio explicabo repellendus tempora ipsam blanditiis autem magni minima temporibus reiciendis, cupiditate placeat impedit iusto vel odio deleniti? Cupiditate officiis, recusandae odio molestiae minima hic commodi in excepturi esse mollitia unde amet dolor ipsum dolorum quisquam ullam tempore distinctio est rem quia deserunt! Id consequuntur culpa aut ea?</p>
<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam architecto fugit corrupti assumenda eum et enim, tempore soluta. Aut consequatur rerum officiis temporibus fuga quo optio porro, eos fugiat earum. Praesentium iste aliquam soluta corrupti commodi magni rem, possimus odio architecto nihil impedit fugiat inventore quibusdam dignissimos dolorem voluptas omnis cupiditate dicta maiores laudantium ex! Repudiandae, nobis deleniti odit porro ea cum quisquam molestias harum, voluptates deserunt aperiam cumque ullam, doloremque eaque alias? Numquam, iste.</p>
      </div>

              {/*--------------------- Display Related Products-----------------  */}
<RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : (
    <div className="opacity-0"> </div>
  );
};

export default Product;

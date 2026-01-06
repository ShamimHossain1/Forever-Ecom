// function for add product
import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      size,
      bestseller,
    } = req.body;
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (image) => image !== undefined
    );

    // console.log(images);

    // console.log(image1, image2, image3, image4);

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    // Save data to mongoDB

    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      size: JSON.parse(size),
      bestseller: bestseller === "true" ? true : false,
      image: imagesUrl,
      date: Date.now(),
    };
    console.log(productData);
    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: "Product added successfully" });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};

// Function for list products
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};

// function for removing products
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product removed successfully" });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};

// function for edit products
const editProduct = async (req, res) => {
  try {
    const {
      id,
      name,
      description,
      price,
      category,
      subCategory,
      size,
      bestseller,
    } = req.body;

    // prepare update object
    const updateData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      size: typeof size === "string" ? JSON.parse(size) : size,
      bestseller: bestseller === "true" || bestseller === true,
    };

    // determine image array
    let finalImages = [];

    // existing images kept by client
    const existing = req.body.existing ? JSON.parse(req.body.existing) : [];

    // optional new images
    const imageFiles = [
      req.files?.image1?.[0],
      req.files?.image2?.[0],
      req.files?.image3?.[0],
      req.files?.image4?.[0],
    ].filter(Boolean);

    if (imageFiles.length) {
      const uploadedUrls = await Promise.all(
        imageFiles.map((file) =>
          cloudinary.uploader
            .upload(file.path, { resource_type: "image" })
            .then((r) => r.secure_url)
        )
      );
      finalImages = [...existing, ...uploadedUrls];
    } else {
      finalImages = existing;
    }

    updateData.image = finalImages || existing;

    await productModel.findByIdAndUpdate(id, updateData);
    return res.json({ success: true, message: "Product updated successfully" });
  } catch (err) {
    console.log(err);
    return res.json({ success: false, message: err.message });
  }
};

// function for single product info

const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.json({ success: true, product });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};

export { addProduct, listProducts, removeProduct, singleProduct, editProduct };

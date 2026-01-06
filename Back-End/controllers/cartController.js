// Add products to user cart

const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;
    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;
    if (cartData[itemId]) {
      if (carData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Item added to cart" });
  } catch (err) {
    console.log(err);
  }
};

// Update user cart
const updateCart = async (req, res) => {
  try {
    const { userid, itemId, size, quantity } = req.body;
    const userData = await userModel.findById(userid);
    let cartData = await userData.cartData;
    cartData[itemId][size] = quantity;
    await userModel.findByIdAndUpdate(userid, { cartData });
    res.json({ success: true, message: "Cart updated successfully" });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};

// get user cart data
const getCart = async (req, res) => {};

export { addToCart, updateCart, getCart };

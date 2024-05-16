import axios from "axios";

export const getOrders = async (authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/admin/orders`, {
    headers: {
      authtoken,
    },
  });

export const changeStatus = async (orderId, orderStatus, authtoken) =>
  await axios.put(
    `${process.env.REACT_APP_API}/admin/order-status`,
    { orderId, orderStatus },
    {
      headers: {
        authtoken,
      },
    }
  );

// Fetch product details by productId
const getProductDetails = async (productId) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API}/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product details:', error);
    throw error;
  }
};

export const getMostOrderedProducts = async (authtoken) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API}/admin/orders`, {
      headers: {
        authtoken,
      },
    });

    // Extract orders data from the response
    const orders = response.data;

    // Aggregate products and their quantities
    const productMap = {};
    orders.forEach(order => {
      order.products.forEach(product => {
        const productId = product.product._id;  // Ensure productId is a string or number
        const count = product.count;
        if (productMap[productId]) {
          productMap[productId] += count;
        } else {
          productMap[productId] = count;
        }
      });
    });

    // Convert the productMap to an array
    const productArray = Object.keys(productMap).map(productId => ({
      productId,
      quantity: productMap[productId],
    }));

    // Get product details and merge with the quantities
    const productDetailsMap = {};
    await Promise.all(productArray.map(async ({ productId, quantity }) => {
      const productDetailsArray = await getProductDetails(productId);

      // Ensure productDetailsArray is not empty and is an array
      if (!productDetailsArray || productDetailsArray.length === 0) {
        return;
      }

      // Assuming productDetailsArray contains a single product detail object
      const productDetails = productDetailsArray[0];

      // Combine product details with quantity
      if (productDetailsMap[productId]) {
        productDetailsMap[productId].quantity += quantity;
      } else {
        productDetailsMap[productId] = {
          _id: productDetails._id,
          title: productDetails.title, // Assuming there's a 'title' property in the product details
          description: productDetails.description,
          quantity
        };
      }
    }));

    // Convert the productDetailsMap to an array
    const mostOrderedProducts = Object.values(productDetailsMap);

    return mostOrderedProducts;
  } catch (error) {
    console.error('Error fetching most ordered products:', error);
    throw error; // Throw the error for handling in the component
  }
};
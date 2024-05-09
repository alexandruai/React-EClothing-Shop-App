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
        const { product: productId, count } = product;
        if (productMap[productId]) {
          productMap[productId] += count;
        } else {
          productMap[productId] = count;
        }
      });
    });

    // Sort the products by their total orders
    const sortedProducts = Object.entries(productMap).sort((a, b) => b[1] - a[1]);

    // Return the top most ordered products
    const mostOrderedProducts = sortedProducts.slice(0, 5).map(([productId, quantity]) => ({
      productId,
      quantity,
    }));

    return mostOrderedProducts;
  } catch (error) {
    console.error('Error fetching most ordered products:', error);
    throw error; // Throw the error for handling in the component
  }
};

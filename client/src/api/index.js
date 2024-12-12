import axios from "axios";

const API = axios.create({
  baseURL: "https://busybuy-363a.onrender.com/api/",
});

export const userSignUp = async (data) => await API.post("/user/signup", data,{ withCredentials: true });
export const userSignIn = async (data) => await API.post("/user/signin", data,{ withCredentials: true });

//Products
export const getAllProduct = async (filter) =>
  await API.get(`/products?${filter}`);

export const getProductDetails = async (id) => await API.get(`/products/${id}`);

//Cart

export const getCart = async (token) =>
  await API.get("/user/cart", {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });

export const addToCart = async (token, data) =>
  await API.post(`/user/cart/`, data, {
    headers: { Authorization: `Bearer ${token}` },
     withCredentials: true,
  });

export const removeFromCart = async (token, data) =>
  await API.patch(`/user/cart/`, data, {
    headers: { Authorization: `Bearer ${token}` },
     withCredentials: true,
  });

//Favourites

export const getFavourite = async (token) =>
  await API.get(`/user/favorite`, {
    headers: { Authorization: `Bearer ${token}` },
     withCredentials: true,
  });

export const addToFavourite = async (token, data) =>
  await API.post(`/user/favorite/`, data, {
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({ productId: 'someProductId' }),
     withCredentials: true,
  });

export const removeFromFavourite = async (token, data) =>
  await API.patch(`/user/favorite/`, data, {
    headers: { Authorization: `Bearer ${token}` },
     withCredentials: true,
  });

//Orders

export const placeOrder = async (token, data) =>
  await API.post(`/user/order/`, data, {
    headers: { Authorization: `Bearer ${token}` },
     withCredentials: true,
  });

export const getOrders = async (token) =>
  await API.get(`/user/order`, {
    headers: { Authorization: `Bearer ${token}` },
     withCredentials: true,
  });

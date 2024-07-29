import axios from 'axios';

const API = axios.create({
    baseURL: "http://localhost:9000/api",
});

export const userSignUp = async (data) => await API.post("/user/signup",data);
export const userSignIn = async (data) => await API.post("/user/signin",data);

export const getAllProduct = async (filter) => await API.post(`/products?${filter}`);
export const getProductDetails = async (id) => await API.get(`/products/${id}`);



//Cart

export const getCart = async (token) => 
    await API.get("/user/cart",{
        headers:{Authorizaation: `Bearer ${token}`}
    });

export const addToCart = async (token,data) => 
    await API.post("/user/cart/",data,{
        headers:{Authorizaation: `Bearer ${token}`}
    });

export const removeFromCart = async (token,data) =>
     await API.patch("/user/cart/",data,{
        headers:{Authorizaation: `Bearer ${token}`}
    });

export const getAllOrders= async (token,data) => await API.get("/user/order",data,{
        headers:{Authorizaation: `Bearer ${token}`}
    });
export const addOrder = async (token,data) => await API.post("/user/order/",data,{
        headers:{Authorizaation: `Bearer ${token}`}
    });

//Favourite

export const getFavourite = async (token,data) => 
    await API.get("/user/favorite",data,{
        headers:{Authorizaation: `Bearer ${token}`}
    });

export const addToFavourite = async (token,data) => 
    await API.post("/user/favorite/",data,{
        headers:{Authorizaation: `Bearer ${token}`}
    });

export const removeFromFavourite = async (token,data) => 
    await API.patch("/user/favorite/",data,{
        headers:{Authorizaation: `Bearer ${token}`}
    });
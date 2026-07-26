import axios from 'axios';
//import { response } from '../../../backend/src/app';

const API_URL = import.meta.env.VITE_API_URL;

export const signup = async (userData) => {
    const response = await axios.post(
        `${API_URL}api/auth/signup`,
        userData
    );

    return response.data;
};

export const login = async (userData) => {
    const response = await axios.post(
        `${API_URL}/login`,
        userData
    );

    return response.data;
};
export const getCurrentUser = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(
        `${API_URL}/me`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};
export const getFiles = async () => {

    const token = localStorage.getItem('token');

    const response = await axios.get(
         `${API_URL}/api/files`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};
export const uploadFile = async (file) => {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('file', file);
    const response = await axios.post(
         `${API_URL}api/files/upload`,
        formData,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};    

 export const viewFiles = async(id)=> {
    const token = localStorage.getItem("token");
    const response = await axios.get(
        `${API_URL}/api/files/${id}/view`,
      {
         headers: {
                Authorization: `Bearer ${token}`,
            },
            responseType: "blob",
        }
    );
    console.log(response);
 return response.data;

 };

 export const deleteFiles= async(id)=>{
    const token =localStorage.getItem("token");
    const response =await axios.delete(
         `${API_URL}/api/files/${id}/delete`,
        {
         headers: {
                Authorization: `Bearer ${token}`,
         } 
        }
    );
    return response.data;
 }

 export const googleLogin =async(credential)=>{
    const response = await axios.post(
     `${API_URL}/google`,
        {
            credential,
        }
    );

    return response.data;
};
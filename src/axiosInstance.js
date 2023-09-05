import axios from "axios";
import { useSelector } from 'react-redux';

const useAxiosInstance = () => {
  const token = useSelector((state) => state.users.value?.tokin);
  //console.log(token)
  const axiosInstance = axios.create({
    
    //baseURL: "http://localhost:5000/",
    baseURL:'https://itmapi.netlify.app/.netlify/functions/api/',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return axiosInstance;
};

export default useAxiosInstance;
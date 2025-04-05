import axios from axios ;
import React, {Children, createContext, useEffect,useRef,useState} from "react";
import { Navigate } from "react-router-dom";
import  {io} from "socket.io-client";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { use } from "react";
import { StudentDataContext } from "./StudentContext";
export const LaundryDataContext = createContext();

const LaundryContext = ({children}) =>{
    const [laundry,setLaundry] = useState(null);
    const [isLoading,setIsLoading] = useState(true);
    const socketRef = useRef(null);
    const token = localStorage.getItem("token");

    const fetchData = async () => {
        try{
            if(!token){
                setIsLoading(false);
                return;
            }
            const response = await axios.get("http://localhost:3000/laundry/get-data",
                {
                    headers : {
                        Authorization : `Bearer${token}`,
                    },
                }
            );
            setLaundry(response.data.laundry);
        }
        catch(error){
            console.error("❌ Error fetching university data:", error);
            if(error.response?.status===401){
                localStorage.removeItem("token");
            }
        } finally{
            setIsLoading(false);
        }
    };
    if (isLoading) return <h1>Loading....</h1>;
    return(
        <LaundryDataContext.Provider value = {{laundry,setLaundry}}>
            {childern}
        </LaundryDataContext.Provider>
    );
};

export default LaundryContext;
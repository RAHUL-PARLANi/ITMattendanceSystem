import React, { useEffect, useState } from "react";
import useAxiosInstance from "../../axiosInstance";
import Table from "../UnviersalComponents/Table";

const ContactusMessages = () => {
    const [data, setData] = useState([]);
    const axiosInstance = useAxiosInstance();
    const [isLoading,setIsLoading]=useState(true)
    useEffect(() => {
      axiosInstance.get('/contactus/all').then(res=>{
          setData(res.data)
          setIsLoading(false)
      }).catch(err=>{
          alert("Something went wrong0")
      })
    }, []);
  
    if(isLoading){
      return  <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100%",
      }}
    >
      <div
        className="spinner-border spinner-border-lg text-primary"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
    }
    return (
    <div className="container-fluid">
      <div className="h5 p-3 bg-white card w-100 shadow-sm rounded mt-4">
        Contact Us Messages
      </div>
      {data.length == 0 && (
        <div className="">
          <div className="card rounded w-100 shadow-sm h6 py-2 px-3">
            No Messages.
          </div>
        </div>
      )}
      {data.length!=0&&<Table tableData={data} tableKeys={['name','email','subject','message']} />}
    </div>
  )
}

export default ContactusMessages

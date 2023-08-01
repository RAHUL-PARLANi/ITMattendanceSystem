import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAxiosInstance from "../../../axiosInstance";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";


const ShowMails = () => {
  const [data, setData] = useState([]);
  const axiosInstance = useAxiosInstance();
  const [isLoading, setIsLoading] = useState(true);
  const [input,setInput] = useState("");
  const [dropDownData, setdropDownData] = useState([])
  const userData = useSelector(state=>state.users.value)
  
  useEffect(() => {
   setdropDownData(data.filter(elem=>elem.title.toLowerCase().includes(input.toLowerCase())))
  }, [input])
  
  useEffect(() => {
    axiosInstance
      .get("/mail/all/"+userData.id)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        alert("Something went wrong");
      });
  }, []);

  if (isLoading) {
    return (
      <div
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
    );
  }
  return (
    <div className="container-fluid mt-4 mb-4">
    <div className="h5 p-3 bg-white card w-100 shadow-sm rounded">
        Mails
    </div>  
    <div class="">
      <div  class="demo-inline-spacing">
        <div class="">
          <input
            value={input}
            onChange={(e)=>{
              setInput(e.target.value)
            }}
            placeholder="search mails"
            class="form-control shadow-sm dropdown-toggle hide-arrow"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          />
          <ul class="dropdown-menu shadow-sm">
            {dropDownData.map(elem=>{return <li>
              <a class="dropdown-item border-bottom">
                <Link to={'/user/mail/'+elem._id}>{elem.title}</Link>
              </a>
            </li>})}
          </ul>
        </div>
      </div>
    </div>
    <div className="row mt-4">
      {data.map((elem) => {
        return (
          <div className="col-md-6  col-lg-4">
            <Link style={{textDecoration:'inherit',color:'inherit'}} to={'/user/mail/'+elem._id}>
          
            <div className="card w-100 rounded shadow-sm mb-3 ">
              <div className="card-body">
                
                <h5 className="card-title h4 text-primary mb-2">
                  {elem.title}
                </h5>
                <span className="h6">Subject</span> : {elem.subject}
              </div>
          
            </div>
            </Link>

          </div>
                  );
      })}
    </div>
  </div>
  )
}

export default ShowMails
import React, { useEffect, useState } from "react";
import useAxiosInstance from "../../../axiosInstance";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import QRCode from "react-qr-code";
//import "./style.css";

const ShowCodes = () => {
  const [data, setData] = useState([]);
  const axiosInstance = useAxiosInstance();
  const [refresh, setrefresh] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const userData = useSelector((state) => state.users.value);

  useEffect(() => {
    if(refresh>1){
      toast.success('Refreshed Successfully')
    }
    axiosInstance
      .get("/securityCode/all/" + userData.id)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
        setIsLoading(false);
      });
  }, [refresh]);

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
    <div className="container-fluid mb-4">
      <div className="h5 p-3 bg-white card w-100 shadow-sm rounded mt-4">
        Athentication Codes
      </div>

      {data.length == 0 && (
        <div className="">
          <div className="card rounded w-100 shadow-sm h6 py-2 px-3">
            No Athentication Code found
          </div>
        </div>
      )}
      <div className="row">
        {data.map((elem, index) => {
          return (
            <>
              <div key={index} class="col-md-6 col-lg-3">
                <div className="card w-100 p-3 bg-primary text-white rounded shadow-sm">
                  <img
                    height={'250px'}
                    
                    className="rounded bg-white"
                    src={userData.picUrl}
                    alt="Spinning glass cube"
                  />
                  <div className="mt-2">
                    <h3>
                      <a className="text-white">{elem.studentUserName}</a>
                    </h3>
                    <h5 className="text-white">Date : {elem.date}</h5>
                    <div className="border-bottom border-white border-2">
                      <div className="mb-2">
                        <h5 className=" mb-0 text-white">
                          Roll Number : {elem.studentRollNo}
                        </h5>
                      </div>
                    </div>
                    <div
                      className="mt-2"
                      style={{display:'flex',justifyContent:'center'}}
                    >
                      <QRCode
                        size={150}
                        value={JSON.stringify({
                          code:elem.code,
                          userId:elem._id
                        })}
                        //viewBox={`0 0 256 256`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
      <button onClick={()=>{
        setrefresh(refresh+1)
      }} className="btn btn-primary mt-2 btn-sm">Refresh</button>
    </div>
  );
};

export default ShowCodes;

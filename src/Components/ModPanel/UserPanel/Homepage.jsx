import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useAxiosInstance from "../../../axiosInstance";

const ModHome = () => {
  const [data, setData] = useState([]);
  const userData = useSelector((state) => state.users.value);
  const [isLoading, setIsLoading] = useState(true);
  const axiosInstance = useAxiosInstance();
  
  useEffect(() => {
    axiosInstance
      .get("attendancesheet/allSheetsForMod/"+userData.id)
      .then((elem) => {
        setData(elem.data);
        setIsLoading(false);
      })
      .catch((err) => {
        alert("Something Went Wrong");
        setIsLoading(false);
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
    <div className="container-fluid mt-4">
      <div className="row">
        <div className="col-lg-12 mb-4 order-0">
          <div className="card rounded shadow-sm w-100">
            <div className="d-flex align-items-end row">
              <div className="col-sm-7">
                <div className="card-body">
                  <h5 className="card-title text-primary">
                    Welcome <span>{userData.username}</span>! 🎉
                  </h5>
                  <p className="mb-4 h6">To ITM TAP Cell's Moderator Panel.</p>
                </div>
              </div>
              <div className="col-sm-5 text-center text-sm-left">
                <div className="card-body pb-0 px-0 px-md-4">
                  <img
                    src="../assets/img/illustrations/man-with-laptop-light.png"
                    height={140}
                    alt="View Badge User"
                    data-app-dark-img="illustrations/man-with-laptop-dark.png"
                    data-app-light-img="illustrations/man-with-laptop-light.png"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {userData.isSuccessFullyRegistered === false && (
        <div className="card rounded w-100 shadow-sm h6 py-2 px-3">
         <span> Please Complete Your Profile <Link to={'/user/profile'}>here</Link> to continue further.
         As a mod you can fill random data in profile section. This is one time process to collect your face Data. Thank You 
         </span></div>
      )}
      <div className="col-lg-3 col-md-6">
            <div className="card w-100 rounded shadow-sm ">
              <div className="card-body">
                <div className="card-title d-flex align-items-start justify-content-between">
                  <div className="avatar flex-shrink-0">
                    <img
                      src="../assets/img/icons/unicons/chart-success.png"
                      alt="chart success"
                      className="rounded"
                    />
                  </div>
                </div>
                <span className="fw-semibold d-block mb-1">Total Alotted Sheets</span>
                <h3 className="card-title mb-2">{data.length}</h3>
              </div>
            </div>
            </div>
            
    </div>
  );
};

export default ModHome;
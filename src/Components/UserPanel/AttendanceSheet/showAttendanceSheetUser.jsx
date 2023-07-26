import React, { useEffect, useState } from "react";
import useAxiosInstance from "../../../axiosInstance";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ShowAttendanceSheetUser = () => {
  const [data, setData] = useState({});
  const axiosInstance = useAxiosInstance();
  const [isLoading, setIsLoading] = useState(true);
  const userData = useSelector((state) => state.users.value);

  useEffect(() => {
    axiosInstance
      .get("/attendancesheet/all/" + userData.id)
      .then((res) => {
        setData(
          res.data.find(
            (elem) => elem._id == window.location.href.split("/").pop()
          )
        );
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
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
    <div className="container-fluid mb-4">
      <div className="card w-100 mt-4 shadow-sm  rounded">
        <div
          style={{ textTransform: "capitalize" }}
          className="h4 text-center  mb-0 py-3 text-primary"
        >
          {data.sheetName}
        </div>
        <div className="row g-4">
          <div className="col-lg-6">
            <div style={{display:'flex',justifyContent:'space-between'}} className="mx-3 mt-1 h6">
              <span className="fw-bold">Module</span>{" "}
              <span className="text-capitalize">{data.module}</span>
            </div>

            <div style={{display:'flex',justifyContent:'space-between'}} className="mx-3 mt-1 h6">
              <span className="fw-bold">Start Date</span>{" "}
              <span className="text-capitalize">{data.startDate}</span>
            </div>

            <div style={{display:'flex',justifyContent:'space-between'}} className="mx-3 mt-1 h6">
              <span className="fw-bold">End Date</span>  {" "}
              <span className="text-capitalize">{data.endDate}</span>
            </div>

            <div style={{display:'flex',justifyContent:'space-between'}} className="mx-3 mt-1 h6">
              <span className="fw-bold">Off Dates</span>  {" "}
              <span className="text-capitalize">{data.offDates}</span>
            </div>
          </div>

          <div className="col-lg-6">
            <div style={{display:'flex',justifyContent:'space-between'}} className="mx-3 mt-1 h6">
              <span className="fw-bold">Number of Halfs</span> {" "}
              <span className="text-capitalize">{data.noOfHalfs}</span>
            </div>

            <div style={{display:'flex',justifyContent:'space-between'}} className="mx-3 mt-1 h6">
              <span className="fw-bold">Starting Time</span>{" "}
              <span className="text-capitalize">{data.startTiming}</span>
            </div>

            <div style={{display:'flex',justifyContent:'space-between'}} className="mx-3 mt-1 h6">
              <span className="fw-bold">Ending Time</span>{" "}
              <span className="text-capitalize">{data.endTiming}</span>
            </div>

          </div>
        </div>
        <div
          style={{ textTransform: "capitalize" }}
          className="h4 ms-3 mb-0 py-3"
        >
          Attendance Data
        </div>
        
        {Object.keys(data.attendanceData).map(elem=>{return <div>
            <div style={{display:'flex',justifyContent:'space-between'}} key={elem} className="mx-3 mt-1 h6">
              <span className="fw-bold">{elem}</span>{" "}
              <span className="text-capitalize">{data.attendanceData[elem]}</span>
            </div>    
        </div>}) }
      </div>
    </div>
  );
};

export default ShowAttendanceSheetUser;

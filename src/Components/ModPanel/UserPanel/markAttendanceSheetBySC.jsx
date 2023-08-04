import React, { useEffect, useState } from "react";
import MarkAttendanceTable from "./AttendanceMarkingTable";
import useAxiosInstance from "../../../axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { logout } from "../../../features/attendanceAdmin";
import MarkAttendanceTableModbySC from "./AttendanceMarkingTableBySC";


const MarkAttendanceSheetModBySC = () => {
    
  const axiosInstance = useAxiosInstance();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const date = useSelector((state) => state.attendanceMod.value.date);
  const dispatch = useDispatch();
  useEffect(() => {
    axiosInstance
      .get(
        "/attendancesheet/marksheet/" + window.location.href.split("/").pop()
      )
      .then((elem) => {
        setData(elem.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something Went Wrong");
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
    <div className="container-fluid">
      <MarkAttendanceTableModbySC
        title={"Student List"}
        date={date}
        tableKeys={["Sl.No.", "FullName", "RollNo", date]}
        tableData={data.attendanceData}
      />
      <button onClick={()=>{
        dispatch(logout())
      }} className="btn btn-primary mt-2 btn-sm">DeAuthenticate This Sheet</button>
    </div>
  );
};

export default MarkAttendanceSheetModBySC;
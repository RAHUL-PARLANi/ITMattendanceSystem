import React, { useEffect, useState } from "react";
import MarkAttendanceTable from "./AttendanceMarkingTable";
import useAxiosInstance from "../../axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { logout } from "../../features/attendanceAdmin";

const MarkAttendanceSheet = () => {
    
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
      <MarkAttendanceTable
        title={"Student List"}
        date={date}
        tableKeys={["Sl.No.", "FullName", "RollNo", date]}
        tableData={data.attendanceData}
      />
    </div>
  );
};

export default MarkAttendanceSheet;

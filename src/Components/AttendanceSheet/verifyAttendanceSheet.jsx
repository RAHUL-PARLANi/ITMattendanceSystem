import React, { useEffect, useState, useRef } from "react";
import useAxiosInstance from "../../axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import * as faceapi from "face-api.js";
import Table from "../UnviersalComponents/Table";
import MarkAttendanceTable from "./AttendanceMarkingTable";
import { toast } from "react-toastify";
import { login, logout } from "../../features/attendanceAdmin";
import { useNavigate } from "react-router-dom";

const VerifyAttendanceSheet = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const axiosInstance = useAxiosInstance();
  const [date, setDate] = useState("");
  const dispatch = useDispatch()

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
      <h3 className="p-2 h3 mt-4 mb-3 bg-white rounded shadow-sm">
        {data.sheetName}
      </h3>
      <div className="bg-white p-2 shadow-sm rounded">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(login({ date: date }));
          }}
        >
          <div className="mb-3">
            <label className="form-label">Select Date and Half :</label>
            <select
              required
              type="select"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
              className="form-select select2"
            >
              <option value={""}>Choose</option>
              {Object.keys(data.attendanceData[0])
                .filter(
                  (key) =>
                    ![
                      "Sl.No.",
                      "FullName",
                      "RollNo",
                      "Branch",
                      "_id",
                      "faceEmbbedingData",
                    ].includes(key)
                )
                .map((elem) => {
                  return <option value={elem}>{elem}</option>;
                })}
            </select>
            <input
              type="submit"
              value="Submit"
              disabled={date === ""}
              className="btn btn-primary mt-4"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyAttendanceSheet;

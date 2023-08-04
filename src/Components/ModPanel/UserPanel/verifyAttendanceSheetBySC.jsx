import React, { useEffect, useState, useRef } from "react";
import useAxiosInstance from "../../../axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import * as faceapi from "face-api.js";
import { toast } from "react-toastify";
import { login, logout } from "../../../features/attendanceAdmin";
import { useNavigate } from "react-router-dom";

const VerifyAttendanceSheetModBySC = () => {
  const history = useNavigate();
  const userData = useSelector((state) => state.users.value);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const axiosInstance = useAxiosInstance();
  const [date, setDate] = useState("");
  const isVerified = useSelector(
    (state) => state.attendanceMod.value.isAuthenticated
  );
  //const isVerified= useSelector((state) => state.attendance.value);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(0);
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
  }, [refresh]);

  useEffect(() => {
    console.log(isVerified);
  }, [isVerified]);

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
      {isVerified ? (
        <>
          <div>You have been Verfied</div>
        </>
      ) : (
        <>
          <h3 className="p-2 h3 mt-4 mb-3 bg-white rounded shadow-sm">
            {data.sheetName}
          </h3>
          <div className="bg-white p-2 shadow-sm rounded">
            <form
              onSubmit={(e) => {
                setIsLoading(true);
                e.preventDefault();
                axiosInstance
                  .post("/mail/checkModPass", {
                    email: email,
                    password: password,
                  })
                  .then((res) => {
                    if (res.data.status === true) {
                      toast.success("Sheet Authenticated Successfully");
                      dispatch(login({ date: date }));
                      setIsLoading(false);
                    } else {
                      toast.error("Wrong Credentials");
                      setIsLoading(false);
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                    toast.error("Something went Wrong");
                    setIsLoading(false);
                  });
              }}
            >
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  name="email-username"
                  value={email}
                  required
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder="Enter your email"
                  autoFocus="true"
                />
              </div>
              <div className="mb-3 form-password-toggle">
                <div className="d-flex justify-content-between">
                  <label className="form-label" htmlFor="password">
                    Password
                  </label>
                </div>
                <div className="input-group input-group-merge">
                  <input
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={"password"}
                    id="password"
                    className="form-control"
                    name="password"
                    placeholder="············"
                    aria-describedby="password"
                  />
                </div>
              </div>
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
        </>
      )}
    </div>
  );
};

export default VerifyAttendanceSheetModBySC;

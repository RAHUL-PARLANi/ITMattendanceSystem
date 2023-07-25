import React, { useEffect, useState } from "react";
import useAxiosInstance from "../../../axiosInstance";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ShowAllFormsUser = () => {
  const [data, setData] = useState([]);
  const axiosInstance = useAxiosInstance();
  const [isLoading, setIsLoading] = useState(true);
  const userData=useSelector(state=>state.users.value)

  useEffect(() => {
    axiosInstance
      .get("/attendancesheet/all/"+userData.id)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err)
        alert("Something went wrong");
        setIsLoading(false)
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
      <div className="h5 p-3 bg-white card w-100 shadow-sm rounded mt-4">Attendance Information</div>
      <div className="row">
        {data.map((elem) => {
          return (
            <div class="col-md-6 col-lg-3">
              <div class="card w-100 shadow-sm mb-3 rounded">
                <div class="card-body">
                  <h5 style={{textTransform:'capitalize'}} class="card-title h4 text-primary">{elem.sheetName}</h5>
                  <p style={{textTransform:'capitalize'}} class="card-text">
                    <span className="fw-bold">Module : </span>
                    {elem.module}
                  </p>
                  <p style={{textTransform:'capitalize'}} class="card-text">
                    <span className="fw-bold">{elem.startDate}</span>
                    <span > to </span>
                    <span className="fw-bold">{elem.endDate}</span>
                  </p>
                  <Link to={'/user/showsheet/'+elem._id}><button class="btn btn-primary">Check</button></Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShowAllFormsUser;
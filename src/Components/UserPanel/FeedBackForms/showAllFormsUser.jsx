import React, { useEffect, useState } from "react";
import useAxiosInstance from "../../../axiosInstance";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ShowAllFormsUser = () => {
  const [data, setData] = useState([]);
  const axiosInstance = useAxiosInstance();
  const [isLoading, setIsLoading] = useState(true);
  const userData = useSelector((state) => state.users.value);

  useEffect(() => {
    axiosInstance
      .get("/feedbackform/all/"+userData.id)
      .then((res) => {
        setData(res.data.filter((res) => res.isOn === true));
        setIsLoading(false);
      })
      .catch((err) => {
        toast.error("Something went wrong");
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
      <div className="h5 p-3 bg-white card w-100 shadow-sm rounded mt-4">Feedback Forms</div>
      <div className="row">
        {data.map((elem) => {
          return (
            <div class="col-md-6 col-lg-3">
              <div class="card w-100 shadow-sm mb-3 rounded">
                <div class="card-body">
                  <h5 class="card-title h4  text-primary">{elem.formName}</h5>
                  <p class="card-text">
                    <span className="fw-bold">Last Date : </span>
                    {elem.lastDate}
                  </p>
                  <Link to={'/user/showForm/'+elem._id}><button class="btn btn-primary">Fill Now</button></Link>
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
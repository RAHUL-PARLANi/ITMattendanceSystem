import React, { useEffect, useState } from "react";
import useAxiosInstance from "../../../axiosInstance";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import GalleryComponent from "../../UserPanel/Components/Gallery/galleryComponent";
import axios from "axios";
import TeamComponent from "../../UserPanel/Components/Team/TeamComponent";

const ShowAllTeams = () => {
  const [data, setData] = useState([]);
  const axiosInstance = useAxiosInstance();
  const [isLoading, setIsLoading] = useState(true);
  //const userData = useSelector((state) => state.users.value);

  useEffect(() => {
    setIsLoading(true)
    axiosInstance
      .get("/team/all")
      .then((res) => {
        setData(res.data);
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
    <div className="container-fluid">
      <div className="h5 p-3 bg-white card w-100 shadow-sm rounded mt-4">
        Team Section
      </div>
      {data.length == 0 && (
        <div className="">
          <div className="card rounded w-100 shadow-sm h6 py-2 px-3">
            Their are no Team Members.
          </div>
        </div>
      )}
      <div className="row g-4 mb-4">
        {data.map((elem) => {
          return (
            <div className="" key={elem._id}>
              <div className="d-flex flex-wrap">
                <TeamComponent data={elem} colour={'blue'}/>
                {/* <GalleryComponent data={elem} /> */}
                <div className="card rounded text-dark rounded shadow-sm flex-fill">
                  <div className="card-body">
                    <div className="mb-2">
                      <span className="fw-bold">Name:</span> {elem.name}
                    </div>
                    <div className="mb-2">
                      <span className="fw-bold">Designation:</span> {elem.position}
                    </div>
                    <div className="mb-2">
                      <span className="fw-bold">Email:</span> {elem.email}
                    </div>
                    <div className="mb-2">
                      <span className="fw-bold">Phone:</span> {elem.phone}
                    </div>
                    
                    <div className="d-flex justify-content-between align-items-center">
                      <Link
                        to={"/editTeam/" + elem._id}
                        className="btn btn-primary"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShowAllTeams;
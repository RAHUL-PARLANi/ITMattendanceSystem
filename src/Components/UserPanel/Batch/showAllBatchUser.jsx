import React, { useEffect, useState } from "react";
import useAxiosInstance from "../../../axiosInstance";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Table from "../../UnviersalComponents/Table";

const ShowAllBatchUser = () => {
  const [data, setData] = useState([]);
  const axiosInstance = useAxiosInstance();
  const [studentTable, setStudentTable] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const userData = useSelector((state) => state.users.value);

  useEffect(() => {
    axiosInstance
      .get("/batch/all/" + userData.id)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong");
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
        Enrolled Batches
      </div>
      <div className="row">
        {data.map((elem, index) => {
          return (
            <div key={index} class="col-md-6 col-lg-3">
              <div class="card w-100 shadow-sm mb-3 rounded">
                <div class="card-body">
                  <h5
                    style={{ textTransform: "capitalize" }}
                    class="card-title h4 text-primary"
                  >
                    {elem.name}
                  </h5>
                  <p style={{ textTransform: "capitalize" }} class="card-text">
                    {elem.desciption}
                  </p>
                  <p style={{ textTransform: "capitalize" }} class="card-text">
                    <span className="fw-bold">Total :</span>{" "}
                    {elem.studentsId.length}
                  </p>
                  <div
                    class="modal fade"
                    id={`largeModal${index}`}
                    tabindex="-1"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog modal-lg" role="document">
                      <div class="modal-content">
                        <div class="modal-header">
                          <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div class="modal-body">
                          {elem.studentsData && (
                            <Table
                              title={"Student List"}
                              tableKeys={["name", "rollNo", "branch", "batch"]}
                              tableData={elem.studentsData}
                            />
                          )}
                        </div>
                        <div class="modal-footer">
                          <button
                            type="button"
                            class="btn btn-outline-secondary"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    data-bs-toggle="modal"
                    data-bs-target={`#largeModal${index}`}
                    class="btn btn-primary"
                  >
                    View Student List
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShowAllBatchUser;

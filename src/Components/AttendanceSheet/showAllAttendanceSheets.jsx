import React, { useEffect, useState } from "react";
import useAxiosInstance from "../../axiosInstance";
import { Link } from "react-router-dom";

const ShowAllAttendanceSheets = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const axiosInstance = useAxiosInstance();
  useEffect(() => {
    axiosInstance
      .get("/attendancesheet/all")
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
      <div className="row mt-4">
        {data.map((elem) => {
          return (
            <div className="col-md-6  col-lg-4">
              <div className="card w-100 rounded shadow-sm mb-3 ">
                <div className="card-body">
                  <h5 className="card-title text-primary">{elem.sheetName}</h5>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <span className="h6">Batch</span>{" "}
                    <span>{elem?.batch}</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <span className="h6">Module</span>{" "}
                    <span>{elem.module}</span>
                  </div>
                  <h6>
                    {elem.startDate} to {elem.endDate}
                  </h6>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <span className="h6">Moderator Name</span>{" "}
                    <span>{elem.moderator.name}</span>
                  </div>
                  <div>
                    <Link
                      to={`/editSheet/${elem._id}`}
                      className="btn btn-primary me-2"
                    >
                      <i className="bx bxs-edit-alt"></i>
                    </Link>

                    <Link
                      to={`/showSheet/${elem._id}`}
                      className="btn btn-dark me-2"
                    >
                      <i className="bx bx-detail"></i>
                    </Link>

                    <button
                      onClick={() => {
                        var con = window.prompt(
                          `Do you want to delete ${elem.sheetName}? if yes type ${elem.sheetName} int the box below`
                        );
                        if (con === elem.sheetName) {
                          axiosInstance
                            .delete("/attendancesheet/" + elem._id)
                            .then((res) => {
                              if (res.data.msg) {
                                alert("Successfully Deleted");
                                setData(
                                  data.filter((re) => {
                                    return re._id != elem._id;
                                  })
                                );
                              }
                            })
                            .catch((err) => {
                              console.log(err);
                            });
                        }
                      }}
                      className="btn btn-warning"
                    >
                      <i className="bx bx-trash"></i>
                    </button>
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
export default ShowAllAttendanceSheets;

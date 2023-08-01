import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAxiosInstance from "../../axiosInstance";
import { Link } from "react-router-dom";

const ShowAllMail = () => {
  const [data, setData] = useState([]);
  const axiosInstance = useAxiosInstance();
  const [isLoading, setIsLoading] = useState(true);
  const [input,setInput] = useState("");
  const [dropDownData, setdropDownData] = useState([])

  useEffect(() => {
   setdropDownData(data.filter(elem=>elem.title.toLowerCase().includes(input.toLowerCase())))
  }, [input])
  

  useEffect(() => {
    axiosInstance
      .get("/mail/all")
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        alert("Something went wrong");
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
      <div class="">
        <div  class="demo-inline-spacing">
          <div class="">
            <input
              value={input}
              onChange={(e)=>{
                setInput(e.target.value)
              }}
              placeholder="search mails"
              class="form-control shadow-sm dropdown-toggle hide-arrow"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            />
            <ul class="dropdown-menu shadow-sm">
              {dropDownData.map(elem=>{return <li>
                <a class="dropdown-item border-bottom">
                  <Link to={'/showMail/'+elem._id}>{elem.title}</Link>
                </a>
              </li>})}
            </ul>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        {data.map((elem) => {
          return (
            <div className="col-md-6  col-lg-4">
              <div className="card w-100 rounded shadow-sm mb-3 ">
                <div className="card-body">
                  <h5 className="card-title h4 text-primary mb-2">
                    {elem.title}
                  </h5>
                  <span className="h6">Subject</span> : {elem.subject}
                  <div
                    style={{
                      display: "flex",
                      height: "40px",
                      marginTop: "15px",
                      alignItems: "center",
                    }}
                  >
                    <Link
                      to={`/editMail/${elem._id}`}
                      className="btn btn-icon btn-primary me-2"
                    >
                      <span className="tf-icons bx bxs-edit-alt"></span>
                    </Link>

                    <Link
                      to={`/showMail/${elem._id}`}
                      className="btn btn-icon btn-warning me-2"
                    >
                      <i className="bx bxs-show"></i>
                    </Link>

                    <button
                      onClick={() => {
                        var con = window.prompt(
                          `Do you want to delete ${elem.title}? if yes type ${elem.title} int the box below`
                        );
                        if (con === elem.title) {
                          axiosInstance
                            .delete("/mail/" + elem._id)
                            .then((res) => {
                              if (res.data.msg) {
                                toast.success("Successfully Deleted");
                                setData(
                                  data.filter((re) => {
                                    return re._id != elem._id;
                                  })
                                );
                              }
                            })
                            .catch((err) => {
                              toast.error("Something went wrong");
                              console.log(err);
                            });
                        }
                      }}
                      className="btn btn-dark btn-icon me-2"
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

export default ShowAllMail;

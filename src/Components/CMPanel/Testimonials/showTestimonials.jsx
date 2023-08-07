import React, { useEffect, useState } from "react";
import useAxiosInstance from "../../../axiosInstance";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import TestimonialsComponent from "../../UserPanel/Components/Testimonials/TestimonialsComponent";

const ShowAllTestimonials = () => {
  const [data, setData] = useState([]);
  const axiosInstance = useAxiosInstance();
  const [isLoading, setIsLoading] = useState(true);
  //const userData = useSelector((state) => state.users.value);

  useEffect(() => {
    axiosInstance
      .get("/testimonial/all")
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
        Testimonials
      </div>
      {data.length == 0 && (
        <div className="">
          <div className="card rounded w-100 shadow-sm h6 py-2 px-3">
            Their are no Testimonial Avaliable.
          </div>
        </div>
      )}
      <div className="row g-4 mb-4">
        {data.map((elem) => {
          return (
            <div className="col-md-6 col-lg-3" key={elem._id}>
              <div className="d-flex flex-wrap">
                

                <TestimonialsComponent data={elem} />
                <div className="card rounded text-dark rounded shadow-sm flex-fill">
                  <div className="card-body">
                    <div className="mb-2">
                      <span className="fw-bold">Name:</span> {elem.name}
                    </div>
                    <div className="mb-2">
                      <span className="fw-bold">Designation:</span> {elem.designation}
                    </div>
                    <div className="mb-2">
                      <span className="fw-bold">Review:</span> {elem.review}
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <Link
                        to={"/editTestimonial/" + elem._id}
                        className="btn btn-primary"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => {
                          var con = window.confirm(
                            "Do you want to delete this Testimonial?"
                          );
                          if (con) {
                            axiosInstance
                              .delete("/testimonial/" + elem._id)
                              .then((elem) => {
                                if (elem.data) {
                                  toast.success("Deleted Successfully !");
                                  setData(
                                    data.filter((res) => res._id !== elem._id)
                                  );
                                }
                              })
                              .catch((err) => {
                                console.log(err);
                                toast.error("Failed to delete");
                              });
                          }
                        }}
                        className="btn btn-danger ms-2"
                      >
                        Delete
                      </button>
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

export default ShowAllTestimonials;
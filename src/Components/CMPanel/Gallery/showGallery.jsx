import React, { useEffect, useState } from "react";
import useAxiosInstance from "../../../axiosInstance";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import GalleryComponent from "../../UserPanel/Components/Gallery/galleryComponent";
import axios from "axios";

const ShowAllGallery = () => {
  const [data, setData] = useState([]);
  const axiosInstance = useAxiosInstance();
  const [isLoading, setIsLoading] = useState(true);
  //const userData = useSelector((state) => state.users.value);

  useEffect(() => {
    axiosInstance
      .get("/gallery/all")
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
        Gallery Images
      </div>
      {data.length == 0 && (
        <div className="">
          <div className="card rounded w-100 shadow-sm h6 py-2 px-3">
            Their are no gallery images Avaliable.
          </div>
        </div>
      )}
      <div className="row g-4 mb-4">
        {data.map((elem) => {
          return (
            <div className="col-md-6 col-lg-3" key={elem._id}>
              <div className="d-flex flex-wrap">
                <div
                  className="portfolio-item first wow zoomIn"
                  data-wow-delay={elem.delay}
                >
                  <div className="position-relative rounded overflow-hidden">
                    <img
                      className="img-fluid w-100"
                      src={elem.imageUrl}
                      alt={"photo for " + elem.title}
                    />
                    <div className="portfolio-overlay">
                      <div className="mt-auto">
                        <a
                          style={{ display: "flex", alignItems: "center" }}
                          className="h5 d-block text-white mt-1 mb-0"
                        >
                          {elem.title}
                        </a>
                        <div style={{ maxHeight: "150px", overflowY: "auto" }}>
                          <small className="text-white">{elem.desc}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <GalleryComponent data={elem} /> */}
                <div className="card rounded text-dark rounded shadow-sm flex-fill">
                  <div className="card-body">
                    <div className="mb-2">
                      <span className="fw-bold">Title:</span> {elem.title}
                    </div>
                    <div className="mb-2">
                      <span className="fw-bold">Description:</span> {elem.desc}
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <Link
                        to={"/editGallery/" + elem._id}
                        className="btn btn-primary"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => {
                          var con = window.confirm(
                            "Do you want to delete this Gallery Image?"
                          );
                          if (con) {
                            axiosInstance
                              .delete("/gallery/" + elem._id)
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

export default ShowAllGallery;
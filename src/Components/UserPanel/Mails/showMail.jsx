import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAxiosInstance from "../../../axiosInstance";
import { useSelector } from "react-redux";

const ShowMailUser = () => {
  const userData = useSelector(state=>state.users.value)
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const axiosInstance = useAxiosInstance();
  const [isVisible,setIsVisible] = useState(false);
  useEffect(() => {
    axiosInstance
      .get("/mail/user/" + window.location.href.split("/").pop())
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
        if (res.data.studentsId) {
          if (res.data.studentsId.find((elem) => elem == userData.id)) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        }
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

  if (isVisible === false) {
    return (
      <div className="container-fluid mt-4">
        <div className="card w-100 shadow-sm rounded p-2">
          You don't have access to this Mail.
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid mb-4">
      <div className="h4 text-primary card w-100 rounded shadow-sm mt-4 p-2">
        {data.title}
      </div>
      <div className="h5 card w-100 rounded shadow-sm mt-3 p-2">
        Subject : {data.subject}
      </div>
      <div className="card w-100 rounded shadow-sm mt-3">
        {data.content &&
          data.content.map((elem, index) => {
            return (
              <>
                {elem.type === "IMG" ? (
                  <div className="text-center">
                    <img src={elem.content} style={{ maxHeight: "300px" }} />
                  </div>
                ) : (
                  <></>
                )}
                {elem.type === "LINK" ? (
                  <div>
                    <div>
                      <span className="fw-bold">Link </span> -{" "}
                      <span className="">
                        <a target="_blank" href={elem.content}>
                          {elem.content}
                        </a>
                      </span>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                {elem.type === "PARA" ? (
                  <div>
                    <ReactQuill
                      value={elem.content}
                      readOnly={true}
                      theme={"bubble"}
                    />
                  </div>
                ) : (
                  <></>
                )}
              </>
            );
          })}
      </div>
    </div>
  );
};

export default ShowMailUser;

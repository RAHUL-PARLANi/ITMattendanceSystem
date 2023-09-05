import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAxiosInstance from "../../axiosInstance";
import Table from "../UnviersalComponents/Table";
import { useSelector } from "react-redux";

const ShowMail = () => {
  const [data, setData] = useState([]);
  const userData = useSelector((state) => state.users.value);
  const [isLoading, setIsLoading] = useState(true);
  const axiosInstance = useAxiosInstance();
  useEffect(() => {
    axiosInstance
      .get("/mail/" + window.location.href.split("/").pop())
      .then((res) => {
        setData(res.data);
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

      {data.studentsData?.length != 0 ? (
        <Table
          title={"Visible Users List"}
          tableKeys={[
            "_id",
            "name",
            "email",
            "rollNo",
            "role",
            "batch",
            "branch",
          ]}
          tableData={data.studentsData}
        />
      ) : (
        <>
        <div className="h6 card w-100 rounded shadow-sm mt-3 p-2">
        This Mail is visible to all users
        </div>
        </>
      )}
    </div>
  );
};

export default ShowMail;

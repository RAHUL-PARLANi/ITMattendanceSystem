import React, { useEffect, useState } from "react";
import useAxiosInstance from "../../axios";
import Table from "../UnviersalComponents/Table";

const ShowFormData = () => {
  const axiosInstance = useAxiosInstance();
  const [Data, setData] = useState([]);
  const [keys, setKeys] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/feedbackform/" + window.location.href.split("/").pop())
      .then((res) => {
        setIsLoading(false);
        setData(res.data);
        const allKeys = Array.from(
          new Set(
            res.data.data.reduce((keys, obj) => {
              return keys.concat(Object.keys(obj));
            }, [])
          )
        );
        setKeys(allKeys);
      })
      .catch((err) => {
        alert("Some Thing went Wrong");
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
      <div className="card p-2">
        <div>
          <span className="h6">Form Name : </span>
          {Data.formName}{" "}
        </div>
        <div>
          <span className="h6">Last Date : </span>
          {Data.lastDate}
        </div>
        <div>
          <span className="h6">Description : </span>
          {Data.description}
        </div>
        <div>
          <span className="h6">Active : </span>
          {`${Data.isOn}`}{" "}
        </div>
      </div>
      {keys && Data ?<Table tableKeys={keys} tableData={Data.data} />:<></>}
    </div>
  );
};

export default ShowFormData;

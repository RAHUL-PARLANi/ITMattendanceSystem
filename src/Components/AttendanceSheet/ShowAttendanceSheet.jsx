import React, { useEffect, useState } from "react";
import useAxiosInstance from "../../axiosInstance";
import Table from "../UnviersalComponents/Table";
import { Chart } from "react-google-charts";

const ShowAttendanceSheet = () => {
  const axiosInstance = useAxiosInstance();
  const SheetId = window.location.href.split("/").pop();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [tableKeys, setTableKeys] = useState([]);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/attendancesheet/" + SheetId)
      .then((res) => {
        setData(res.data);
        setTableData(res.data.attendanceData);
        const allKeys = Array.from(
          new Set(
            res.data.attendanceData.reduce((keys, obj) => {
              return keys.concat(Object.keys(obj));
            }, [])
          )
        );
        setTableKeys(allKeys);
        StatsMaker(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        alert("Something Went Wrong");
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  const {
    sheetName,
    module,
    batch,
    startDate,
    endDate,
    offDates,
    startTiming,
    endTiming,
    noOfHalfs,
    attendanceData,
  } = data;

  function StatsMaker(data) {
    const { startDate, endDate, offDates, noOfHalfs, attendanceData } = data;
    const columnNames = [];
    console.log(startDate);
    let loopDate = new Date(startDate);
    console.log(loopDate);
    console.log(endDate);
    while (loopDate <= new Date(endDate)) {
      const formattedDate = loopDate.toISOString().slice(0, 10);

      if (
        offDates.filter((res) => {
          return res === formattedDate;
        }).length == 0
      ) {
        for (let i = 0; i < noOfHalfs; i++) {
          //    console.log(`${formattedDate} ${i + 1} Half`);
          columnNames.push(`${formattedDate} ${i + 1} Half`);
        }
      }
      loopDate.setDate(loopDate.getDate() + 1);
    }
    //console.log(columnNames)
    var newAttendanceData = [];
    attendanceData.forEach((element) => {
      var totalAttended = 0;
      for (let index = 0; index < columnNames.length; index++) {
        totalAttended += element[columnNames[index]];
      }
      var updatedRow = {
        ...element,
        totalClasses: columnNames.length,
        totalAttended: totalAttended,
        totalPercentage: ((totalAttended / columnNames.length) * 100).toFixed(
          2
        ),
      };
      newAttendanceData.push(updatedRow);
    });
    setTableData(newAttendanceData);

    const allKeys = Array.from(
      new Set(
        newAttendanceData.reduce((keys, obj) => {
          return keys.concat(Object.keys(obj));
        }, [])
      )
    );
    setTableKeys(allKeys);
  }

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
    <div className="container-fluid  mt-4">
      <div>
        <h5 className="h5 bg-white p-2 fw-bold rounded shadow-sm">
          {sheetName}
        </h5>
      </div>
      <div
        className="bg-white shadow-sm rounded p-2"
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <div className="col-xs-12 col-sm-12 col-md-6">
          <li>
            <span className="fw-bold">Module : </span>
            {module}
          </li>
          <li>
            <span className="fw-bold">Batch : </span>
            {batch}
          </li>
          <li>
            <span className="fw-bold">Start Date :</span>
            {startDate}
          </li>
          <li>
            <span className="fw-bold">End Date : </span>
            {endDate}
          </li>
        </div>
        <div className="col-xs-12 col-sm-12 col-md-6">
          <li>
            <span className="fw-bold">Off Dates : </span>
            {offDates.map((elem) => {
              return <>{elem} </>;
            })}
          </li>
          <li>
            <span className="fw-bold">Start Timing : </span>
            {startTiming}
          </li>
          <li>
            <span className="fw-bold">End Timing :</span>
            {endTiming}
          </li>

          <li>
            <span className="fw-bold">No Of Halfs :</span>
            {noOfHalfs}
          </li>
        </div>
      </div>
      {tableData && tableKeys && (
        <Table tableKeys={tableKeys} tableData={tableData} />
      )}
      <div
        className="shadow-sm rounded bg-white mb-4"
        style={{
          flexWrap: "wrap",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          style: "370px",
        }}
      >
        <Chart
          chartType="ColumnChart"
          width="95%"
          height="350px"
          data={[
            ["Range", "Number Of Students", { role: "style" }],
            ["0-25%", tableData.filter(res=>
              res.totalPercentage>=0&&res.totalPercentage<25
            ).length, "#ff3e1d"],
            [
              "25-50%",
              tableData.filter(res=>
                res.totalPercentage>=25&&res.totalPercentage<50
              ).length,
              "#fd7e14",
            ],
            [
              "50-75%",
              tableData.filter(res=>
                res.totalPercentage>=50&&res.totalPercentage<75
              ).length,
              "#ffab00",
            ],
            [
              "75-100%",
              tableData.filter(res=>
                res.totalPercentage>=75&&res.totalPercentage<=100
              ).length,
              "#71dd37",
            ],
          ]}
        />
      </div>
    </div>
  );
};

export default ShowAttendanceSheet;

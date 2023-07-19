import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ShowRequests from "../Request/ShowRequests";
import { Chart } from "react-google-charts";
import useAxiosInstance from "../../axiosInstance";
import Table from "../UnviersalComponents/Table";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState([]);
  const axiosInstance = useAxiosInstance();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axiosInstance
      .get("/dashboard/all")
      .then((res) => {
        setDashboardData(res.data);
        setIsLoading(false);
        console.log(
          Object.keys(res.data.filteredStats.other.data),
          res.data.filteredStats.other.data
        );
      })
      .catch((err) => alert("Spmething Went Wrong"));
  }, []);
  const options = {
    title: "Other Univercity",
    is3D: true,
  };
  const userData = useSelector((state) => state.users.value);

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
    <div>
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="row">
          <div className="col-lg-12 mb-4 order-0">
            <div className="card">
              <div className="d-flex align-items-end row">
                <div className="col-sm-7">
                  <div className="card-body">
                    <h5 className="card-title text-primary">
                      Welcome <span>{userData.username}</span>! 🎉
                    </h5>
                    <p className="mb-4">
                      To our Smart Student Mangement System.
                    </p>
                  </div>
                </div>
                <div className="col-sm-5 text-center text-sm-left">
                  <div className="card-body pb-0 px-0 px-md-4">
                    <img
                      src="../assets/img/illustrations/man-with-laptop-light.png"
                      height={140}
                      alt="View Badge User"
                      data-app-dark-img="illustrations/man-with-laptop-dark.png"
                      data-app-light-img="illustrations/man-with-laptop-light.png"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="col-lg-12 col-md-4 order-1">
          <div className="d-flex" style={{ flexWrap: "wrap" }}>
            <div className="card mb-4 col-lg-3  col-6">
              <div className="card-body">
                <div className="card-title d-flex align-items-start justify-content-between">
                  <div className="avatar flex-shrink-0">
                    <img
                      src="../assets/img/icons/unicons/chart-success.png"
                      alt="chart success"
                      className="rounded"
                    />
                  </div>
                </div>
                <span className="fw-semibold d-block mb-1">Total Students</span>
                <h3 className="card-title mb-2">{dashboardData.user.count}</h3>
              </div>
            </div>

            <div className="card ms-lg-4 mb-4 col-lg-3 col-5 ms-4">
              <div className="card-body">
                <div className="card-title d-flex align-items-start justify-content-between">
                  <div className="avatar flex-shrink-0">
                    <img
                      src="../assets/img/icons/unicons/cc-warning.png"
                      alt="Credit Card"
                      className="rounded"
                    />
                  </div>
                </div>
                <span>Forms</span>
                <h3 className="card-title text-nowrap mb-1">{dashboardData.feedBack.count}</h3>
             
              </div>
            </div>

            <div className="card ms-lg-4 mb-4 col-lg-3  col-5">
              <div className="card-body">
                <div className="card-title d-flex align-items-start justify-content-between">
                  <div className="avatar flex-shrink-0">
                    <img
                      src="../assets/img/icons/unicons/paypal.png"
                      alt="Credit Card"
                      className="rounded"
                    />
                  </div>
                </div>
                <span className="d-block mb-1">AttendanceSheets</span>
                <h3 className="card-title text-nowrap mb-2">{dashboardData.attendanceSheet.count}</h3>
              </div>
            </div>

            <div className="card mb-4 col-lg-3 col-6 ms-4">
              <div className="card-body">
                <div className="card-title d-flex align-items-start justify-content-between">
                  <div className="avatar flex-shrink-0">
                    <img
                      src="../assets/img/icons/unicons/wallet-info.png"
                      alt="Credit Card"
                      className="rounded"
                    />
                  </div>
                </div>
                <span className="d-block mb-1">Batch</span>
                <h3 className="card-title text-nowrap mb-2">{dashboardData.batch.count}</h3>
              </div>
            </div>
          </div>
        </div> */}

        <div className="col-lg-12 col-md-4 order-1">
          <div
            className="d-flex flex-wrap"
            style={{ justifyContent: "space-between" }}
          >
            <div className="card mb-4  col-lg-3 col-md-6 col-12">
              <div className="card-body">
                <div className="card-title d-flex align-items-start justify-content-between">
                  <div className="avatar flex-shrink-0">
                    <img
                      src="../assets/img/icons/unicons/chart-success.png"
                      alt="chart success"
                      className="rounded"
                    />
                  </div>
                </div>
                <span className="fw-semibold d-block mb-1">Total Students</span>
                <h3 className="card-title mb-2">{dashboardData.user.count}</h3>
              </div>
            </div>

            <div className="card mb-4 col-lg-3 col-md-6 col-12">
              <div className="card-body">
                <div className="card-title d-flex align-items-start justify-content-between">
                  <div className="avatar flex-shrink-0">
                    <img
                      src="../assets/img/icons/unicons/cc-warning.png"
                      alt="Credit Card"
                      className="rounded"
                    />
                  </div>
                </div>
                <span>Forms</span>
                <h3 className="card-title text-nowrap mb-1">
                  {dashboardData.feedBack.count}
                </h3>
              </div>
            </div>

            <div className="card mb-4 col-lg-3 col-md-6 col-12">
              <div className="card-body">
                <div className="card-title d-flex align-items-start justify-content-between">
                  <div className="avatar flex-shrink-0">
                    <img
                      src="../assets/img/icons/unicons/paypal.png"
                      alt="Credit Card"
                      className="rounded"
                    />
                  </div>
                </div>
                <span className="d-block mb-1">AttendanceSheets</span>
                <h3 className="card-title text-nowrap mb-2">
                  {dashboardData.attendanceSheet.count}
                </h3>
              </div>
            </div>

            <div className="card mb-4 col-lg-2 col-md-6 col-12">
              <div className="card-body">
                <div className="card-title d-flex align-items-start justify-content-between">
                  <div className="avatar flex-shrink-0">
                    <img
                      src="../assets/img/icons/unicons/wallet-info.png"
                      alt="Credit Card"
                      className="rounded"
                    />
                  </div>
                </div>
                <span className="d-block mb-1">Batch</span>
                <h3 className="card-title text-nowrap mb-2">
                  {dashboardData.batch.count}
                </h3>
              </div>
            </div>
          </div>
        </div>
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
              ["univercityName", "univercityCount", { role: "style" }],
              ["ITM GOI", dashboardData.filteredStats.itmCount, "#696cff"],
              [
                "ITM UNIVERCITY",
                dashboardData.filteredStats.itmUnivercityCount,
                "#ffab00",
              ],
              ["OTHERS", dashboardData.filteredStats.other.count, "#233446"],
            ]}
          />
          <div className="d-flex" style={{ flexWrap: "wrap" }}>
            <div className="h6 m-3">
              ITM GOI: {dashboardData.filteredStats.itmCount}
            </div>
            <div className="h6 m-3">
              ITM UNIVERCITY: {dashboardData.filteredStats.itmUnivercityCount}
            </div>
            <div className="h6 m-3">
              OTHERS: {dashboardData.filteredStats.other.count}
            </div>

            <div className="h6 m-3">
              SUCCESSFULLY REGISTERED(USER ID'S):{" "}
              {dashboardData.user.data.successfullyRegistered}
            </div>
          </div>
        </div>

        <h3 className="mb-4 rounded shadow-sm h4 p-2 bg-white">
          Users from other Universities
        </h3>
        <div
          className="shadow-sm rounded mb-4 bg-white"
          style={{
            flexWrap: "wrap",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Chart
            className="col-lg-6 col-xs-12"
            chartType="PieChart"
            data={[
              ["Univercity Name", "Univercity Count"],
              ...Object.entries(dashboardData.filteredStats.other.data),
            ]}
            options={options}
            height={"390px"}
            width={"95%"}
          />
          <div className="d-flex" style={{ flexWrap: "wrap" }}>
            {Object.keys(dashboardData.filteredStats.other.data).map((elem) => {
              return (
                <div className="h6 ms-2 mb-1">
                  {elem}: {dashboardData.filteredStats.other.data[elem]}
                </div>
              );
            })}
          </div>
        </div>

        <Table
          tableId={"tableOneId"}
          isLink={"showSheet"}
          title={"Attendance Sheet Overview"}
          tableKeys={["view", "name", "moderator", "averageAttendance"]}
          tableData={dashboardData.attendanceSheet.data}
        />

        <Table
          tableId={"tableTwoId"}
          isLink={"batch"}
          title={"Batch Overview"}
          tableKeys={["view", "name", "count"]}
          tableData={dashboardData.batch.data}
        />

        <Table
          tableId={"tableThreeId"}
          isLink={"showformData"}
          title={"Feedback Forms Overview"}
          tableKeys={["view", "name", "noOfResponses", "expectedResponses"]}
          tableData={dashboardData.feedBack.data}
        />
      </div>
    </div>
  );
};

export default Dashboard;

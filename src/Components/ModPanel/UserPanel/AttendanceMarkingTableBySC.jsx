import React, { useEffect, useState, useRef } from "react";
import useAxiosInstance from "../../../axiosInstance";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-buttons/js/dataTables.buttons.js";
import "datatables.net-buttons/js/buttons.colVis.js";
import "datatables.net-buttons/js/buttons.flash.js";
import "datatables.net-buttons/js/buttons.html5.js";
import "datatables.net-buttons/js/buttons.print.js";
import { Link, useNavigate } from "react-router-dom";
import * as faceapi from "face-api.js";
import { toast } from "react-toastify";

const BoardGame = (props) => {
  const { bg, keys, BlockBGS, handleRowSelect, selectedRows, date } = props;
  const history = useNavigate();
  const handleCheckboxChange = () => {
    handleRowSelect(bg["Sl.No."]);
  };

  return (
    <tr>
      <td>
        <Link
          to={
            "/moderator/secuityCode/markSingleAttendance/" + bg['_id']+"/"+
            date +
            "/" +
            bg["Sl.No."] +
            "/" +
            window.location.href.split("/").pop()
          }
        >
          <button type="button" class="btn btn-icon btn-primary">
            <span class="tf-icons bx bx-qr-scan"></span>
          </button>
        </Link>
      </td>
      {keys.map((key) => (
        <td className="text-xs font-weight-bold" key={key}>
          {bg[key]}
        </td>
      ))}
      <td>
        <input
          type="checkbox"
          checked={selectedRows.includes(bg["Sl.No."])}
          onChange={handleCheckboxChange}
        />
      </td>
    </tr>
  );
};

const MarkAttendanceTableModbySC = (props) => {
  const [bgs, setBgs] = useState(props.tableData);
  const [keys, setKeys] = useState(props.tableKeys);
  const [selectedRows, setSelectedRows] = useState([]);
  const axiosInstance = useAxiosInstance();
  const [isLoading, setIsLoading] = useState(false);
  const [sid, setSid] = useState("");
  console.log(bgs)  
  const [faceEmbbedingData, setFaceEmbeddingData] = useState([]);
  const [isVerified, setIsVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [captureVideo, setCaptureVideo] = useState(false);
  const videoRef = useRef();
  const canvasRef = useRef();
  const videoHeight = 400;
  const videoWidth = 260;
  const [count, setCount] = useState(0);
  const videoComponentRef = useRef();

  useEffect(() => {
    if (!$.fn.DataTable.isDataTable("#myTable")) {
      $(document).ready(function () {
        setTimeout(function () {
          $("#table")
            .DataTable({
              pagingType: "full_numbers",
              pageLength: 20,
              processing: true,
              retrieve: true,
              dom: "Bfrtip",
              select: {
                style: "single",
              },
              buttons: [
                {
                  extend: "pageLength",
                  className: "btn btn-outline-primary",
                },

                {
                  extend: "copy",
                  className: "btn btn-outline-primary",
                },
                {
                  extend: "csv",
                  className: "btn btn-outline-primary",
                },
                {
                  extend: "print",
                  customize: function (win) {
                    $(win.document.body).css("font-size", "10pt");
                    $(win.document.body)
                      .find("table")
                      .addClass("compact")
                      .css("font-size", "inherit");
                  },
                  className: "btn btn-outline-primary",
                },
              ],
              lengthMenu: [
                [10, 20, 30, 50, -1],
                [10, 20, 30, 50, "All"],
              ],
            })
            .columns()
            .every(function () {
              var column = this;
              var title = column.footer().textContent;

              $('<input type="text" placeholder="Search ' + title + '" />')
                .appendTo($(column.footer()).empty())
                .on("keyup change clear", function () {
                  if (column.search() !== this.value) {
                    column.search(this.value).draw();
                  }
                });
            });
        }, 2500);
      });
    }
  }, [isLoading]);

  const handleSelectAll = () => {
    const table = $("#table").DataTable();
    const filteredData = table
      .rows({ search: "applied" })
      .data()
      .toArray()
      .flatMap((elem) => elem[2]);
    setSelectedRows((prevState) => {
      setSelectedRows([...prevState, ...filteredData]);
    });
  };

  const handleRowSelect = (id) => {
    let updatedSelectedRows;
    if (selectedRows.includes(id)) {
      updatedSelectedRows = selectedRows.filter((rowId) => rowId !== id);
    } else {
      updatedSelectedRows = [...selectedRows, id];
    }
    setSelectedRows(updatedSelectedRows);
  };

  const BlockBGS = (id) => {};

  const bgsList = () => {
    return bgs.map((bg) => {
      return (
        <BoardGame
          bg={bg}
          keys={keys}
          BlockBGS={BlockBGS}
          handleRowSelect={handleRowSelect}
          selectedRows={selectedRows}
          key={bg._id}
          date={props.date}
        />
      );
    });
  };

  return (
    <>
      {isLoading ? (
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
      ) : (
        <div className="" style={{ marginTop: "50px" }}>
          {/*Scanner Component*/}

          {isVerified && (
            <>
              <div className="bg-white mb-4 p-2 shadow-sm rounded">
                <h3>You (Serial Number {sid}) Have Been Verified</h3>
                <h5>Click the button below to Mark Attendance</h5>
                <button
                  onClick={() => {
                    axiosInstance
                      .patch(
                        "/attendancesheet/markattendance/" +
                          window.location.href.split("/").pop(),
                        {
                          date: props.date,
                          sid: sid,
                        }
                      )
                      .then((res) => {
                        if (res.data._id) {
                          toast.success(
                            "Your Attendance has been marked Successfully !"
                          );
                          setIsVerified(false);
                          setSid("");
                        }
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  }}
                  className="btn btn-primary"
                >
                  <i class="bx bx-pin"></i> Mark
                </button>
              </div>
            </>
          )}

          <div></div>

          <div className="table-responsive  bg-white rounded p-2 shadow-sm">
            <h3>{props.title}</h3>
            <table
              id="table"
              className="table  align-items-center justify-content-center mb-0"
            >
              <thead>
                <tr>
                  <th className="text-primary" scope="col">
                    Action
                  </th>
                  {keys.map((key) => (
                    <th
                      className="text-xs text-primary font-weight-bold"
                      key={key}
                    >
                      {key}
                    </th>
                  ))}
                  <th className="text-primary" scope="col">
                    Select{" "}
                    {/* <button
                      onClick={handleSelectAll}
                      className="btn btn-primary btn-sm"
                    >
                      All
                    </button>{" "} */}
                  </th>
                </tr>
              </thead>
              <tbody>{bgsList()}</tbody>
              <tfoot>
                <tr>
                  <th scope="col">Action</th>
                  {keys.map((key) => (
                    <th
                      className="text-xs font-weight-bold"
                      key={key + "-footer"}
                    >
                      <input
                        type="text"
                        placeholder={"Search " + key}
                        onChange={(e) => {
                          const table = $("#table").DataTable();
                          table
                            .column(key + ":name")
                            .search(e.target.value)
                            .draw();
                        }}
                      />
                    </th>
                  ))}
                  <th scope="col">Select</th>
                </tr>
              </tfoot>
            </table>
            {selectedRows.length != 0 && (
              <div>
                <button
                  onClick={() => {
                    let input = window.prompt("Enter Password");
                    axiosInstance
                      .patch(
                        "/attendancesheet/markall/" +
                          window.location.href.split("/").pop(),
                        {
                          date: props.date,
                          password: input,
                          sids: selectedRows,
                        }
                      )
                      .then((elem) => {
                        if (elem.data._id) {
                          toast.success("Marked Successfully");
                        }
                        if (elem.data.message) {
                          toast.warning(elem.data.message);
                        }
                      })
                      .catch((err) => {
                        console.log("Something Went Wrong");
                      });
                  }}
                  className="btn btn-warning btn-sm me-2"
                >
                  Mark Selected(Admin)
                </button>
                <button
                  onClick={() => {
                    let input = window.prompt("Enter Password");
                    axiosInstance
                      .patch(
                        "/attendancesheet/unMarkall/" +
                          window.location.href.split("/").pop(),
                        {
                          date: props.date,
                          password: input,
                          sids: selectedRows,
                        }
                      )
                      .then((elem) => {
                        if (elem.data._id) {
                          toast.success("UnMarked Successfully");
                        }
                        if (elem.data.message) {
                          toast.warning(elem.data.message);
                        }
                      })
                      .catch((err) => {
                        console.log("Something Went Wrong");
                      });
                  }}
                  className="btn btn-dark btn-sm me-2"
                >
                  Unmark Selected(Admin)
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MarkAttendanceTableModbySC;

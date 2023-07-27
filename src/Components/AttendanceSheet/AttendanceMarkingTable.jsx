import React, { useEffect, useState, useRef } from "react";
import useAxiosInstance from "../../axiosInstance";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-buttons/js/dataTables.buttons.js";
import "datatables.net-buttons/js/buttons.colVis.js";
import "datatables.net-buttons/js/buttons.flash.js";
import "datatables.net-buttons/js/buttons.html5.js";
import "datatables.net-buttons/js/buttons.print.js";
import { Link } from "react-router-dom";
import * as faceapi from "face-api.js";
import { toast } from "react-toastify";

const BoardGame = (props) => {
  const { bg, keys, scanFace, BlockBGS, handleRowSelect, selectedRows } = props;

  const handleCheckboxChange = () => {
    handleRowSelect(bg["Sl.No."]);
  };

  return (
    <tr>
      <td>
        <button
          onClick={() => scanFace(bg.faceEmbbedingData, bg["Sl.No."])}
          type="button"
          class="btn btn-icon btn-primary"
        >
          <span class="tf-icons bx bx-scan"></span>
        </button>
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

const MarkAttendanceTable = (props) => {
  const [bgs, setBgs] = useState(props.tableData);
  const [keys, setKeys] = useState(props.tableKeys);
  const [selectedRows, setSelectedRows] = useState([]);
  const axiosInstance = useAxiosInstance();
  const [isLoading, setIsLoading] = useState(false);
  const [sid, setSid] = useState("");

  const [faceEmbbedingData, setFaceEmbeddingData] = useState([]);
  const [isVerified, setIsVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [captureVideo, setCaptureVideo] = useState(false);
  const videoRef = useRef();
  const canvasRef = useRef();
  const videoHeight = 400;
  const videoWidth = 260;
  const  [count,setCount] = useState(0);
  const videoComponentRef = useRef();

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + "/models";
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]);
      setModelsLoaded(true);
    };
    loadModels();
  }, []);

  const startVideo = () => {
    setCaptureVideo(true);
    navigator.mediaDevices
      .getUserMedia({ video: { height: 400, width: 260 } })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error("error:", err);
      });
  };

  const handleVideoOnPlay = async () => {
    setInterval(async () => {
      if (canvasRef && captureVideo && canvasRef.current && !isVerified) {
        const video = videoRef.current;
        const displaySize = {
          width: video.offsetWidth,
          height: video.offsetHeight,
        };

        try {
          let detections;
          if(count<=5){
          detections = await faceapi
            .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceExpressions()
            .withFaceDescriptor();
          }  
          if (count >= 5) {
            toast.error("Sorry your face didn't match with our database");
            closeWebcam();
          }

          if (detections && count < 5) {
            const resizedDetections = faceapi.resizeResults(
              detections,
              displaySize
            );

            const dist = faceapi.euclideanDistance(
              Object.values(faceEmbbedingData[0]),
              detections.descriptor
            );

            if (dist < 0.456522) {
              setIsVerified(true);
              closeWebcam();
              toast.success("Face Verified");
            } else {
              setCount(count+1);
              toast.info("Trying Again");
            }
          }
        } catch (error) {
          //alert("Error occurred during face detection.");
          console.log(error);
        }
      }
    }, 100);
  };

  const closeWebcam = () => {
    videoRef.current.pause();
    videoRef.current.srcObject.getTracks()[0].stop();
    setCaptureVideo(false);
  };

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

  useEffect(() => {
    console.log(selectedRows);
  }, [selectedRows]);

  const scanFace = (faceEmbbedingData, sid) => {
    videoComponentRef.current.scrollIntoView()
    setIsVerified(false);
    setFaceEmbeddingData(faceEmbbedingData);
    setSid(sid);
    setCount(0)
    startVideo();
  };

  const BlockBGS = (id) => {};

  const bgsList = () => {
    return bgs.map((bg) => {
      return (
        <BoardGame
          bg={bg}
          keys={keys}
          scanFace={scanFace}
          BlockBGS={BlockBGS}
          handleRowSelect={handleRowSelect}
          selectedRows={selectedRows}
          key={bg._id}
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
                <h3>You Have Been Verified</h3>
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

          {captureVideo ? (
            modelsLoaded ? (
              <>
                <div
                  ref={videoComponentRef}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <div
                    className="box m-2 "
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <video
                      ref={videoRef}
                      height={videoHeight}
                      width={videoWidth}
                      onPlay={handleVideoOnPlay}
                      //style={{ borderRadius: "10px" }}
                    />
                    <canvas ref={canvasRef} style={{ position: "absolute" }} />
                  </div>
                </div>
              </>
            ) : (
              <div>
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
              </div>
            )
          ) : (
            <></>
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
                    <button
                      onClick={handleSelectAll}
                      className="btn btn-primary btn-sm"
                    >
                      All
                    </button>{" "}
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

export default MarkAttendanceTable;

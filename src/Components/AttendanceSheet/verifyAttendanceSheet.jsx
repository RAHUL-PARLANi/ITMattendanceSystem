import React, { useEffect, useState, useRef } from "react";
import useAxiosInstance from "../../axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import * as faceapi from "face-api.js";
import Table from "../UnviersalComponents/Table";
import MarkAttendanceTable from "./AttendanceMarkingTable";
import { toast } from "react-toastify";
import { login, logout } from "../../features/attendanceAdmin";
import { useNavigate } from "react-router-dom";

const VerifyAttendanceSheet = () => {
  const history = useNavigate()
  const userData = useSelector((state) => state.users.value);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const axiosInstance = useAxiosInstance();
  const [date, setDate] = useState("");
  const isVerified = useSelector(
    (state) => state.attendanceMod.value.isAuthenticated
  );
  //const isVerified= useSelector((state) => state.attendance.value);
  const [errorMessage, setErrorMessage] = useState("");
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [captureVideo, setCaptureVideo] = useState(false);
  const videoRef = useRef();
  const videoHeight = 400;
  const videoWidth = 260;
  const canvasRef = useRef();
  let count = 0;
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(0);
  useEffect(() => {
    axiosInstance
      .get(
        "/attendancesheet/marksheet/" + window.location.href.split("/").pop()
      )
      .then((elem) => {
        setData(elem.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something Went Wrong");
        setIsLoading(false);
      });
  }, [refresh]);

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + "/models";
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        //faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
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

  useEffect(() => {
    console.log(isVerified);
  }, [isVerified]);

  const handleVideoOnPlay = async () => {
    setInterval(async () => {
      if (canvasRef && captureVideo && canvasRef.current && !isVerified) {
        const video = videoRef.current;
        const displaySize = {
          width: video.offsetWidth,
          height: video.offsetHeight,
        };

        try {
          const detections = await faceapi
            .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceExpressions()
            .withFaceDescriptor();

          if (count >= 5) {
            toast.error("Sorry your face is not matching with our Database");
            closeWebcam();
            dispatch(logout());
            window.location.reload()
          }

          if (detections && count < 5) {
            const resizedDetections = faceapi.resizeResults(
              detections,
              displaySize
            );

            const dist = faceapi.euclideanDistance(
              Object.values(data.moderator.faceEmbbedingData[0]),
              detections.descriptor
            );

            if (dist < 0.456522) {
              //setIsVerified(true);
              dispatch(login({ date: date }));
              closeWebcam();
              toast.success("Admin Verified");
            } else {
              count++;
              toast.warning(
                "Your Face is not Matching with Our Database, trying again"
              );
            }
          }
        } catch (error) {
          console.log("Error occurred during face detection.");
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
      <div>
        {captureVideo ? (
          modelsLoaded ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            ><div>
              <div>
                {captureVideo && modelsLoaded ? (
                  <button
                    className="btn btn-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      closeWebcam();
                    }}
                  >
                    Close Webcam
                  </button>
                ) : (
                  <button
                    className="btn btn-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      startVideo();
                    }}
                  >
                    Scan my Face
                  </button>
                )}
              </div>
              <div
                className="box  m-2 "
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
                  style={{ borderRadius: "10px" }}
                />
                <canvas ref={canvasRef} style={{ position: "absolute" }} />
              </div>
            </div>
            </div>
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
      </div>

      {errorMessage && (
        <div className="alert alert-success" role="alert">
          {errorMessage}
        </div>
      )}
      {isVerified ? (
        <>
          {/* <MarkAttendanceTable
            title={"Student List"}
            date={date}
            tableKeys={["Sl.No.", "FullName", "RollNo", date]}
            tableData={data.attendanceData}
          /> */}

          <div>You have been Verfied</div>
          {/* <button
            onClick={() => {
              setRefresh(refresh+1)
            }}
            className="btn btn-primary btn-sm mt-2"
            >
            <i class="bx bx-refresh"></i>
            </button>
            */}
        </>
      ) : (
        <>
          <h3 className="p-2 h3 mt-4 mb-3 bg-white rounded shadow-sm">
            {data.sheetName}
          </h3>
          <div className="bg-white p-2 shadow-sm rounded">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                startVideo();
              }}
            >
              <div className="mb-3">
                <label className="form-label">Select Date and Half :</label>
                <select
                  required
                  type="select"
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                  }}
                  className="form-select select2"
                >
                  <option value={""}>Choose</option>
                  {Object.keys(data.attendanceData[0])
                    .filter(
                      (key) =>
                        ![
                          "Sl.No.",
                          "FullName",
                          "RollNo",
                          "Branch",
                          "faceEmbbedingData",
                        ].includes(key)
                    )
                    .map((elem) => {
                      return <option value={elem}>{elem}</option>;
                    })}
                </select>
                <input
                  type="submit"
                  value="Submit"
                  disabled={date === ""}
                  className="btn btn-primary mt-4"
                />
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default VerifyAttendanceSheet;

import React, { useEffect, useState } from "react";
import useAxiosInstance from "../../axiosInstance";
import { useSelector } from "react-redux";
import * as faceapi from "face-api.js";
import Table from "../UnviersalComponents/Table";

const MarkAttendanceSheet = () => {
  const userData = useSelector((state) => state.users.value);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const axiosInstance = useAxiosInstance();
  const [date, setDate] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    axiosInstance
      .get("/attendancesheet/" + window.location.href.split("/").pop())
      .then((elem) => {
        setData(elem.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert("Something Went Wrong");
        setIsLoading(false);
      });
  }, []);

  //Face Verification Code
  const [modelsLoaded, setModelsLoaded] = React.useState(false);
  const [captureVideo, setCaptureVideo] = React.useState(false);

  const videoRef = React.useRef();
  const videoHeight = 400;
  const videoWidth = 300;
  const canvasRef = React.useRef();

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
      .getUserMedia({ video: { height: 400, width: 300 } })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error("error:", err);
      });
  };

  const handleVideoOnPlay = () => {
    setInterval(async () => {
      console.log(data.moderator);
      if (canvasRef && captureVideo && canvasRef.current) {
        const video = videoRef.current;

        const displaySize = {
          width: video.offsetWidth,
          height: video.offsetHeight,
        };

        faceapi.matchDimensions(canvasRef.current, displaySize);

        const detections = await faceapi
          .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceExpressions()
          .withFaceDescriptor();

        let count = 0;
        if (detections && count < 5) {
          const resizedDetections = faceapi.resizeResults(
            detections,
            displaySize
          );
          console.log(detections.descriptor);
          const dist = faceapi.euclideanDistance(
            Object.values(data.moderator.faceEmbbedingData[0]),
            detections.descriptor
          );
          console.log(dist);
          if (dist < 0.5) {
            alert("Verifed");
            setIsVerified(true);
            closeWebcam();
          } else {
            alert("Your Face is not Matching with Our Data Base");
            count++;
          }
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
    <div
        className="modal fade"
        id="basicModal"
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel1">
                Verify Yourself
              </h5>
              <button
                type="button"
                onClick={() => {
                  closeWebcam();
                }}
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div>
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
                {captureVideo ? (
                  modelsLoaded ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        className="box  m-2 border border-primary border-4 rounded"
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
                        <canvas
                          ref={canvasRef}
                          style={{ position: "absolute" }}
                        />
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

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  data-bs-dismiss="modal"
                  onClick={(e) => {
                    e.preventDefault();
                    closeWebcam();
                  }}
                >
                  Close
                </button>
                <button
                  disabled={isVerified == false}
                  type="submit"
                  className="btn btn-primary"
                >
                  Next
                </button>
                
                
              </div>
            </div>
          </div>
        </div>
    </div>  
    {isVerified===true?<>
    <Table title={'Student List'} tableKeys={['Sl.No.','FullName','RollNo']} tableData={data.attendanceData}/>
    </>:
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
              data-bs-toggle="modal"
              data-bs-target="#basicModal"
              className="btn btn-primary mt-4"
            />
          </div>
        </form>
      </div>
              
    </>}
      </div>  
     );
};

export default MarkAttendanceSheet;

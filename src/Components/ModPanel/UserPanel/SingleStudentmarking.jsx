import React, { useEffect, useState, useRef } from "react";
import useAxiosInstance from "../../../axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import * as faceapi from "face-api.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SingleStudentMarkingMod = () => {
  let count = 0;
  const [sid,setSid] = useState("");
  const userData = useSelector((state) => state.users.value);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const axiosInstance = useAxiosInstance();
  const [date, setDate] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [captureVideo, setCaptureVideo] = useState(false);
  const videoRef = useRef();
  const videoHeight = 400;
  const videoWidth = 260;
  const canvasRef = useRef();
  
  const history = useNavigate() 
  const [refresh, setRefresh] = useState(0);
  useEffect(() => {
    setSid(window.location.href.split('/').at(-2))
    axiosInstance
      .post(
        "/attendancesheet/attendanceRecord/" +
          window.location.href.split("/").pop(),
        { sid: window.location.href.split("/").at(-2) }
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
    count=0;
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
          const detections = await faceapi
            .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceExpressions()
            .withFaceDescriptor();

          if (count >= 5) {
            toast.error("Sorry your face is not matching with our Database");
            closeWebcam();
          }

          if (detections && count < 5) {
            const resizedDetections = faceapi.resizeResults(
              detections,
              displaySize
            );

            const dist = faceapi.euclideanDistance(
              Object.values(data.faceEmbbedingData[0]),
              detections.descriptor
            );

            if (dist < 0.456522) {
              setIsVerified(true);
              closeWebcam();
              toast.success("Student Verified");
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
    }, 400);
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
      {errorMessage && (
        <div className="alert alert-success" role="alert">
          {errorMessage}
        </div>
      )}
      {isVerified ? (
        <>
          <div className="bg-white mt-4 mb-4 p-2 shadow-sm rounded">
            <h3>You (Serial Number {sid}) Have Been Verified</h3>
            <h5>Click the button below to Mark Attendance</h5>
            <button
              onClick={() => {
                setIsLoading(true)
                axiosInstance
                  .patch(
                    "/attendancesheet/markattendance/" +
                      window.location.href.split("/").pop(),
                    {
                      date: window.location.href.split('/').at(-3).replaceAll('%20'," "),
                      sid: sid,
                    }
                  )
                  .then((res) => {
                    setIsLoading(false)
                    if (res.data._id) {
                      toast.success(
                        "Your Attendance has been marked Successfully !"
                      );
                      setTimeout(
                        history(-1)
                      ,1000)
                      //setIsVerified(false);
                      setSid("");
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                    setIsLoading(false)
                  });
              }}
              className="btn btn-primary"
            >
              <i class="bx bx-pin"></i> Mark
            </button>
          </div>
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
          <div className="text-center mt-4">
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
                  className="box  m-2"
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
        </>
      )}
    </div>
  );
};

export default SingleStudentMarkingMod;

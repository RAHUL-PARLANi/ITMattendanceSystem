import React, { useEffect, useState, useRef } from "react";
import useAxiosInstance from "../../../axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import * as faceapi from "face-api.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import QrScanner from "react-qr-scanner";

const SingleStudentMarkingModBySC = () => {
  const [studentId, setStudentId] = useState("");
  const [sid, setSid] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const axiosInstance = useAxiosInstance();
  const [isVerified, setIsVerified] = useState(false);
  const [data, setData] = useState({});
  const history = useNavigate();
  const [refresh, setRefresh] = useState(0);
  const [scannedText, setScannedText] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);

  const [code, setCode] = useState("");
  useEffect(() => {
    setStudentId(window.location.href.split("/").at(-4));
    setSid(window.location.href.split("/").at(-2));
    axiosInstance
      .post(
        "/attendancesheet/attendanceRecord/" +
          window.location.href.split("/").pop(),
        { sid: window.location.href.split("/").at(-2) }
      )
      .then((elem) => {
        setCode(
          `${window.location.href.split("/").at(-4)}${elem.data["FullName"]}${
            elem.data["RollNo"]
          }${window.location.href.split("/").at(-2)}${window.location.href
            .split("/")
            .pop()}${window.location.href.split("/").at(-3)}`
        );
        console.log(elem.data);
        setData(elem.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something Went Wrong");
        setIsLoading(false);
      });
  }, []);

  const sendCode = () => {
    setIsLoading(true);
    axiosInstance
      .post("/securityCode", {
        studentId: window.location.href.split("/").at(-4),
        studentUserName: data["FullName"],
        studentRollNo: data["RollNo"],
        sid: window.location.href.split("/").at(-2),
        sheetId: window.location.href.split("/").pop(),
        date: window.location.href.split("/").at(-3).replaceAll("%20", " "),
        code: code,
      })
      .then((res) => {
        if (res.data.studentUserName) {
          toast.success(
            "Authentication Code has been successfully sent to " +
              res.data.studentUserName
          );
          setIsCodeSent(true);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
        setIsLoading(false);
      });
  };

  const videoRef = useRef(null);

  const handleScan = (data) => {
    if (data) {
      setScannedText(data.text);
      if (JSON.parse(data.text).code === code) {
        toast.success("Code has been Verified");
        setIsVerified(true);
        axiosInstance
          .delete("/securityCode/" + JSON.parse(data.text).userId)
          .then((elem) => {
            if (elem.data.message) {
              toast.success(
                "Secuirty Code has been deleted from the student device"
              );
            }
          })
          .catch((err) => {
            toast.error("Failed to delete Code.");
            console.log(err);
          });
      } else {
        toast.success(`Didn't Matched`);
      }
    }
  };

  const handleError = (error) => {
    console.error(error);
    toast.warning("Something went wrong during Scanning QR Code");
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
    <div className="container-fluid mt-4">
      {isVerified ? (
        <>
          <div className="bg-white mt-4 mb-4 p-2 shadow-sm rounded">
            <h3>You (Serial Number {sid}) Have Been Verified</h3>
            <h5>Click the button below to Mark Attendance</h5>
            <button
              onClick={() => {
                setIsLoading(true);
                axiosInstance
                  .patch(
                    "/attendancesheet/markattendance/" +
                      window.location.href.split("/").pop(),
                    {
                      date: window.location.href
                        .split("/")
                        .at(-3)
                        .replaceAll("%20", " "),
                      sid: sid,
                    }
                  )
                  .then((res) => {
                    setIsLoading(false);
                    if (res.data._id) {
                      toast.success(
                        "Your Attendance has been marked Successfully !"
                      );
                      setTimeout(history(-1), 1000);
                      //setIsVerified(false);
                      setSid("");
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                    setIsLoading(false);
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
      ) : isCodeSent ? (
        <>
          <div className="card p-2 h6 w-100 rounded shadow-sm mb-3 ">
            Scan Athentication Qr Code
          </div>
          <div className="card w-100 rounded shadow-sm">
            <div>
              <QrScanner
                delay={300}
                onError={handleError}
                onScan={handleScan}
                facingmode="rear"
                constraints={{
                  video: { facingMode: "environment" },
                  audio: false,
                }}
                style={{ width: "100%" }}
                ref={videoRef}
              />
            </div>
          </div>
        </>
      ) : (
        <div style={{ textAlign: "center" }}>
          <button onClick={sendCode} className="btn btn-primary">
            Send Authentication Code
          </button>
        </div>
      )}
    </div>
  );
};

export default SingleStudentMarkingModBySC;

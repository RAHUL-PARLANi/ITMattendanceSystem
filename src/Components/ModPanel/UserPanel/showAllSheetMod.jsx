import React, { useEffect, useState } from "react";
import useAxiosInstance from "../../../axiosInstance";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../features/attendanceAdmin";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const ShowAllAttendanceSheetsMod = () => {
  const [data, setData] = useState([]);
  const userData = useSelector((state) => state.users.value);
  const [isLoading, setIsLoading] = useState(true);
  const axiosInstance = useAxiosInstance();
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [selectedSheetId, setSelectedSheetId] = useState(null);

  const handleClose = () => setShowModal(false);
  const handleShow = (sheetId) => {
    setSelectedSheetId(sheetId);
    setShowModal(true);
  };

  useEffect(() => {
    dispatch(logout());
    axiosInstance
      .get("attendancesheet/allSheetsForMod/" + userData.id)
      .then((elem) => {
        setData(elem.data);
        setIsLoading(false);
      })
      .catch((err) => {
        alert("Something Went Wrong");
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
      {data.length === 0 && (
        <div className="card p-2 h6 w-100 rounded shadow-sm mb-3 ">
          No Allotted Attendance sheet found.
        </div>
      )}
      <div className="row mt-4">
        {data.map((elem, index) => {
          return (
            <div key={index} className="col-md-6  col-lg-4">
              <div className="card w-100 rounded shadow-sm mb-3 ">
                <div className="card-body">
                  <h5 className="card-title text-center fw-bold h5 text-primary">
                    {elem.sheetName}
                  </h5>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <span className="h6">Batch</span>{" "}
                    <span>{elem?.batch}</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <span className="h6">Module</span>{" "}
                    <span>{elem.module}</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <span className="h6">Moderator Name</span>{" "}
                    <span>{elem.moderator.name}</span>
                  </div>
                  <h6>
                    {elem.startDate} to {elem.endDate}
                  </h6>
                  <div>
                    <div
                      onClick={() => handleShow(elem._id)} // Pass the sheetId to handleShow
                      className="btn btn-primary me-2"
                    >
                      <i className="bx bx-scan"></i> Mark Attendance
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {selectedSheetId && ( // Show the modal only when selectedSheetId is not null
        <Modal show={showModal} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Attendance Tracking Methods</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Link
              style={{
                color: "inherit",
                textDecoration: "inherit",
              }}
              to={`/moderator/markAttendance/${selectedSheetId}`}
            >
              {/* ... rest of the code for the first tracking method ... */}
              <div className="card rounded shadow-sm w-100 mb-3">
                          <div className="row g-0">
                            <div className="col-md-4">
                              <img
                                className="card-img card-img-left"
                                src="https://static.vecteezy.com/system/resources/previews/002/626/544/original/recognition-face-scanner-free-vector.jpg"
                                alt="Card image"
                              />
                            </div>
                            <div className="col-md-8">
                              <div className="card-body">
                                <h5 className="card-title">
                                  Face Recognition Method
                                </h5>
                                <p className="card-text">
                                  In this method, administrators circulate a
                                  device among students, allowing them to mark
                                  attendance by verifying their faces. The
                                  system uses face recognition technology to
                                  accurately record and track attendance,
                                  streamlining the process efficiently.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
            </Link>
            <Link
              style={{
                color: "inherit",
                textDecoration: "inherit",
              }}
              to={`/moderator/secuityCode/markAttendance/${selectedSheetId}`}
            >
              {/* ... rest of the code for the second tracking method ... */}
              <div className="card rounded shadow-sm w-100">
                        <div className="row g-0">
                          <div className="col-md-4">
                            <img
                              className="card-img card-img-left"
                              src="https://static.vecteezy.com/system/resources/previews/015/873/570/original/qr-code-scan-illustration-in-flat-style-mobile-phone-scanning-illustration-on-isolated-background-barcode-reader-in-hand-sign-business-concept-vector.jpg"
                              alt="Card image"
                            />
                          </div>
                          <div className="col-md-8">
                            <div className="card-body">
                              <h5 className="card-title">
                                Security Code Scanning Method
                              </h5>
                              <p className="card-text">
                                In this method, administrators use unique codes
                                displayed on students' devices for attendance.
                                Scanning these codes with a designated system
                                marks attendance securely, accessible only to
                                authorized personnel. This approach ensures an
                                efficient and confidential process.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
            </Link>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default ShowAllAttendanceSheetsMod;

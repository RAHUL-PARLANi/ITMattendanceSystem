import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAxiosInstance from "../../axiosInstance";
import { login } from "../../features/user";
import * as faceapi from "face-api.js";
import "../FaceDetection/FaceDetection.css";
import { CollegeData } from "./CollegeData";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const CreateProfile = () => {
  const axiosInstance = useAxiosInstance();
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({});
  const [univercityType, setUnivercityType] = useState("");
  const [univercityName, setUnivercityName] = useState("");
  const [miniLoading, setMiniLoading] = useState(false);

  //faceEmbedding
  const [faceEmbedding, setFaceEmbedding] = useState([]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const [newEmail, setNewEmail] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const userData = useSelector((state) => state.users.value);

  const dispatch = useDispatch();

  const Page1Data = [
    {
      name: "name",
      label: "Name(Block Letter)",
      type: "text",
      required: "true",
    },
    {
      name: "fatherName",
      label: "Father Name(Block Letter)",
      type: "text",
      required: "true",
    },
    {
      name: "rollNo",
      label: "Roll Number",
      type: "text",
      required: "true",
    },
    {
      name: "WorkingEmailId",
      label: "Working Email",
      type: "text",
      required: "text",
    },
    {
      name: "phoneNumber",
      label: "Phone Number",
      type: "text",
      required: "true",
    },
    {
      name: "branch",
      label: "Branch",
      type: "select",
      options: ["MBA", "CS", "IT", "CIVIL", "MECHANICAL", "MCA", "EC", "EE"],
      required: "true",
    },
    {
      name: "batch",
      label: "Batch",
      type: "text",
      options: ["CS-A", "CS-B", "CS-C", "CS-D", "IT-A", "IT-B", "Others"],
      required: "true",
    },
    {
      name: "dateOfBirth",
      label: "Date Of Birth",
      type: "date",
      required: "true",
    },
    {
      name: "gender",
      label: "Gender",
      type: "select",
      options: ["M", "F", "O"],
      required: "true",
    },
  ];

  const Page2Data = [
    {
      name: "noOfCurrentBacklogs",
      label: "No. of Current Backlogs",
      type: "Number",
      required: true,
    },
    {
      name: "historyOfBacklogs",
      label: "History of Backlogs",
      type: "Number",
      required: true,
    },
    {
      name: "tenthMarksPercentage",
      label: "10th Marks Percentage",
      type: "Number",
      required: true,
    },
    {
      name: "tenthBoardName",
      label: "10th Board Name",
      type: "text",
      required: true,
    },
    {
      name: "tenthPassingYear",
      label: "10th Passing Year",
      type: "text",
      required: true,
    },
    {
      name: "tweelthMarksPercentage",
      label: "12th Marks Percentage",
      type: "Number",
      required: true,
    },
    {
      name: "tweelthBoardName",
      label: "12th Board Name",
      type: "text",
      required: true,
    },
    {
      name: "tweelthPassingYear",
      label: "12th Passing Year",
      type: "text",
      required: true,
    },
    {
      name: "graduationBranch",
      label: "Graduation Branch",
      type: "text",
      required: true,
    },
    {
      name: "aggregatePercentageGraduation",
      label: "Aggregate Percentage (Graduation)",
      type: "Number",
      required: true,
    },
    {
      name: "univercityNameGraduation",
      label: "University Name (Graduation)",
      type: "text",
      required: true,
    },
    {
      name: "yearOfPassingGraduation",
      label: "Year of Passing (Graduation)",
      type: "text",
      required: true,
    },
    {
      name: "youHaveLaptop",
      label: "Do you have a Laptop?",
      type: "select",
      options: ["YES", "NO"],
      required: true,
    },
    {
      name: "busFacility",
      label: "Bus Facility",
      type: "select",
      options: ["YES", "NO"],
      required: true,
    },
  ];

  useEffect(() => {
    axiosInstance
      .get("/users/" + userData.id)
      .then((res) => {
        setFormData(res.data);
        setFaceEmbedding(res.data.faceEmbbedingData)
        setUnivercityName(res.data.currentUnivercity.name || "");
        setUnivercityType(res.data.currentUnivercity.type || "");
        setIsLoading(false);
        if (res.data.isSuccessFullyRegistered === false) {
          toast.warning("Please Complete Your Profile");
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);
  const history = useNavigate();
  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    setIsLoading(true);
    axiosInstance
      .patch("/users/" + userData.id, {
        ...formData,
        currentUnivercity: {
          name: univercityName,
          type: univercityType,
        },
        isSuccessFullyRegistered: true,
        faceEmbbedingData: faceEmbedding,
      })
      .then((res) => {
        setIsLoading(false);
        if (res.data.isSuccessFullyRegistered) {
          toast.success(
            "Successfully Registered, Now the Page will be reloaded"
          );
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      })
      .catch((er) => {
        toast.error("Something went Wrong");
        console.log(er);
      });
  };

  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);

  const imageRef = useRef();
  const canvasRef = useRef();

  // Load face-api.js models
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

  useEffect(() => {
    loadModels();
  }, []);

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Perform face detection on the uploaded image
  const handleImageDetection = async () => {
    if (modelsLoaded && uploadedImage) {
      const image = imageRef.current;

      const displaySize = {
        width: image.offsetWidth,
        height: image.offsetHeight,
      };

      faceapi.matchDimensions(canvasRef.current, displaySize);

      const detections = await faceapi
        .detectSingleFace(image, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions()
        .withFaceDescriptor();

      if (detections) {
        setMiniLoading(false);
        const resizedDetections = faceapi.resizeResults(
          detections,
          displaySize
        );

        const canvas = canvasRef.current;
        canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
        faceapi.draw.drawDetections(canvas, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
        console.log(detections.descriptor);

        if (detections.alignedRect.score > 0.85) {
          toast.success("Face detected!");
          setFaceEmbedding(detections.descriptor);
        } else {
          toast.warning(
            "No face detected or face score is low.Try again, a face score of 0.85 is recommended"
          );
        }
      } else {
        toast.error("No face detected.");
      }
    }
  };

  if (isLoading) {
    return (
      <>
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
      </>
    );
  } else if (page == 1) {
    return (
      <div>
        <div className="container-xxl flex-grow-1 container-p-y">
          <div className="row">
            <div className="col-lg-12 w-100">
              <ul className="nav nav-pills flex-column flex-md-row mb-3">
                <li className="nav-item">
                  <a className="nav-link">
                    <i className="bx bx-scan me-1" /> Face Scan
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active">
                    <i className="bx bx-user me-1" /> Basic Information
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link">
                    <i className="bx bx-bell me-1" /> Education Details
                  </a>
                </li>
              </ul>
              <div className="card rounded shadow-sm w-100 mb-4">
                <h5 className="card-header">Basic Details</h5>
                <hr className="my-0" />
                <div className="card-body">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setPage(2);
                    }}
                  >
                    <div className="row">
                      {Page1Data.map((field) => {
                        return (
                          <>
                            <>
                              {field.type === "select" ? (
                                <div className="mb-3 col-md-6">
                                  <label
                                    htmlFor="language"
                                    className="form-label"
                                  >
                                    {field.label}
                                  </label>
                                  <select
                                    required={field.required}
                                    type="select"
                                    id={field.name}
                                    name={field.name}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                    disabled={
                                      userData.isSuccessFullyRegistered === true
                                    }
                                    className="select2 text-black form-select"
                                  >
                                    <option value={""}>Choose</option>
                                    {field.options?.map((elem) => {
                                      return (
                                        <option value={elem}>{elem}</option>
                                      );
                                    })}
                                  </select>
                                </div>
                              ) : (
                                <div className="mb-3 col-md-6">
                                  <label
                                    htmlFor="firstName"
                                    className="form-label"
                                  >
                                    {field.label}
                                  </label>
                                  <input
                                    className="form-control "
                                    required={field.required}
                                    type={field.type}
                                    id={field.name}
                                    name={field.name}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                    autofocus=""
                                    disabled={
                                      userData.isSuccessFullyRegistered === true
                                    }
                                  />
                                </div>
                              )}
                            </>
                          </>
                        );
                      })}
                      <div className="mb-3 col-md-6">
                        <label
                          htmlFor="selectUnivercityType"
                          className="form-label"
                        >
                          College Name
                        </label>
                        <select
                          required
                          type="select"
                          id={"selectUnivercityType"}
                          value={univercityType}
                          onChange={(e) => {
                            setUnivercityType(e.target.value);
                            if (e.target.value === "itmGoi") {
                              setUnivercityName("ITM GOI");
                            } else if (e.target.value === "itmUnivercity") {
                              setUnivercityName("ITM UNIVERCITY");
                            }
                          }}
                          disabled={userData.isSuccessFullyRegistered === true}
                          className="select2 text-black form-select"
                        >
                          <option value={""}>Choose</option>
                          {[
                            { value: "itmGoi", label: "ITM GOI" },
                            { value: "itmUnivercity", label: "ITM UNIVERCITY" },
                            { value: "others", label: "Others" },
                          ].map((elem) => {
                            return (
                              <option value={elem.value}>{elem.label}</option>
                            );
                          })}
                        </select>
                      </div>
                      {univercityType === "others" && (
                        <div className="mb-3 col-md-6">
                          <label
                            htmlFor="selectUnivercityName"
                            className="form-label"
                          >
                            if Others, Select One Of These
                          </label>
                          <select
                            required
                            type="select"
                            id={"selectUnivercityName"}
                            value={univercityName}
                            onChange={(e) => {
                              setUnivercityName(e.target.value);
                            }}
                            disabled={
                              userData.isSuccessFullyRegistered === true
                            }
                            className="select2 text-black form-select"
                          >
                            <option value={""}>Choose</option>
                            {CollegeData.map((elem) => {
                              return <option value={elem}>{elem}</option>;
                            })}
                          </select>
                        </div>
                      )}
                    </div>
                    <div className="mt-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault()
                          setPage(0);
                        }}
                        className="btn btn-outline-primary me-2"
                      >
                        back
                      </button>
                      <button type="submit" className="btn btn-primary me-2">
                        Next
                      </button>

                      {userData.isSuccessFullyRegistered && (
                        <button
                          type="button"
                          data-bs-toggle="modal"
                          data-bs-target="#basicModal"
                          className="btn btn-outline-primary mt-lg-0 mt-2"
                        >
                          Request Changes
                        </button>
                      )}
                    </div>
                  </form>
                </div>
                {/* /Account */}
              </div>
            </div>
          </div>
        </div>

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
                  Changes
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    axiosInstance
                      .post("/request/", {
                        submittedById: userData.id,
                        submittedByName: formData["name"],
                        submittedByRollNumber: formData["rollNo"],
                        newPhoneNumber: newPhoneNumber,
                        newEmail: newEmail,
                      })
                      .then((elem) => {
                        if (elem.data._id) {
                          toast.success("Request Raised Successfully");
                        }
                      })
                      .catch((err) => {
                        toast.error("Something Went Wrong");
                      });
                  }}
                >
                  <h5>
                    Your new data will be updated once it is approved by our
                    Admin
                  </h5>
                  <div className="mb-3">
                    <label
                      className="form-label"
                      htmlFor="basic-default-fullname"
                    >
                      New Working Email
                    </label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      id="basic-default-fullname"
                      value={newEmail}
                      onChange={(e) => {
                        setNewEmail(e.target.value);
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      className="form-label"
                      htmlFor="basic-default-company"
                    >
                      New Phone Number
                    </label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      id="basic-default-company"
                      value={newPhoneNumber}
                      onChange={(e) => {
                        setNewPhoneNumber(e.target.value);
                      }}
                    />
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Request changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (page == 2) {
    return (
      <div>
        <div className="container-xxl flex-grow-1 container-p-y">
          <div className="row">
            <div className="col-md-12">
              <ul className="nav nav-pills flex-column flex-md-row mb-3">
                <li className="nav-item">
                  <a className="nav-link">
                    <i className="bx bx-scan me-1" /> Face Scan
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link ">
                    <i className="bx bx-user me-1" /> Basic Information
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active">
                    <i className="bx bx-bell me-1" /> Education Details
                  </a>
                </li>
              </ul>
              <div className="card rounded shadow-sm w-100 mb-4">
                <h5 className="card-header">Education Details</h5>
                {/* Account */}
                {/* <div className="card-body">
                  <div className="d-flex align-items-start align-items-sm-center gap-4">
                    <img
                      src="../assets/img/avatars/1.png"
                      alt="user-avatar"
                      className="d-block rounded"
                      height={100}
                      width={100}
                      id="uploadedAvatar"
                    />
                    <div className="button-wrapper">
                      <label
                        htmlFor="upload"
                        className="btn btn-primary me-2 mb-4"
                        tabIndex={0}
                      >
                        <span className="d-none d-sm-block">
                          Upload new photo
                        </span>
                        <i className="bx bx-upload d-block d-sm-none" />
                        <input
                          type="file"
                          id="upload"
                          className="account-file-input"
                          hidden=""
                          accept="image/png, image/jpeg"
                        />
                      </label>
                      <button
                        type="button"
                        className="btn btn-outline-secondary account-image-reset mb-4"
                      >
                        <i className="bx bx-reset d-block d-sm-none" />
                        <span className="d-none d-sm-block">Reset</span>
                      </button>
                      <p className="text-muted mb-0">
                        Allowed JPG, GIF or PNG. Max size of 800K
                      </p>
                    </div>
                  </div>
                </div> */}
                <hr className="my-0" />
                <div className="card-body">
                  <form
                    onSubmit={handleSubmit}
                  >
                    <div className="row">
                      {Page2Data.map((field) => {
                        return (
                          <>
                            <>
                              {field.type === "select" ? (
                                <div className="mb-3 col-md-6">
                                  <label
                                    htmlFor="language"
                                    className="form-label"
                                  >
                                    {field.label}
                                  </label>
                                  <select
                                    required={field.required}
                                    type="select"
                                    id={field.name}
                                    name={field.name}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                    className="select2 form-select"
                                    disabled={
                                      userData.isSuccessFullyRegistered === true
                                    }
                                  >
                                    <option value={""}>Choose</option>
                                    {field.options?.map((elem) => {
                                      return (
                                        <option value={elem}>{elem}</option>
                                      );
                                    })}
                                  </select>
                                </div>
                              ) : (
                                <div className="mb-3 col-md-6">
                                  <label
                                    htmlFor="firstName"
                                    className="form-label"
                                  >
                                    {field.label}
                                  </label>
                                  <input
                                    className="form-control"
                                    required={field.required}
                                    type={field.type}
                                    id={field.name}
                                    name={field.name}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                    autofocus=""
                                    disabled={
                                      userData.isSuccessFullyRegistered === true
                                    }
                                  />
                                </div>
                              )}
                            </>
                          </>
                        );
                      })}
                    </div>
                    <div className="mt-2">
                      <button
                        className="btn btn-outline-primary me-2"
                        onClick={() => {
                          setPage(1);
                        }}
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={userData.isSuccessFullyRegistered === true}
                        className="btn btn-primary me-2"
                      >
                        Save Details
                      </button>
                    </div>
                  </form>
                </div>
                {/* /Account */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (page == 0) {
    return (
      <div>
        <div className="container-xxl flex-grow-1 container-p-y">
          <div className="row">
            <div className="col-md-12">
              <ul className="nav nav-pills flex-column flex-md-row mb-3">
                <li className="nav-item">
                  <a className="nav-link active">
                    <i className="bx bx-scan me-1" /> Face Scan
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link ">
                    <i className="bx bx-user me-1" /> Basic Information
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link ">
                    <i className="bx bx-bell me-1" /> Education Details
                  </a>
                </li>
              </ul>
              <div className="card rounded shadow-sm w-100 mb-4">
                <h5 className="card-header">Face Scan</h5>
                <hr className="my-0" />
                <div className="card-body">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setPage(1);
                    }}
                  >
                    {/* <FaceDetection/>  */}

                    <div>
                      <div className="button-wrapper">
                        <label
                          htmlFor="upload"
                          className="btn btn-primary me-2 mb-4"
                        >
                          <span
                            className="d-sm-block"
                            style={{ display: "flex" }}
                          >
                            <span>Click Your Selfie and upload it.</span>
                          </span>
                          <input
                              disabled={
                                userData.isSuccessFullyRegistered === true
                              }
                            type="file"
                            id="upload"
                            className="account-file-input form-control"
                            hidden=""
                            accept="image/png, image/jpeg"
                            onChange={handleImageUpload}
                          />
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            setUploadedImage(null);
                          }}
                          className="btn btn-outline-secondary account-image-reset mb-4"
                        >
                          <i className="bx bx-reset d-block d-sm-none" />
                          <span className="d-none d-sm-block">Reset</span>
                        </button>
                        <p className="text-muted mb-0">
                          This image will only be used for extracting your Face
                          Data.
                        </p>
                      </div>

                      <br />
                      {uploadedImage ? (
                        <>
                          {miniLoading && <div>Detecting Face.....</div>}
                          <div
                            style={{
                              position: "relative",
                              display: "inline-block",
                              width: "300px",
                            }}
                          >
                            <img
                              ref={imageRef}
                              src={uploadedImage}
                              alt="Uploaded"
                              style={{
                                borderRadius: "10px",
                                width: "100%",
                                height: "auto",
                              }}
                              onLoad={() => {
                                setMiniLoading(true);
                                handleImageDetection();
                              }}
                            />
                            <canvas
                              ref={canvasRef}
                              style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                borderRadius: "10px",
                              }}
                            />
                          </div>
                        </>
                      ) : (
                        <div>No image uploaded yet.</div>
                      )}
                      {modelsLoaded ? (
                        <></>
                      ) : (
                        <div>
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
                                <span className="visually-hidden">
                                  Loading...
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="mt-2">
                      <button
                        type="submit"
                        disabled={faceEmbedding.length == 0}
                        className="btn btn-primary me-2"
                      >
                        Next{" "}
                      </button>
                    </div>
                  </form>
                </div>
                {/* /Account */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default CreateProfile;

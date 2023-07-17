import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAxiosInstance from "../../axiosInstance";
import { login } from "../../features/user";
import * as faceapi from "face-api.js";
import "../FaceDetection/FaceDetection.css";

const CreateProfile = () => {
  const axiosInstance = useAxiosInstance();
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({});

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
      options: ["MALE", "FEMALE", "OTHERS"],
      required: "true",
    },
  ];

  const Page2Data = [
    {
      name: "noOfCurrentBacklogs",
      label: "No. of Current Backlogs",
      type: "text",
      required: true,
    },
    {
      name: "historyOfBacklogs",
      label: "History of Backlogs",
      type: "text",
      required: true,
    },
    {
      name: "tenthMarksPercentage",
      label: "10th Marks Percentage",
      type: "text",
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
      type: "text",
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
      type: "text",
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
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axiosInstance
      .patch("/users/" + userData.id, {
        ...formData,
        isSuccessFullyRegistered: true,
      })
      .then((res) => {
        setIsLoading(false);
        if (res.data.isSuccessFullyRegistered) {
          alert("Successful");
          dispatch(login());
        }
      })
      .catch((er) => {
        alert("Something went Wrong");
        console.log(er);
      });
  };

  const [modelsLoaded, setModelsLoaded] = React.useState(false);
  const [captureVideo, setCaptureVideo] = React.useState(false);

  const videoRef = React.useRef();
  const videoHeight = 200;
  const videoWidth = 250;
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
      .getUserMedia({ video: { height: 400 } })
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

        if (detections) {
          const resizedDetections = faceapi.resizeResults(
            detections,
            displaySize
          );
          const canvas = canvasRef.current;
          canvas
            .getContext("2d")
            .clearRect(0, 0, canvas.width, canvas.height);
          faceapi.draw.drawDetections(canvas, resizedDetections);
          faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
          faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
          console.log(detections.descriptor);
          
          if (detections.alignedRect.score > 0.8) {
            setFaceEmbedding(detections.descriptor);
            alert("Your Face Have Been Saved");
            closeWebcam();
          }
          // const myFace = {
          //   0: -0.17934970557689667,
          //   1: 0.08516005426645279,
          //   2: 0.0879225954413414,
          //   3: 0.013664576224982738,
          //   4: -0.08102656155824661,
          //   5: -0.0878402590751648,
          //   6: -0.06178100407123566,
          //   7: 0.0037732140626758337,
          //   8: 0.07736353576183319,
          //   9: -0.06955952942371368,
          //   10: 0.24326568841934204,
          //   11: -0.10276204347610474,
          //   12: -0.20328326523303986,
          //   13: 0.02643865905702114,
          //   14: -0.03354427218437195,
          //   15: 0.08342447876930237,
          //   16: -0.1496230661869049,
          //   17: -0.07646399736404419,
          //   18: -0.08530247956514359,
          //   19: -0.06253240257501602,
          //   20: 0.09741928428411484,
          //   21: 0.060889918357133865,
          //   22: 0.013901165686547756,
          //   23: 0.03016258031129837,
          //   24: -0.16255232691764832,
          //   25: -0.3222740888595581,
          //   26: -0.09565158933401108,
          //   27: -0.08458331227302551,
          //   28: 0.020935259759426117,
          //   29: -0.08448759466409683,
          //   30: -0.001050144201144576,
          //   31: 0.06326519697904587,
          //   32: -0.13497664034366608,
          //   33: -0.06299567967653275,
          //   34: 0.07575681060552597,
          //   35: 0.07249533385038376,
          //   36: 0.03078991174697876,
          //   37: -0.013006739318370819,
          //   38: 0.2122899442911148,
          //   39: -0.037933021783828735,
          //   40: -0.1132054403424263,
          //   41: -0.005636248271912336,
          //   42: 0.11087492853403091,
          //   43: 0.32577475905418396,
          //   44: 0.13692425191402435,
          //   45: 0.0927988812327385,
          //   46: -0.0008574987878091633,
          //   47: -0.07469651103019714,
          //   48: 0.05203569307923317,
          //   49: -0.24550840258598328,
          //   50: 0.1051391139626503,
          //   51: 0.15166574716567993,
          //   52: 0.07317503541707993,
          //   53: 0.08684294670820236,
          //   54: 0.12890155613422394,
          //   55: -0.14633871614933014,
          //   56: 0.06559505313634872,
          //   57: 0.037929221987724304,
          //   58: -0.14678680896759033,
          //   59: 0.11128842830657959,
          //   60: 0.058632440865039825,
          //   61: -0.012427864596247673,
          //   62: 0.038320720195770264,
          //   63: -0.025217970833182335,
          //   64: 0.21352218091487885,
          //   65: 0.04302789643406868,
          //   66: -0.10440001636743546,
          //   67: -0.11747772246599197,
          //   68: 0.09096641093492508,
          //   69: -0.15512530505657196,
          //   70: -0.02481895498931408,
          //   71: 0.10776486247777939,
          //   72: -0.10289017111063004,
          //   73: -0.1955881267786026,
          //   74: -0.26378458738327026,
          //   75: 0.04305511340498924,
          //   76: 0.48039016127586365,
          //   77: 0.14506465196609497,
          //   78: -0.19886784255504608,
          //   79: 0.06621840596199036,
          //   80: -0.013838465325534344,
          //   81: -0.15514352917671204,
          //   82: 0.1170198917388916,
          //   83: 0.09026136994361877,
          //   84: -0.11038311570882797,
          //   85: 0.01940836012363434,
          //   86: -0.12089111655950546,
          //   87: 0.11458956450223923,
          //   88: 0.2327251434326172,
          //   89: 0.0004599221865646541,
          //   90: -0.047786734998226166,
          //   91: 0.22776490449905396,
          //   92: 0.04208756238222122,
          //   93: -0.001746686757542193,
          //   94: 0.09647863358259201,
          //   95: 0.04111664369702339,
          //   96: -0.10955541580915451,
          //   97: -0.04861271008849144,
          //   98: -0.13635024428367615,
          //   99: -0.00857522338628769,
          //   100: 0.06414531916379929,
          //   101: -0.09266906976699829,
          //   102: -0.05080784112215042,
          //   103: 0.10135495662689209,
          //   104: -0.14195512235164642,
          //   105: 0.09582085907459259,
          //   106: -0.02306993305683136,
          //   107: -0.058725785464048386,
          //   108: -0.09439760446548462,
          //   109: 0.042125966399908066,
          //   110: -0.15114785730838776,
          //   111: -0.03133198618888855,
          //   112: 0.1393229216337204,
          //   113: -0.2121199518442154,
          //   114: 0.10298102349042892,
          //   115: 0.1257450133562088,
          //   116: 0.04915536567568779,
          //   117: 0.15327642858028412,
          //   118: 0.08604156225919724,
          //   119: 0.0610225684940815,
          //   120: 0.05788407102227211,
          //   121: 0.03597646579146385,
          //   122: -0.08082013577222824,
          //   123: -0.06579402834177017,
          //   124: 0.020839067175984383,
          //   125: 0.003324587130919099,
          //   126: 0.09231927245855331,
          //   127: 0.03995624929666519,
          // };

          // const dist = faceapi.euclideanDistance(
          //   Object.values(myFace),
          //   detections.descriptor
          // );
          // console.log(dist);
          // if (dist < 0.5) {
          //   alert("Verifed");
          //   closeWebcam();
          // } else {
          //   alert("Your Face is not Matching with Our Data Base");
          // }
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
  } else if (page == 0) {
    return (
      <div>
        <div className="container-xxl flex-grow-1 container-p-y">
          <div className="row">
            <div className="col-md-12">
              <ul className="nav nav-pills flex-column flex-md-row mb-3">
                <li className="nav-item">
                  <a
                    onClick={() => {
                      setPage(0);
                    }}
                    className="nav-link active"
                  >
                    <i className="bx bx-user me-1" /> Basic Information
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    onClick={() => {
                      setPage(1);
                    }}
                    className="nav-link"
                  >
                    <i className="bx bx-bell me-1" /> Education Details
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    onClick={() => {
                      setPage(2);
                      startVideo();
                    }}
                    className="nav-link"
                  >
                    <i className="bx bx-scan me-1" /> Face Scan
                  </a>
                </li>
              </ul>
              <div className="card mb-4">
                <h5 className="card-header">Basic Details</h5>
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
                        
                      >
                        <span className="d-none d-sm-block">
                          Upload new photo
                        </span>
                        <i className="bx bx-upload d-block d-sm-none" />
                        <input
                          type="file"
                          id="upload"
                          className="account-file-input form-control"
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
                </div>*/}
                <hr className="my-0" />
                <div className="card-body">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setPage(1);
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
                    </div>
                    <div className="mt-2">
                      <button type="submit" className="btn btn-primary me-2">
                        Next
                      </button>
                      {userData.isSuccessFullyRegistered && (
                        <button
                          type="button"
                          data-bs-toggle="modal"
                          data-bs-target="#basicModal"
                          className="btn btn-outline-primary me-2"
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
                          alert("Request Raised Successfully");
                        }
                      })
                      .catch((err) => {
                        alert("Something Went Wrong");
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
  } else if (page == 1) {
    return (
      <div>
        <div className="container-xxl flex-grow-1 container-p-y">
          <div className="row">
            <div className="col-md-12">
              <ul className="nav nav-pills flex-column flex-md-row mb-3">
                <li className="nav-item">
                  <a
                    onClick={() => {
                      setPage(0);
                    }}
                    className="nav-link "
                  >
                    <i className="bx bx-user me-1" /> Basic Information
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    onClick={() => {
                      setPage(1);
                    }}
                    className="nav-link active"
                  >
                    <i className="bx bx-bell me-1" /> Education Details
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    onClick={() => {
                      setPage(2);
                      startVideo();
                    }}
                    className="nav-link"
                  >
                    <i className="bx bx-scan me-1" /> Face Scan
                  </a>
                </li>
              </ul>
              <div className="card mb-4">
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
                    onSubmit={(e) => {
                      e.preventDefault();
                      setPage(2);
                      startVideo();
                    }}
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
                      <button type="submit" className="btn btn-primary me-2">
                        Next
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
  } else if (page == 2) {
    return (
      <div>
        <div className="container-xxl flex-grow-1 container-p-y">
          <div className="row">
            <div className="col-md-12">
              <ul className="nav nav-pills flex-column flex-md-row mb-3">
                <li className="nav-item">
                  <a
                    onClick={() => {
                      setPage(0);
                    }}
                    className="nav-link "
                  >
                    <i className="bx bx-user me-1" /> Basic Information
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    onClick={() => {
                      setPage(1);
                    }}
                    className="nav-link "
                  >
                    <i className="bx bx-bell me-1" /> Education Details
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    onClick={() => {
                      setPage(2);
                      startVideo();
                    }}
                    className="nav-link active"
                  >
                    <i className="bx bx-scan me-1" /> Face Scan
                  </a>
                </li>
              </ul>
              <div className="card mb-4">
                <h5 className="card-header">Face Scan</h5>
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
                  <form onSubmit={handleSubmit}>
                    {/* <div className="row">
                      {Page2Data.map(elem=>{return <>
                        <>
                          {field.type === "select" ? (
                            
                            <div className="mb-3 col-md-6">
                        <label htmlFor="language" className="form-label">
                        {field.label}
                        </label>
                        <select required={field.required}
                                type="select"
                                id={field.name}
                                name={field.name}
                                value={formData[field.name]}
                                onChange={handleChange}
                               className="select2 form-select">
                          <option value={""}>Choose</option>
                                {field.options.map((elem) => {
                                  return (
                                    <option value={elem}>{elem}</option>
                                  );
                                })}
                        </select>
                      </div>
                             ) : (
                            <div className="mb-3 col-md-6">
                        <label htmlFor="firstName" className="form-label">
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
                        />
                      </div>
                          )}
                        </>
                      
                      </>})}
                    </div> */}
                    {/* <FaceDetection/>  */}
                    <div>
                      <div>
                        {captureVideo && modelsLoaded ? (
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              closeWebcam();
                            }}
                          >
                            Close Webcam
                          </button>
                        ) : (
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              startVideo();
                            }}
                          >
                            Open Webcam
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
                              className="box  border border-primary border-4 rounded"
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
                          <div>loading...</div>
                        )
                      ) : (
                        <></>
                      )}
                    </div>
                    <div className="mt-2">
                      <button
                        type="submit"
                        disabled={userData.isSuccessFullyRegistered === true}
                        className="btn btn-primary me-2"
                      >
                        Save{" "}
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

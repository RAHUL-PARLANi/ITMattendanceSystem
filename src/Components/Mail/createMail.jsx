import React, { useEffect, useState } from "react";
import useAxiosInstance from "../../axiosInstance";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-buttons/js/dataTables.buttons.js";
import "datatables.net-buttons/js/buttons.colVis.js";
import "datatables.net-buttons/js/buttons.flash.js";
import "datatables.net-buttons/js/buttons.html5.js";
import "datatables.net-buttons/js/buttons.print.js";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import EditorToolbar, { modules, formats } from "./Editor";
import "./style.css";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";

const BoardGame = (props) => {
  const { bg, keys, deleteBGS, BlockBGS, handleRowSelect, selectedRows } =
    props;

  const handleCheckboxChange = () => {
    handleRowSelect(bg._id, bg.WorkingEmailId);
  };

  return (
    <tr>
      <td>
        <input
          type="checkbox"
          checked={selectedRows.includes(bg._id)}
          onChange={handleCheckboxChange}
        />
      </td>
      {keys.map((key) => (
        <td className="text-xs font-weight-bold" key={key}>
          {bg[key]}
        </td>
      ))}
    </tr>
  );
};

const CreateMail = () => {
  const [bgs, setBgs] = useState([]);
  const [keys, setKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const axiosInstance = useAxiosInstance();
  const [isLoading, setIsLoading] = useState(true);
  const userData = useSelector((state) => state.users.value);
  const [selectedEmails, setSelectedEmails] = useState([]);

  //Form Feilds

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [studentList, setStudentList] = useState("");

  const [content, setContent] = useState([]);
  const [contentType, setContentType] = useState("");
  const [contentImg, setContentImg] = useState("");
  const [contentPara, setContentPara] = useState("");
  const [contentLink, setContentLink] = useState("");

  //bcc , cc , mailMessage,

  const [bcc, setBcc] = useState("");
  const [cc, setCc] = useState("");
  const [mailMessage, setMailMessage] = useState("");

  // MailMessage Error

  const [mailMessageError,setMailMessageError] = useState("");

  useEffect(() => {
    if(mailMessage === "" || mailMessage === "<p><br></p>"){
      setMailMessageError("Message can not be empty!")
    }else{
      setMailMessageError("")
    }
    console.log(mailMessage)
  }, [mailMessage])
  

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      axiosInstance
        .post("/mail/sendGmails", {
          tokens: tokenResponse,
          bccRecipients:bcc.split(','),
          ccRecipients:cc.split(','),
          subject: subject,
          recipients: selectedEmails,
          message: mailMessage,
        })
        .then((res) => {
          if (res.data["Email sent "]) {
            toast.success("Mail Sent Successfully !");
          }
        })
        .catch((err) => {
          toast.error("Error in Sending Mail");
          console.log(err);
        });
    },
    scope: "https://www.googleapis.com/auth/gmail.send",
    redirect_uri: "http://localhost:3000/createmails",
  });

  const handleChange = (value) => {
    setContentPara(value);
  };

  useEffect(() => {
    axiosInstance
      .get("/users/all")
      .then((res) => {
        setBgs(res.data);
        const allKeys = [
          "rollNo",
          "name",
          "gender",
          "batch",
          "branch",
          "univercityName",
          "univercityType",
          "_id",
          "role",
          //"email",
          // "verified",
          "WorkingEmailId",
          "aggregatePercentageGraduation",
          //"busFacility",
          "dateOfBirth",
          "fatherName",
          "graduationBranch",
          "historyOfBacklogs",
          "noOfCurrentBacklogs",
          //"notificationToken",
          "phoneNumber",
          //"picUrl",
          "tenthBoardName",
          "tenthMarksPercentage",
          "tenthPassingYear",
          "tweelthBoardName",
          "tweelthMarksPercentage",
          "tweelthPassingYear",
          "univercityNameGraduation",
          "yearOfPassingGraduation",
          "youHaveLaptop",
        ];
        setKeys(allKeys);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);
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
      .flatMap((elem) => elem[8]);
    setSelectedRows((prevState) => {
      setSelectedRows([...prevState, ...filteredData]);
    });

    const filteredDataEmails = table
      .rows({ search: "applied" })
      .data()
      .toArray()
      .flatMap((elem) => elem[10]);
    setSelectedEmails((prevState) => {
      setSelectedEmails([...prevState, ...filteredDataEmails]);
    });
  };

  const handleRowSelect = (id, email) => {
    let updatedSelectedRows;
    if (selectedRows.includes(id)) {
      updatedSelectedRows = selectedRows.filter((rowId) => rowId !== id);
    } else {
      updatedSelectedRows = [...selectedRows, id];
    }
    setSelectedRows(updatedSelectedRows);

    let updatedSelectedEmails;
    if (selectedEmails.includes(email)) {
      updatedSelectedEmails = selectedEmails.filter(
        (rowEmail) => rowEmail !== email
      );
    } else {
      updatedSelectedEmails = [...selectedEmails, email];
    }
    setSelectedEmails(updatedSelectedEmails);
  };

  const deleteBGS = (id) => {
    var ans = window.confirm(
      "You are trying to delete a USER, Do you want to continue ?"
    );
    if (ans) {
      axiosInstance
        .delete("/users/" + id)
        .then((res) => alert(res.data.msg))
        .catch((err) => {
          alert("Something Went Wrong");
        });
      setBgs(bgs.filter((el) => el._id !== id));
    }
  };

  const BlockBGS = (id) => {
    var ans = window.confirm(
      "You are trying to Block a USER, Do you want to continue ?"
    );
    if (ans) {
      axiosInstance
        .patch("/users/block" + id)
        .then((res) => alert(res.data.msg))
        .catch((err) => {
          alert("Something Went Wrong");
        });
      setBgs(bgs.filter((el) => el._id !== id));
    }
  };

  const bgsList = () => {
    return bgs.map((bg) => {
      return (
        <BoardGame
          bg={bg}
          keys={keys}
          deleteBGS={deleteBGS}
          BlockBGS={BlockBGS}
          handleRowSelect={handleRowSelect}
          selectedRows={selectedRows}
          key={bg._id}
        />
      );
    });
  };
  const HandleSubmit = (e) => {
    e.preventDefault();
    try {
      var data = {
        submittedById: userData.id,
        submittedByRole: userData.role,
        submittedByName: userData.username,
        title: title,
        subject: subject,
        studentsId: selectedRows,
        content: content,
      };
      axiosInstance
        .post("/mail/", data)
        .then((result) => {
          if (result.data) {
            toast.success(
              `Mail with title ${result.data.title} is Created Successfully`
            );
          }
        })
        .catch((err) => {
          toast.error(`Something went wrong!`);
          console.log(err);
        });
    } catch (error) {
      console.log("Something went Wrong");
    }
  };

  const handleImagePic = (e) => {
    console.log("I am hit");
    const data = new FormData();
    var file = e.target.files[0];
    //var newFile = new File([file], `${firstName}${surName}_${stateVariableName}.jpg`, {type: file.type});
    data.append("file", file);
    data.append("upload_preset", "ITMPreset");
    data.append("cloud_name", "dvg9z8ugk");
    //data.append("transformation", "w_500,h_500,c_scale,f_jpg");
    fetch("https://api.cloudinary.com/v1_1/dvg9z8ugk/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setContentImg(data.secure_url);
      })
      .catch((err) => console.log(err));
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
        <div className="container-fluid mb-4" style={{ marginTop: "50px" }}>
          <form
            className="bg-white rounded shadow-sm p-2"
            onSubmit={HandleSubmit}
          >
            <div className="mb-3">
              <label
                className="form-label text-primary fw-bold"
                htmlFor="basic-default-BatchName"
              >
                Title
              </label>
              <input
                type="text"
                required
                className="form-control"
                id="basic-default-BatchName"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>

            <div className="mb-3">
              <label className="form-label text-primary fw-bold">Subject</label>
              <input
                type="text"
                required
                className="form-control"
                value={subject}
                onChange={(e) => {
                  setSubject(e.target.value);
                }}
              />
            </div>

            <div className="mb-3">
              <label
                className="form-label text-primary fw-bold"
                htmlFor="basic-default-Students-IDS"
              >
                Student IDs (Use ",")
              </label>
              <textarea
                type="text"
                className="form-control"
                id="basic-default-Students-IDS"
                value={selectedRows}
                onChange={(e) => {
                  setSelectedRows(e.target.value.split(","));
                }}
              />
            </div>

            <div className="mb-3">
              <label className="form-label text-primary fw-bold">
                Content Type
              </label>
              <select
                type="text"
                className="form-control"
                value={contentType}
                onChange={(e) => {
                  setContentType(e.target.value);
                }}
              >
                <option value={""}>choose</option>
                <option value={"IMG"}>Image</option>
                <option value={"PARA"}>Paragraph</option>
                <option value={"LINK"}>Link</option>
              </select>
            </div>

            {contentType === "IMG" && (
              <form>
                <input
                  className="form-control"
                  type="file"
                  onChange={(e) => {
                    e.preventDefault();
                    handleImagePic(e);
                  }}
                />

                <label className="form-label mt-2 text-primary fw-bold">
                  Image URL
                </label>

                <input
                  className="form-control"
                  value={contentImg}
                  onChange={(e) => {
                    setContentImg(e.preventDefault());
                  }}
                />
                {contentImg && (
                  <div className="">
                    <img
                      className="rounded mt-2"
                      style={{ maxHeight: "300px", width: "auto" }}
                      src={contentImg}
                      alt={"image here"}
                    />
                  </div>
                )}
                <input
                  disabled={contentImg === ""}
                  type={"button"}
                  className="btn btn-outline-primary mt-2"
                  onClick={(e) => {
                    e.preventDefault();

                    setContent((prevState) => [
                      ...prevState,
                      { type: "IMG", content: contentImg },
                    ]);
                    setContentType("");
                    setContentImg("");
                  }}
                  value={"Add Image"}
                />
              </form>
            )}

            {contentType === "LINK" && (
              <div>
                <form>
                  <label className="form-label mt-2 text-primary fw-bold">
                    Link Url
                  </label>

                  <input
                    className="form-control"
                    value={contentLink}
                    onChange={(e) => {
                      setContentLink(e.target.value);
                    }}
                  />
                  {contentLink && (
                    <div>
                      <span className="fw-bold">Link </span> -{" "}
                      <span className="">
                        <a target="_blank" href={contentLink}>
                          {contentLink}
                        </a>
                      </span>
                    </div>
                  )}
                  <input
                    disabled={contentLink === ""}
                    type={"button"}
                    className="btn btn-outline-primary mt-2"
                    onClick={(e) => {
                      e.preventDefault();

                      setContent((prevState) => [
                        ...prevState,
                        { type: "LINK", content: contentLink },
                      ]);
                      setContentType("");
                      setContentLink("");
                    }}
                    value={"Add Link"}
                  />
                </form>
              </div>
            )}

            {contentType === "PARA" && (
              <div>
                <div className="card w-100 rounded shadow-sm">
                  <EditorToolbar />
                  <ReactQuill
                    theme="snow"
                    value={contentPara}
                    onChange={handleChange}
                    placeholder={"Write something awesome..."}
                    modules={modules}
                    formats={formats}
                  />
                </div>
                <input
                  value={"Add Paragraph"}
                  disabled={contentPara === ""}
                  type={"button"}
                  className="btn btn-outline-primary mt-2"
                  onClick={(e) => {
                    e.preventDefault();
                    setContent((prevState) => [
                      ...prevState,
                      { type: "PARA", content: contentPara },
                    ]);
                    setContentType("");
                    setContentPara("");
                  }}
                />
              </div>
            )}

            <input
              className="btn btn-primary mt-3"
              type="submit"
              value="Send"
            />

            <input
              className="btn btn-outline-primary ms-2 mt-3"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#basicModal"
              //onClick={()=>window.location=('http://localhost:5000/gmail/auth')}
              //onClick={()=>login()}
              value="Send with Gmail"
            />

            {/* <OAuth2Login
              authorizationUrl="http://localhost:5000/gmail/auth"
              responseType="code"
              clientId="634927151835-vqs5lvcit044kv34im1brabdjrr78voi.apps.googleusercontent.com"
              redirectUri="http://localhost:5000/gmail/auth/callback"
              onSuccess={response => console.log(`suncwaasss `,response)}
              onFailure={response => console.log(response)}/>, */}
          </form>

          <div
            className="modal fade"
            id="basicModal"
            tabIndex={-1}
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title text-primary" id="exampleModalLabel1">
                    Mail Via Gmail
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  />
                </div>
                <div className="modal-body">
                  <form onSubmit={(e)=>{
                    e.preventDefault()
                    login()
                    }}>
                    <h5>
                      Here your gmail Id will be used for sending mail to
                      selected users.
                    </h5>

                    <div className="mb-3">
                      <label className="form-label text-primary fw-bold">
                        BCC(Optional)(Use , for multiple)
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={bcc}
                        onChange={(e) => {
                          setBcc(e.target.value);
                        }}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label text-primary fw-bold">
                        CC(Optional)(Use , for multiple)
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={cc}
                        onChange={(e) => {
                          setCc(e.target.value);
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label text-primary fw-bold">
                        Subject
                      </label>
                      <input
                        type="text"
                        required
                        className="form-control"
                        value={subject}
                        onChange={(e) => {
                          setSubject(e.target.value);
                        }}
                      />
                    </div>
                    {mailMessageError&&<div className="text-primary mb-1"><i className='bx bx-error-circle me-2'></i>{mailMessageError}</div>}
                    <div className="w-100 mb-3">
                      <label className="form-label text-primary fw-bold">
                        Message
                      </label>

                      <EditorToolbar />
                      <ReactQuill
                        theme="snow"
                        value={mailMessage}
                        onChange={(value) => {
                          setMailMessage(value);
                        }}
                        placeholder={"Write something awesome..."}
                        modules={modules}
                        formats={formats}
                      />
                    </div>

                    <div className="mb-3">
                      <label
                        className="form-label text-primary fw-bold"
                        htmlFor="basic-default-Students-IDS"
                      >
                        Selected Email IDs (Use ",")
                      </label>
                      <textarea
                        type="text"
                        className="form-control"
                        required
                        id="basic-default-Students-IDS"
                        value={selectedEmails}
                        onChange={(e) => {
                          setSelectedEmails(e.target.value.split(","));
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
                        Send
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {content.length != 0 && (
            <div className="p-2 h4 bg-white rounded shadow-sm card w-100">
              {" "}
              Preview{" "}
            </div>
          )}
          {content.length != 0 && (
            <div className="card w-100 py-3 px-3 shadow-sm rounded mb-4">
              {content.map((elem, index) => {
                return (
                  <>
                    {elem.type === "IMG" ? (
                      <div className="text-center">
                        <img
                          src={elem.content}
                          style={{ maxHeight: "300px" }}
                        />
                        <button
                          onClick={() => {
                            setContent(
                              content.filter((element) => element != elem)
                            );
                          }}
                          className="btn btn-dark btn-sm"
                        >
                          Delete
                        </button>
                      </div>
                    ) : (
                      <></>
                    )}
                    {elem.type === "LINK" ? (
                      <div>
                        <div>
                          <span className="fw-bold">Link </span> -{" "}
                          <span className="">
                            <a target="_blank" href={elem.content}>
                              {elem.content}
                            </a>
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            setContent(
                              content.filter((element) => element != elem)
                            );
                          }}
                          className="btn btn-dark btn-sm"
                        >
                          Delete
                        </button>
                      </div>
                    ) : (
                      <></>
                    )}
                    {elem.type === "PARA" ? (
                      <div>
                        <ReactQuill
                          value={elem.content}
                          readOnly={true}
                          theme={"bubble"}
                        />
                        <button
                          onClick={() => {
                            setContent(
                              content.filter((element) => element != elem)
                            );
                          }}
                          className="btn btn-dark btn-sm"
                        >
                          Delete
                        </button>
                      </div>
                    ) : (
                      <></>
                    )}
                  </>
                );
              })}
            </div>
          )}

          <div className="table-responsive  bg-white rounded p-2 shadow-sm">
            <h3>Select Users</h3>

            <table
              id="table"
              className="table  align-items-center justify-content-center mb-0"
            >
              <thead>
                <tr>
                  <th className="text-primary" scope="col">
                    Select{" "}
                    <button
                      onClick={handleSelectAll}
                      className="btn btn-primary btn-sm"
                    >
                      All
                    </button>{" "}
                  </th>
                  {keys.map((key) => (
                    <th
                      className="text-xs text-primary font-weight-bold"
                      key={key}
                    >
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>{bgsList()}</tbody>
              <tfoot>
                <tr>
                  <th scope="col">Select</th>
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
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateMail;

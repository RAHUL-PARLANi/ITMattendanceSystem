import React, { useEffect, useState } from "react";
import useAxiosInstance from "../../axios";
import $ from "jquery";

const BoardGame = (props) => {
  const { bg, keys, deleteBGS, BlockBGS, handleRowSelect, selectedRows } =
    props;

  const handleCheckboxChange = () => {
    handleRowSelect(bg.RollNo);
  };

  return (
    <tr>
      <td>
        <input
          type="checkbox"
          checked={selectedRows.includes(bg.RollNo)}
          onChange={handleCheckboxChange}
        />
      </td>
      <td className="text-xs font-weight-bold">
        <button
          onClick={() => {
            deleteBGS(bg._id);
          }}
          type="button"
          className="btn btn-icon btn-warning m-1"
        >
          <span className="tf-icons bx bx-trash"></span>
        </button>
      </td>
      {keys.map((key) => (
        <td className="text-xs font-weight-bold" key={key}>
          {bg[key]}
        </td>
      ))}
    </tr>
  );
};

const EditAttendanceSheet = () => {
  const axiosInstance = useAxiosInstance();
  const [formData, setFormData] = useState({});

  const [students, setStudents] = useState([]);
  const [batchData, setBatchData] = useState([]);
  const [batchName, setBatchName] = useState("");
  const [offDates, setOffDates] = useState([]);
  const [offDate, setOffDate] = useState("");

  const [FormTillNow, setFormTillNow] = useState([
    {
      name: "sheetName",
      label: "Attendance Sheet Name",
      type: "text",
      required: true,
      readOnly: false,
    },
    {
      name: "module",
      label: "Module Name",
      type: "text",
      required: true,
      readOnly: false,
    },
    {
      name: "startDate",
      label: "Starting date",
      type: "date",
      readOnly: true,
      required: "true",
    },
    {
      name: "endDate",
      label: "Ending Date",
      type: "date",
      required: true,
      readOnly: true,
    },
    {
      name: "startTiming",
      label: "Starting Time",
      type: "time",
      required: true,
      readOnly: false,
    },
    {
      name: "endTiming",
      label: "Ending Time",
      type: "time",
      required: true,
      readOnly: false,
    },
    {
      name: "noOfHalfs",
      label: "No Of Halfs",
      type: "number",
      required: true,
      readOnly: true,
    },
  ]);
  const [isLoading, setIsLoading] = useState(true);

  const [bgs, setBgs] = useState([]);
  const [keys, setKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const [sheetData, setSheetData] = useState("");
  const [sheetName, setSheetName] = useState("");
  const [sheetObj, setsheetObj] = useState("");

  useEffect(() => {
    if (!$.fn.DataTable.isDataTable("#table")) {
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
  }, [bgs]);

  const handleSelectAll = () => {
    const table = $("#table").DataTable();
    const filteredData = table
      .rows({ search: "applied" })
      .data()
      .toArray()
      .flatMap((elem) => elem[4]);
    setSelectedRows(filteredData);
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

  //   useEffect(() => {
  //     console.log(selectedRows);
  //   }, [selectedRows]);

  const deleteBGS = (id) => {
    var ans = window.confirm(
      "You are trying to delete a Attendance Record, Do you want to continue ?"
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

  useEffect(() => {
    axiosInstance
      .get("/batch/all")
      .then((res) => {
        setBatchData(res.data);
        axiosInstance
          .get("/attendancesheet/" + window.location.href.split("/").pop())
          .then((res) => {
            setBgs(res.data.attendanceData);
            const allKeys = Array.from(
              new Set(
                res.data.attendanceData.reduce((keys, obj) => {
                  return keys.concat(Object.keys(obj));
                }, [])
              )
            );
            setKeys(allKeys);
            setFormData(res.data);
            setBatchName(res.data.batch);
            setOffDates(res.data.offDates);
            setStudents(res.data.students);
            axiosInstance
              .get("/attendancesheet/all")
              .then((elem) => {
                setSheetData(elem.data);
                setIsLoading(false);
              })
              .catch((err) => {
                alert("Something went wrong");
                setIsLoading(false);
              });
          })
          .catch((err) => {
            alert("Something went wrong");
            setIsLoading(false);
          });
      })
      .catch((err) => {
        alert("something went wrong");
        setIsLoading(false);
      });
  }, []);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = () => {
    setIsLoading(true);
    const data = {
      ...formData,
      students: students,
      batch: batchName,
      offDates: offDates,
    };
    axiosInstance
      .patch("/attendancesheet/"+window.location.href.split('/').pop(), data)
      .then((response) => {
        alert(`${response.data.sheetName} Edited successfully!`);
        setIsLoading(false);
      })
      .catch((err) => {
        alert("Something Went Wrong");
        setIsLoading(false);
      });
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
    <>
      <div>
        <div
          className="modal fade"
          id="basicModal"
          tabIndex={-1}
          aria-hidden="true"
        >
          <div className="modal-dialog modal-xl" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5
                  className="modal-title text-primary"
                  id="exampleModalLabel1"
                >
                  Transfer Data
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <form onSubmit={(e) => {
                  var confirm=window.confirm('This Data will be transfered from this sheet to another Sheet(means it will be removed from this sheet and will be saved in the selected sheet). Do you wish to continue ?')
                  if(confirm){
                    e.preventDefault()
                    var dataToSubmit={
                        sheetOneId:window.location.href.split('/').pop(),
                        transferId:sheetObj,
                        rollNos:selectedRows
                    }
                    console.log(dataToSubmit)
                    axiosInstance.post('/attendancesheet/transferStudent',dataToSubmit).then(res=>{
                      if(res.data.message){alert("Successfully transfered")}
                    }).catch(err=>{
                      alert("Something Went Wrong")
                    })
                  } 
                }}>
                  <h6>
                    You can transfer data of a User from one Attentdance Sheet
                    to another but make sure that both Sheets have exactly same
                    Columns.
                  </h6>

                  <div>
                    <h1>Users</h1>
                    <div className="table-responsive bg-white rounded p-2 shadow-sm">
                      <table
                        id="table"
                        className="table table-striped align-items-center justify-content-center mb-0"
                      >
                        <thead>
                          <tr>
                            <th className="text-primary" scope="col">
                              Select{" "}
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleSelectAll();
                                }}
                                className="btn btn-primary btn-sm"
                              >
                                All
                              </button>{" "}
                            </th>
                            <th className="text-primary" scope="col">
                              Actions
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
                            <th scope="col">Actions</th>
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

                  <div className="mt-3">
                    <label
                      className="form-label text-primary fw-bold"
                      htmlFor="basic-default-Students-IDS"
                    >
                      Student Roll Numbers
                    </label>
                    <textarea
                      type="text"
                      required
                      className="form-control"
                      id="basic-default-Students-IDS"
                      value={selectedRows}
                      onChange={(e) => {
                        setSelectedRows(e.target.value);
                      }}
                    />
                  </div>

                  <div className="mt-3">
                    <label className="form-label text-primary" htmlFor="SheetName">
                      Transfer to Attendance Sheet
                    </label>
                    <div style={{ display: "flex" }}>
                      <select
                        className="form-control"
                        id="SheetName"
                        required
                        value={sheetName}
                        onChange={(e) => {
                          var data = sheetData?.find(
                            (res) => res.sheetName == e.target.value
                          );
                          setSheetName(data.sheetNamename);
                          setsheetObj(data._id);
                        }}
                      >
                        <option value={""}>choose</option>
                        {sheetData.map((elem) => {
                          return <option value={elem.sheetName}>{elem.sheetName}</option>;
                        })}
                      </select>
                    </div>
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
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <form
          className="bg-white px-3 mt-4 py-3 mb-4 shadow-sm rounded"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <h4 className="text-primary">Edit Attendance Sheet</h4>
          {FormTillNow.map((field) => {
            return (
              <>
                {field.type === "select" ? (
                  <div key={field.name} className="mb-3">
                    <label className="form-label" htmlFor={field.name}>
                      {field.label}
                    </label>
                    <select
                      required={field.required}
                      type="select"
                      id={field.name}
                      name={field.name}
                      disabled={field?.readOnly || false}
                      value={formData[field.name]}
                      onChange={handleChange}
                      className="form-select select2"
                    >
                      <option value={""}>Choose</option>
                      {field.options?.map((elem) => {
                        return <option value={elem}>{elem}</option>;
                      })}
                    </select>
                  </div>
                ) : (
                  <div key={field.name} className="mb-3">
                    <label className="form-label" htmlFor={field.name}>
                      {field.label}
                    </label>
                    <input
                      className="form-control"
                      required={field.required}
                      disabled={field?.readOnly || false}
                      type={field.type}
                      id={field.name}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                    />
                  </div>
                )}
              </>
            );
          })}
          <div className="mb-3">
            <label className="form-label" htmlFor="offDates">
              Off Dates
            </label>
            <div style={{ display: "flex" }}>
              <input
                className="form-control"
                type={"date"}
                id="offDates"
                disabled
                value={offDate}
                onChange={(e) => {
                  setOffDate(e.target.value);
                }}
              />
              <button
                disabled
                onClick={(e) => {
                  e.preventDefault();
                  setOffDates(offDates.concat([offDate]));
                }}
                className="btn btn-outline-primary"
              >
                Add
              </button>
            </div>
          </div>

          {offDates && (
            <div className="mb-3">
              <label className="form-label" htmlFor="SelectedOffDates">
                Selcted Off Dates
              </label>
              <div style={{ display: "flex" }}>
                <textarea
                  className="form-control"
                  type={"text"}
                  disabled
                  id="SelectedOffDates"
                  value={offDates}
                  onChange={(e) => {
                    setOffDates(e.target.value);
                  }}
                />
              </div>
            </div>
          )}

          <div className="mb-3">
            <label className="form-label" htmlFor="batch">
              Batch
            </label>
            <div style={{ display: "flex" }}>
              <select
                className="form-control"
                id="batch"
                required
                disabled
                value={batchName}
                onChange={(e) => {
                  var data = batchData?.find(
                    (res) => res.name == e.target.value
                  );
                  setBatchName(data?.name);
                  setStudents(data?.studentsId);
                }}
              >
                <option value={[]}>choose</option>
                {batchData.map((elem) => {
                  return <option value={elem.name}>{elem.name}</option>;
                })}
              </select>
            </div>
          </div>

          {students.length != 0 && (
            <div className="mb-3">
              <label className="form-label" htmlFor="SelectedStudents">
                Students Id
              </label>
              <div style={{ display: "flex" }}>
                <textarea
                  className="form-control"
                  type={"text"}
                  disabled
                  id="SelectedStudents"
                  value={students}
                  onChange={(e) => {
                    setStudents(e.target.value);
                  }}
                />
              </div>
            </div>
          )}

          <input
            type="submit"
            className="btn btn-primary"
            value={"Edit Sheet"}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
            }}
            data-bs-toggle="modal"
            data-bs-target="#basicModal"
            className="btn btn-warning ms-2"
          >
            Transfer Students
          </button>
        </form>
      </div>
    </>
  );
};
export default EditAttendanceSheet;

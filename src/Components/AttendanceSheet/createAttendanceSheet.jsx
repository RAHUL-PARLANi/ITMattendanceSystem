import React, { useEffect, useState } from "react";
import useAxiosInstance from "../../axiosInstance";

const CreateAttendanceSheet = () => {
  const axiosInstance = useAxiosInstance();
  const [formData, setFormData] = useState({});

  const [students, setStudents] = useState([]);
  const [batchData, setBatchData] = useState([]);
  const [batchName, setBatchName] = useState("");
  const [offDates, setOffDates] = useState([]);
  const [offDate, setOffDate] = useState("");

  const [moderator, setModerator] = useState({});
  const [modName, setModName] = useState("");
  const [modData, setModeData] = useState([]);
  const [FormTillNow, setFormTillNow] = useState([
    {
      name: "sheetName",
      label: "Attendance Sheet Name",
      type: "text",
      required: true,
      readOnly: true,
    },
    {
      name: "module",
      label: "Module Name",
      type: "text",
      required: true,
      readOnly: true,
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
      readOnly: true,
    },
    {
      name: "endTiming",
      label: "Ending Time",
      type: "time",
      required: true,
      readOnly: true,
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

  useEffect(() => {
    axiosInstance
      .get("/batch/all")
      .then((res) => {
        setBatchData(res.data);
        axiosInstance
          .get("/users/allMod")
          .then((res) => {
            setIsLoading(false);
            setModeData(res.data);
          })
          .catch((err) => {
            console.log(err);
            alert("Something went wrong");
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
      moderator: moderator,
    };
    axiosInstance
      .post("/attendancesheet/", data)
      .then((response) => {
        alert(`${response.data.sheetName} created successfully!`);
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
      <div className="container-fluid mt-4">
        <form
          className="bg-white px-3 mt-4 py-3 mb-4 shadow-sm rounded"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <h4 className="py-2 text-primary">Create Attendance Sheet</h4>
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
                value={offDate}
                onChange={(e) => {
                  setOffDate(e.target.value);
                }}
              />
              <button
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
                  id="SelectedStudents"
                  value={students}
                  onChange={(e) => {
                    setStudents(e.target.value);
                  }}
                />
              </div>
            </div>
          )}

          <div className="mb-3">
            <label className="form-label">
              Moderator :
            </label>
            <select
              required
              type="select"
              value={modName}
              onChange={(e) => {
                setModName(e.target.value);
                setModerator({
                  name:e.target.value,
                  modId:modData.find(elem=>elem.name==e.target.value)._id,
                  faceEmbbedingData:modData.find(elem=>elem.name==e.target.value).faceEmbbedingData
                })
              }}
              className="form-select select2"
            >
              <option value={""}>Choose</option>
              {modData.map((elem) => {
                return <option value={elem.name}>{elem.name}</option>;
              })}
            </select>
          </div>

          <input
            type="submit"
            className="btn btn-primary"
            value={"Create Sheet"}
          />
        </form>
      </div>
    </>
  );
};
export default CreateAttendanceSheet;

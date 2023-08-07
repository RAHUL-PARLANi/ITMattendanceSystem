import React, { useEffect, useState } from "react";
import useAxiosInstance from "../../../axiosInstance";
import { toast } from "react-toastify";
import TeamComponent from "../../UserPanel/Components/Team/TeamComponent";
import SolutionsComponent from "../../UserPanel/Components/Solutions/SolutionsComponent";

const EditSolution = () => {
  const axiosInstance = useAxiosInstance();
  const [isLoading, setIsLoading] = useState(false);
  const FormDatas = [
    {
      name: "title",
      label: "Title",
      type: "text",
      required: true,
    },
    {
      name: "desc",
      label: "Description",
      type: "text",
      required: true,
    },
    {
      name: "icon",
      label: "Icon",
      type: "select",
      options: ["bx bx-dumbbell", "bx bx-line-chart","bx bxs-check-shield","bx bx-scan","bx bxs-user-voice","bx bx-book"],
      required: true,
    },
    {
      name: "delayTime",
      label:
        "Animation Delay(Should be respective to it's place on a row for eg. if it's placed first delay should be 0.1s, if it's placed Second it's delay should be 0.3s)",
      type: "select",
      options: ["0.1s", "0.3s","0.6s"],
      required: true,
    }
  ];
  const [FormTillNow, setFormTillNow] = useState({});

  const handleChange = (event) => {
    setFormTillNow({
      ...FormTillNow,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = () => {
    setIsLoading(true);
    axiosInstance
      .patch("/solution/" + window.location.href.split("/").pop(), FormTillNow)
      .then((res) => {
        setIsLoading(false);
        toast.success(`Solution with Title ${res.data.title} is Edited Successfully !`);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        toast.error("Something Went Wrong !");
      });
  };

  useEffect(() => {
    setIsLoading(true);
    axiosInstance
      .get("/solution/" + window.location.href.split("/").pop())
      .then((res) => {
        setFormTillNow(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
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
    <div>
      <div className="container-xxl flex-grow-1 container-p-y mt-4">
        <div className="card w-100 rounded shadow-sm col-12 mb-4">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Edit Solution</h5>
          </div>
          <div className="card-body">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              {FormDatas.map((field) => {
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
                          value={FormTillNow[field.name]}
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
                          value={FormTillNow[field.name]}
                          onChange={handleChange}
                        />
                      </div>
                    )}
                  </>
                );
              })}
              <button type="submit" className="btn btn-primary mt-2">
                Edit
              </button>
            </form>
          </div>
        </div>
        <h4 className="rounded shadow-sm p-3 bg-white">Preview</h4>
        <div className="" style={{ display: "flex", justifyContent: "center" }}>
          <SolutionsComponent data={FormTillNow} />
        </div>
      </div>
    </div>
  );
};

export default EditSolution;

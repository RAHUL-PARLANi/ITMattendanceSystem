import React, { useEffect, useState } from "react";
import useAxiosInstance from "../../../axiosInstance";
import { toast } from "react-toastify";
import TestimonialsComponent from "../../UserPanel/Components/Testimonials/TestimonialsComponent";

const EditTestimonials = () => {
  const axiosInstance = useAxiosInstance();
  const [isLoading, setIsLoading] = useState(false);
  const FormData = [
    {
        name: "name",
        label: "Name",
        type: "text",
        required: true,
      },
      {
        name: "designation",
        label: "Designation",
        type: "text",
        required: true,
      },
      {
        name: "review",
        label: "Review",
        type: "text",
        required: true,
      },
      {
        name: "imageUrl",
        label:
          "Image Url (You can type the image url directly or can choose a file both will have same effect)",
        type: "text",
        required: true,
      },
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
      .patch("/testimonial/"+window.location.href.split('/').pop(), FormTillNow)
      .then((res) => {
        setIsLoading(false);
        toast.success(`Review by ${res.data.name} is Edited Successfully !`);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        toast.error("Something Went Wrong !");
      });
  };

  const handleImage = (e) => {
    const data = new FormData();
    data.append("file", e.target.files[0]);
    data.append("upload_preset", "ITMHomePageAssests");
    data.append("cloud_name", "dvg9z8ugk");
    //data.append("transformation", "w_500,h_500,c_scale,f_jpg");
    fetch("https://api.cloudinary.com/v1_1/dvg9z8ugk/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setFormTillNow({...FormTillNow,
            imageUrl:data.secure_url
        })
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setIsLoading(true)
    axiosInstance
      .get("/testimonial/"+window.location.href.split('/').pop())
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
            <h5 className="mb-0">Edit Testimonial</h5>
          </div>
          <div className="card-body">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              {FormData.map((field) => {
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
              <input className="form-control" type={'file'} onChange={handleImage}/>
              <button type='submit' className="btn btn-primary mt-2">Edit</button>
            </form>
          </div>
        </div>
        <h4 className="rounded shadow-sm p-3 bg-white">Preview</h4>
          <div className="" style={{display:"flex",justifyContent:'center'}}>
            <TestimonialsComponent data={FormTillNow} />
          </div>
      </div>
    </div>
  );
};

export default EditTestimonials;
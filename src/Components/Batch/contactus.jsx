// import React, { useEffect, useState } from "react";
// import useAxiosInstance from "../../axiosInstance";
// import Table from "../UnviersalComponents/Table";

// const ContactusMessages = () => {
//     const [data, setData] = useState([]);
//     const axiosInstance = useAxiosInstance();
//     const [isLoading,setIsLoading]=useState(true)
//     useEffect(() => {
//       axiosInstance.get('/contactus/all').then(res=>{
//           setData(res.data)
//           setIsLoading(false)
//       }).catch(err=>{
//           alert("Something went wrong0")
//       })
//     }, []);

//     if(isLoading){
//       return  <div
//       style={{
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         height: "100vh",
//         width: "100%",
//       }}
//     >
//       <div
//         className="spinner-border spinner-border-lg text-primary"
//         role="status"
//       >
//         <span className="visually-hidden">Loading...</span>
//       </div>
//     </div>
//     }
//     return (
//     <div className="container-fluid">
//       <div className="h5 p-3 bg-white card w-100 shadow-sm rounded mt-4">
//         Contact Us Messages
//       </div>
//       {data.length == 0 && (
//         <div className="">
//           <div className="card rounded w-100 shadow-sm h6 py-2 px-3">
//             No Messages.
//           </div>
//         </div>
//       )}
//       {data.length!=0&&<Table tableData={data} tableKeys={['name','email','subject','message']} />}
//     </div>
//   )
// }

// export default ContactusMessages

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
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const BoardGame = (props) => {
  const { bg, keys, deleteBGS, BlockBGS, handleRowSelect, selectedRows } =
    props;

  const handleCheckboxChange = () => {
    handleRowSelect(bg._id);
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

const ShowAllContactUs = () => {
  const [bgs, setBgs] = useState([]);
  const [keys, setKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const axiosInstance = useAxiosInstance();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/contactus/all")
      .then((res) => {
        setBgs(res.data);
        const allKeys = Array.from(
          new Set(
            res.data.reduce((keys, obj) => {
              return keys.concat(Object.keys(obj));
            }, [])
          )
        );
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
      .flatMap((elem) => elem[2]);
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

  const deleteBGS = (id) => {
    var ans = window.confirm(
      "You are trying to delete a user Record, Do you want to continue ?"
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
        .patch("/users/block/" + id)
        .then((res) => {
          if (res.data.verified) {
            alert(`${res.data.name} is Blocked`);
          } else {
            alert(`${res.data.name} is unblocked`);
          }
        })
        .catch((err) => {
          alert("Something Went Wrong");
        });
      //   setBgs(bgs.filter((el) => el._id !== id));
    }
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    var confirm = window.confirm("Do you want to delete these Selected one?");
    if (confirm) {
      try {
        axiosInstance
          .post("/contactUs/delete", { ids: selectedRows })
          .then((result) => {
            if (result.data) {
              toast.success(`Deleted Successfully`);
            }
          })
          .catch((err) => {
            console.log(err)
            toast.error("Something went Wrong");
          });
      } catch (error) {
        toast.error("Something went Wrong");
      }
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
        <div className="container-fluid" style={{ marginTop: "50px" }}>
          <form
            className="bg-white rounded shadow-sm p-2"
            onSubmit={HandleSubmit}
          >
            <div className="mb-3">
              <label
                className="form-label text-primary fw-bold"
                htmlFor="basic-default-Students-IDS"
              >
                IDs
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
            <input
              className="btn btn-primary"
              type="submit"
              value="Delete"
            />
          </form>

          <h1 className="p-2 bg-white rounded shadow-sm">All Messages</h1>
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

export default ShowAllContactUs;

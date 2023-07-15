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

const ShowBatch = () => {
  const [bgs, setBgs] = useState([]);
  const [keys, setKeys] = useState([]);

  const [bgs2, setBgs2] = useState([]);
  const [keys2, setKeys2] = useState([]);
  

  const [selectedRows, setSelectedRows] = useState([]);
  const axiosInstance = useAxiosInstance();
  const [isLoading, setIsLoading] = useState(true);

  //Form Feilds

  const [batchName, setBatchName] = useState("");
  const [desc, setDesc] = useState("");
  const [studentList, setStudentList] = useState("");

  useEffect(() => {
    axiosInstance.get('/batch/'+window.location.href.split('/').pop()).then(res=>{
      setSelectedRows(res.data.studentsId)
      setBatchName(res.data.name)
      setDesc(res.data.desciption)
      setBgs2(res.data.studentsData)
      const allKeys = Array.from(
        new Set(
          res.data.studentsData.reduce((keys, obj) => {
            return keys.concat(Object.keys(obj));
          }, [])
        )
      );
      setKeys2(allKeys);
      
    })
    axiosInstance
      .get("/users/all")
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
              stripeClasses: ["table-striped"],
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
    if (!$.fn.DataTable.isDataTable("#myTable")) {
      $(document).ready(function () {
        setTimeout(function () {
          $("#table2")
            .DataTable({
              pagingType: "full_numbers",
              pageLength: 20,
              processing: true,
              stripeClasses: ["table-striped"],
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
        }, 0);
      });
    }
  }, [isLoading]);

  const handleSelectAll = () => {
    const table = $("#table").DataTable();
    const filteredData = table
      .rows({ search: "applied" })
      .data()
      .toArray()
      .flatMap((elem) => elem[1]);
    setSelectedRows((prevState) => {
      setSelectedRows([...prevState, ...filteredData]);
    });
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

  useEffect(() => {
    console.log(selectedRows);
  }, [selectedRows]);

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
  const bgsList2 = () => {
    return bgs2.map((bg) => {
      return (
        <BoardGame
          bg={bg}
          keys={keys2}
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
        name: batchName,
        desciption: desc,
        studentsId: selectedRows,
      };
      axiosInstance
        .patch("/batch/"+window.location.href.split('/').pop(), data)
        .then((result) => {
          if (result.data) {
            alert(`${result.data.name} Edited Successfully`);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log("Something went Wrong");
    }
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
                htmlFor="basic-default-BatchName"
              >
                Batch Name
              </label>
              <input
                type="text"
                required
                className="form-control"
                id="basic-default-BatchName"
                value={batchName}
                onChange={(e) => {
                  setBatchName(e.target.value);
                }}
              />
            </div>

            <div className="mb-3">
              <label className="form-label text-primary fw-bold">
                Batch Description
              </label>
              <input
                type="text"
                required
                className="form-control"
                value={desc}
                onChange={(e) => {
                  setDesc(e.target.value);
                }}
              />
            </div>

            <div className="mb-3">
              <label
                className="form-label text-primary fw-bold"
                htmlFor="basic-default-Students-IDS"
              >
                Student IDs
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
            <input className="btn btn-primary" type="submit" value="Edit" />
          </form>
          
          <h3 className="mt-3 p-2  bg-white rounded shadow-sm">Students List</h3>

          <div className="table-responsive  bg-white rounded p-2 shadow-sm">
            <table
              id="table2"
              className="table text-black table-striped align-items-center justify-content-center mb-0"
            >
              <thead>
                <tr>
                  <th className="text-primary" scope="col">
                    Select
                  </th>
                  {keys2.map((key) => (
                    <th
                      className="text-xs text-primary font-weight-bold"
                      key={key}
                    >
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>{bgsList2()}</tbody>
              <tfoot>
                <tr>
                  <th scope="col">Select</th>
                  {keys2.map((key) => (
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


          <h3 className="mt-3 p-2  bg-white rounded shadow-sm">All Users</h3>

          <div className="table-responsive  bg-white rounded p-2 shadow-sm">
            <table
              id="table"
              className="table text-black table-striped align-items-center justify-content-center mb-0"
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

export default ShowBatch;
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
        <button type="button" class="btn btn-icon btn-primary">
          <span class="tf-icons bx bx-scan"></span>
        </button>
      </td>
      {keys.map((key) => (
        <td className="text-xs font-weight-bold" key={key}>
          {bg[key]}
        </td>
      ))}
      <td>
        <input
          type="checkbox"
          checked={selectedRows.includes(bg._id)}
          onChange={handleCheckboxChange}
        />
      </td>
    </tr>
  );
};

const MarkAttendanceTable = (props) => {
  const [bgs, setBgs] = useState(props.tableData);
  const [keys, setKeys] = useState(props.tableKeys);
  const [selectedRows, setSelectedRows] = useState([]);
  const axiosInstance = useAxiosInstance();
  const [isLoading, setIsLoading] = useState(false);

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
        <div className="" style={{ marginTop: "50px" }}>
          <div className="table-responsive  bg-white rounded p-2 shadow-sm">
            <h3>{props.title}</h3>

            <table
              id="table"
              className="table  align-items-center justify-content-center mb-0"
            >
              <thead>
                <tr>
                  <th className="text-primary" scope="col">
                    Action
                  </th>
                  {keys.map((key) => (
                    <th
                      className="text-xs text-primary font-weight-bold"
                      key={key}
                    >
                      {key}
                    </th>
                  ))}
                  <th className="text-primary" scope="col">
                    Select{" "}
                    <button
                      onClick={handleSelectAll}
                      className="btn btn-primary btn-sm"
                    >
                      All
                    </button>{" "}
                  </th>
                </tr>
              </thead>
              <tbody>{bgsList()}</tbody>
              <tfoot>
                <tr>
                  <th scope="col">Action</th>
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
                  <th scope="col">Select</th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default MarkAttendanceTable;

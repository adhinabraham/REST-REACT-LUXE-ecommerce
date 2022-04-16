import React from "react";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import DatePicker from "@mui/lab/DateRangePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Navigation from "../verticalNavigation/Navigation";
import Navbar from "../adminnavbar/Navbar";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { sizeWidth } from "@mui/system";
import jsPDF from "jspdf";
import "jspdf-autotable";
import XLSX from 'xlsx';


function Salesreport() {
  const [value, setValue] = React.useState([null, null]);
  const [orderlist, setorderlist] = useState([]);
  const [q, setq] = useState("");
  const [week, setweek] = useState([]);
  const [weekdata, setweekdata] = useState(null);
  const [month, setmonth] = useState([]);
  const [monthdata, setmonthdata] = useState(null);

  function serach(rows) {
    return rows.filter((rows) => rows.date.indexOf(q) > -1);
  }
  const orderdatamonth = () => {
    console.log("month data");
    const data = { sales: "month" };
    axios
      .post("http://127.0.0.1:8000/order/salesreport/", data)
      .then((Response) => {
        console.log("this is then");
        console.log(Response.data);
        setmonth(Response.data);
        setweekdata(false);
        setmonthdata(true);
      })
      .catch((error) => {
        console.log("this is catch");
        console.log(console.log(error.data));
      });
  };
  const orderdataweek = () => {
    console.log("week data");
    const data = { sales: "week" };
    axios
      .post("http://127.0.0.1:8000/order/salesreport/", data)
      .then((Response) => {
        console.log("this is then");
        console.log(Response.data);
        setweek(Response.data);
        setmonthdata(false);
        setweekdata(true);
      })
      .catch((error) => {
        console.log("this is catch");
        console.log(console.log(error.data));
      });
  };

  const orderall = () => {
    console.log("all are false ");
    setweekdata(false);
    setmonthdata(false);
    orderdata();
  };

  const orderdata = () => {
    axios
      .get("http://127.0.0.1:8000/order/orderplaced/")
      .then((Response) => {
        console.log("this is then");
        console.log(Response.data);
        setorderlist(Response.data);
      })
      .catch((error) => {
        console.log("this is catch");
        console.log(console.log(error.data));
      });
  };

  useEffect(() => {
    orderdata();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "username", headerName: "Email", width: 150 },
    { field: "products", headerName: "Products", width: 150 },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      width: 90,
    },
    {
      field: "date",
      headerName: "Date",
      type: "number",
      width: 150,
    },
    {
      field: "status",
      headerName: "status",
      //    description: "This column has a value getter and is not sortable.",
      //    sortable: false,
      width: 160,
      //    valueGetter: (params) =>
      //      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
  ];

  const downloadpdf = () => {
    console.log("pdfunction");
    const doc = jsPDF();
    doc.text("Order details", 20, 10);
    doc.autoTable({
      columns: columns.map((col) => ({ ...col, dataKey: col.field })),
      body: orderlist,
    });
    doc.save("table.pdf");
  };

  // const exel = () => {
  //   console.log("thsi is exel function")

  //   const worksheet = XLSX.utils.json_to_sheet(orderlist);
  //   const workbook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, "orderdetails");
    
  // };

  let rows = orderlist;
  if (weekdata == true) {
    console.log("this is week data if condition");
    rows = week;
  } else if (monthdata == true) {
    console.log(" this is month data if condition");

    rows = month;
  } else {
    rows = serach(orderlist);
  }

  return (
    <div>
      <Navbar></Navbar>
      <div>
        <Navigation className="w-1/5"></Navigation>
        <div className=" mt-[-700px] ml-96 w-4/5  ">
          {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Basic example"
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider> */}
          <div className=" flex items-stretch w-60 mt-[-40px] ml-14">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                orderdatamonth();
              }}
            >
              month
            </button>
            <button
              class="bg-blue-500 ml-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                orderdataweek();
              }}
            >
              week
            </button>
            <button
              class="bg-blue-500 ml-5  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                orderall();
              }}
            >
              All
            </button>
            <input
              className=" hadow appearance-none border rounded ml-5 h-14 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="filter by date"
              value={q}
              onChange={(e) => {
                setq(e.target.value);
              }}
            ></input>
          </div>

          <div className="mt-7">
            <div className=" h-[500px] w-4/5">
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={8}
                rowsPerPageOptions={[5]}
                checkboxSelection
              />
            </div>
          </div>
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              downloadpdf();
            }}
          >
            export to pdf
          </button>
         
        </div>
      </div>
    </div>
  );
}

export default Salesreport;

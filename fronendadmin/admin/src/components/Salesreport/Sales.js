import React from "react";
import { useEffect, useState } from "react";
import Datatable from "./Datatable";
import axios from "axios";

function Sales() {
  const [data, setData] = useState([]);
  const [q, setq] = useState("");

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/newadmin/userlists/").then((Response) => {
      setData(Response.data);
    });
  }, []);
    
    function serach(rows) {
        return rows.filter(rows=>rows.username.toLowerCase().indexOf(q)>-1)
    }
  return (
    <div>
          <div>
              <input type="text" value={q} onChange={(e)=>{setq(e.target.value)}}></input>
      </div>
          <div>
              <Datatable data={serach(data)}>

              </Datatable>
      </div>
    </div>
  );
}

export default Sales;

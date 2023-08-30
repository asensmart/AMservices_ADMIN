import React, { useState, useEffect } from "react";
import BrandTable from "../../../Components/Tables/brandsTable";
import Axios from "axios";
import { Modal } from "antd";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { BiEditAlt } from "react-icons/bi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";

function ViewSubCategory() {
  const [data, setData] = useState([]);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    Axios.get("/get/areaNames").then((res) => {
      setData(res.data.data);
    });
  }, [refetch]);

  const navigate = useNavigate();

  const DeleteHandler = (data) => {
    Axios.delete(`/delete/areaName`, { data })
      .then((res) => {
        notification["success"]({
          message: res.data.data,
        });
        setRefetch(!refetch);
      })
      .catch(() => {
        notification["error"]({
          message: "Something went wrong!",
        });
      });
  };

  return (
    <div className="white-container">
      {/* <BrandTable tableData={data} editPath={"/editBrand"} isBrand={true} refetch={refetch} setRefetch={setRefetch} /> */}

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell> S.No </TableCell>
              <TableCell align="center">Brand Name</TableCell>
              <TableCell align="center">Slug</TableCell>
              <TableCell align="center">Title</TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, i) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {i + 1}
                </TableCell>
                <TableCell align="center">{row?.serviceAreaName}</TableCell>
                <TableCell align="center">{row?.slug}</TableCell>
                <TableCell align="center">{row?.title}</TableCell>
                <TableCell align="center">
                  <div
                    onClick={() => {
                      navigate("/editServiceArea", { state: row });
                    }}
                  >
                    <BiEditAlt />
                  </div>
                </TableCell>
                <TableCell align="center">
                  <div onClick={() => DeleteHandler(row)}>
                    <MdOutlineDeleteOutline />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ViewSubCategory;

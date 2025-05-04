import React, { useState } from "react";
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
import axios from "axios";
import { notification } from "antd";

export default function BlogTable({
  tableData,
  editPath,
  setRefetch,
  refetch,
}) {
  const navigate = useNavigate();

  const DeleteHandler = (data) => {
    axios
      .delete(`/delete/blog`, { data })
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
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell> S.No </TableCell>
              <TableCell align="center">Blog Title</TableCell>
              <TableCell align="center">Short Description</TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row, i) => (
              <TableRow
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {i + 1}
                </TableCell>
                <TableCell align="center">
                  {row.blogTitle ? row.blogTitle : row.blogTitle}
                </TableCell>
                <TableCell align="center">{row.shortDescription}</TableCell>
                <TableCell align="center">
                  <div
                    onClick={() => {
                      navigate(editPath, { state: row });
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
    </>
  );
}

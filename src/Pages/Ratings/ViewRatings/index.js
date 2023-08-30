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
import { useNavigate, useParams } from "react-router-dom";
import { notification } from "antd";

function ViewRatings() {
  const [data, setData] = useState([]);
  const [refetch, setRefetch] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    Axios.get(`/get/ratings/${id}`).then((res) => {
      // console.log("res data---->", res);
      setData(res.data.data);
    });
  }, [id, refetch]);

  const DeleteHandler = (data) => {
    // console.log("Delete data --->", data);
    Axios.delete(`/delete/rating/${data._id}`, { data })
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

  // const dummyData = [
  //   {
  //     id: Date.now(),
  //     brandName: "LG",
  //     rating: 4,
  //     comment: "LG is a good Product",
  //   },
  //   {
  //     id: Date.now(),
  //     brandName: "SAMSUNG",
  //     rating: 2,
  //     comment: "I don't like this",
  //   },
  //   {
  //     id: Date.now(),
  //     brandName: "MI",
  //     rating: 3,
  //     comment: "Good product but it is over heating",
  //   },
  // ];

  return (
    <div className="white-container">
      {/* <BrandTable tableData={data} editPath={"/editBrand"} isBrand={true} refetch={refetch} setRefetch={setRefetch} /> */}

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell> S.No </TableCell>
              <TableCell align="center">Brand Name</TableCell>
              <TableCell align="center">Rating</TableCell>
              <TableCell align="center">Comment</TableCell>
              {/* <TableCell align="center"></TableCell> */}
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {data.map((row, i) => ( */}
            {data.map((row, i) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {i + 1}
                </TableCell>
                <TableCell align="center">{row?.brandId?.brandName}</TableCell>
                <TableCell align="center">{row?.rating}</TableCell>
                <TableCell align="center">{row?.comment}</TableCell>
                {/* <TableCell align="center">
                  <div
                    onClick={() => {
                      navigate("/editServiceArea", { state: row });
                    }}
                  >
                    <BiEditAlt />
                  </div>
                </TableCell> */}
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

export default ViewRatings;

import React, { useState, useEffect } from "react";
import BlogTable from "../../../Components/Tables/blogTable";
import Axios from "axios";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function ViewBlogs() {
  const [data, setData] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get("/get/getAllBlogs").then((res) => {
      setData(res.data.data);
    });
  }, [refetch]);

  const createFun = () => {
    console.log("fun called");
     navigate("/createBlog");
  }



  return (
    <div className="white-container">
      <div
        style={{ display: "flex", justifyContent: "right", padding: "10px" }}
      >
        <Stack spacing={2} direction="row" onClick={() => navigate("/createBlog")}>
          <Button variant="contained">+ Create</Button>
        </Stack>
      </div>
      <BlogTable
        tableData={data}
        editPath={"/editBlog"}
        refetch={refetch}
        setRefetch={setRefetch}
      />
    </div>
  );
}

export default ViewBlogs;

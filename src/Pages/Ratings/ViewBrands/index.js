import React, { useState, useEffect } from "react";
import { HistoryOutlined, RiseOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ViewBrands = () => {
  const navigate = useNavigate();
  const [totalCategories, setTotalCategories] = useState(0);
  const [data, setData] = useState([]);

  const dummyData = [
    {
      id: Date.now(),
      brandName: "LG",
      overAllRating: 3.5,
    },
    {
      id: Date.now(),
      brandName: "SAMSUNG",
      overAllRating: 4,
    },
    {
      id: Date.now(),
      brandName: "MI",
      overAllRating: 4,
    },
    {
      id: Date.now(),
      brandName: "REALME",
      overAllRating: 4,
    },
    {
      id: Date.now(),
      brandName: "ONE PLUS",
      overAllRating: 4,
    },
    {
      id: Date.now(),
      brandName: "VOLTAS",
      overAllRating: 4,
    },
  ];

  useEffect(() => {
    // axios
    //   .get("/get/categories")
    //   .then((res) => setTotalCategories(res.data.data.length));

    axios.get("/get/brands").then((res) => {
    //   console.log(res.data.data);
      setData(res.data.data);
    });
  }, []);

  const Card = ({ itemId, title, total, icon, url }) => {
    return (
      <div className="Card-container" key={itemId}>
        <h1>Brand Name : {title}</h1>
        <h2> OverAll Rating : {total}</h2>
        <button onClick={() => navigate(`/viewRatings/${itemId}`)}>View</button>
      </div>
    );
  };

  return (
    <section className="dashboard-container">
      {data.map((item) => (
        <Card
          itemId={item._id}
          title={item.brandName}
          total={item.overallRating}
          icon={<RiseOutlined />}
          url={"/viewRatings"}
        />
      ))}
      {/* <Card
        title={"Total No. Of Categories"}
        total={totalCategories}
        icon={<RiseOutlined />}
        url={"/viewRatings"}
      /> */}
    </section>
  );
};

export default ViewBrands;

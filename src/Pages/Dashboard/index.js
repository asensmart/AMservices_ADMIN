import React, { useState, useEffect } from "react";
import { HistoryOutlined, RiseOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();
  const [totalCategories, setTotalCategories] = useState(0);
  const [totalBrands, setTotalBrands] = useState(0);
  const [totalAreaNames, setTotalAreaNames] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);

  useEffect(() => {
    axios
      .get("/get/categories")
      .then((res) => setTotalCategories(res?.data?.data?.length));
    axios
      .get("/get/brands")
      .then((res) => setTotalBrands(res?.data?.data?.length));
    axios
      .get("/get/areaNames")
      .then((res) => setTotalAreaNames(res?.data?.data?.length));
    axios
      .get("/get/ratingsCount")
      .then((res) => setTotalRatings(res?.data?.data));
  }, []);

  const Card = ({ title, total, icon, url }) => {
    return (
      <div className="Card-container">
        <h1>
          <span>{icon} </span>
          {title}{" "}
        </h1>
        <h2> {total}</h2>
        <button onClick={() => navigate(url)}>View</button>
      </div>
    );
  };

  return (
    <section className="dashboard-container">
      <Card
        title={"Total No. Of Categories"}
        total={totalCategories}
        icon={<RiseOutlined />}
        url={"/viewCategory"}
      />
      <Card
        title={"Total No. Of Brands"}
        total={totalBrands}
        icon={<RiseOutlined />}
        url={"/viewBrand"}
      />
      <Card
        title={"Total No. of Area Names"}
        total={totalAreaNames}
        icon={<RiseOutlined />}
        url={"/viewServiceArea"}
      />
      <Card
        title={"Total No. of ratings"}
        total={totalRatings}
        icon={<RiseOutlined />}
        url={"/viewRatings"}
      />
    </section>
  );
}

export default Dashboard;

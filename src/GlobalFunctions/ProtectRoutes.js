import { useState, useEffect } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";

const Loader = () => {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Spin indicator={antIcon} />
    </div>
  );
};

export const ProtectRoutes = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    const AuthRequest = async () => {
      try {
        let res = await axios.post("/post/validate");
        if (res.data.success) {
          setFetched(true);
          setIsLoggedIn(true);
        }
      } catch (error) {
        setFetched(true);
        setIsLoggedIn(false);
      }
    };
    AuthRequest();
  }, []);

  return fetched ? (
    isLoggedIn ? (
      <Outlet />
    ) : (
      <Navigate to={"/"} state={{ from: location }} replace />
    )
  ) : (
    <Loader />
  );
};

import {
  DashboardOutlined,
  AppstoreOutlined,
  PlusOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { GoLocation } from "react-icons/go";
import { AiOutlineStar } from "react-icons/ai";
import { FaBlog, FaBlogger } from "react-icons/fa";
import { Breadcrumb, Layout, Menu } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function getItem(label, key, link, icon, children) {
  return {
    key,
    icon,
    children,
    label,
    link,
  };
}

const items = [
  getItem("Dashboard", "1", "/dashboard", <DashboardOutlined />),
  getItem("Category", "sub1", "", <AppstoreOutlined />, [
    getItem("Create Category", "2", "/createCategory", <PlusOutlined />),
    getItem("View Category", "3", "/viewCategory", <EyeOutlined />),
  ]),
  getItem("Brand", "sub2", "", <AppstoreOutlined />, [
    getItem("Create Brand", "4", "/createBrand", <PlusOutlined />),
    getItem("View Brand", "5", "/viewBrand", <EyeOutlined />),
  ]),
  getItem("Service Areas", "sub3", "", <GoLocation />, [
    getItem("Create Service", "6", "/createServiceArea", <PlusOutlined />),
    getItem("View Service", "7", "/viewServiceArea", <EyeOutlined />),
  ]),
  getItem("Ratings", "sub4", "", <AiOutlineStar />, [
    getItem("View Ratings", "8", "/viewRatings", <EyeOutlined />),
  ]),
  getItem("Blogs", "sub5", "", <FaBlog />, [
    getItem("Create Blog", "9", "/createBlog", <PlusOutlined />),
    getItem("View Blogs", "10", "/viewBlog", <FaBlogger />),
  ]),
];

const GetLinkFromItems = (e) => {
  let URL;
  items.map((item) => {
    if (item.children) {
      return item.children.map((child) => {
        if (child.key == e.key) {
          URL = child.link;
        }
      });
    } else {
      if (item.key == e.key) {
        URL = item.link;
      }
    }
  });
  return URL;
};

const Layouts = ({ Activekey, children, Breadcrumbs = [] }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { Header, Content, Footer, Sider } = Layout;
  const navigate = useNavigate();

  const LogoutHandler = () => {
    axios.post("/post/logout").then((res) => {
      if (res.data.key) {
        navigate("/");
      }
    });
  };

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
      className="layout-container"
      hasSider
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => {
          setCollapsed(value);
        }}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <h2 className="logo-text">AM Service Solution</h2>
        <Menu
          theme="dark"
          defaultSelectedKeys={[Activekey]}
          mode="inline"
          items={items}
          onClick={(e) => {
            let URL = GetLinkFromItems(e);
            navigate(URL);
          }}
        />
      </Sider>
      <Layout
        className="site-layout"
        style={{
          marginLeft: collapsed ? 80 : 200,
          transition: "all .2s",
          marginTop: 65,
        }}
      >
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
            position: "fixed",
            top: 0,
            zIndex: 1,
            width: "100%",
          }}
        >
          <div style={{ position: "relative" }}>
            <button
              onClick={LogoutHandler}
              style={{
                width: "100px",
                height: "auto",
                backgroundColor: "transparent",
                border: "none",
                color: "white",
                position: "absolute",
                right: "200px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </div>
        </Header>
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            {Breadcrumbs.map((item) => (
              <Breadcrumb.Item>{item}</Breadcrumb.Item>
            ))}
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Layouts;

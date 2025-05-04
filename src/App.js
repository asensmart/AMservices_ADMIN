import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectRoutes } from "./GlobalFunctions/ProtectRoutes";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import CreateCategory from "./Pages/Category/CreateCategory";
import ViewCategory from "./Pages/Category/ViewCategory";
import CreateBrand from "./Pages/Brand/CreateBrand";
import ViewBrand from "./Pages/Brand/ViewBrand";
import EditBrand from "./Pages/Brand/EditBrand";
import EditCategory from "./Pages/Category/EditCategory";
import CreateServiceArea from "./Pages/ServiceAreas/CreateServiceArea";
import EditServiceArea from "./Pages/ServiceAreas/EditServiceArea";
import ViewServiceArea from "./Pages/ServiceAreas/ViewServiceArea";
import ViewRatingByBrand from "./Pages/Ratings/ViewRatings";
import ViewBrands from "./Pages/Ratings/ViewBrands";
import Layouts from "./Components/layouts";
import CreateBlog from "./Pages/Blog/CreateBlog";
import ViewBlog from "./Pages/Blog/ViewBlog";
import EditBlog from "./Pages/Blog/EditBlog";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />

          {/* Protected Routes  */}
          <Route element={<ProtectRoutes />}>
            <Route
              path="/dashboard"
              element={
                <Layouts Activekey={"1"} Breadcrumbs={["Dashboard"]}>
                  <Dashboard />
                </Layouts>
              }
            />
            <Route
              path="/createCategory"
              element={
                <Layouts
                  Activekey={"2"}
                  Breadcrumbs={["Category", "Create Category"]}
                >
                  <CreateCategory />
                </Layouts>
              }
            />
            <Route
              path="/editCategory"
              element={
                <Layouts
                  Activekey={"5"}
                  Breadcrumbs={["Category", "Edit Category"]}
                >
                  <EditCategory />
                </Layouts>
              }
            />
            <Route
              path="/viewCategory"
              element={
                <Layouts
                  Activekey={"3"}
                  Breadcrumbs={["Category", "View Categories"]}
                >
                  <ViewCategory />
                </Layouts>
              }
            />
            <Route
              path="/createBrand"
              element={
                <Layouts
                  Activekey={"4"}
                  Breadcrumbs={["Brand", "Create Brand"]}
                >
                  <CreateBrand />
                </Layouts>
              }
            />
            <Route
              path="/viewBrand"
              element={
                <Layouts Activekey={"5"} Breadcrumbs={["Brand", "View Brand"]}>
                  <ViewBrand />
                </Layouts>
              }
            />
            <Route
              path="/editBrand"
              element={
                <Layouts Activekey={"5"} Breadcrumbs={["Brand", "Edit Brand"]}>
                  <EditBrand />
                </Layouts>
              }
            />
            <Route
              path="/createServiceArea"
              element={
                <Layouts
                  Activekey={"6"}
                  Breadcrumbs={["Service Areas", "Create Service Area"]}
                >
                  <CreateServiceArea />
                </Layouts>
              }
            />
            <Route
              path="/viewServiceArea"
              element={
                <Layouts
                  Activekey={"7"}
                  Breadcrumbs={["Service Areas", "View Service Area"]}
                >
                  <ViewServiceArea />
                </Layouts>
              }
            />
            <Route
              path="/editServiceArea"
              element={
                <Layouts
                  Activekey={"8"}
                  Breadcrumbs={["Service Areas", "Edit Service Area"]}
                >
                  <EditServiceArea />
                </Layouts>
              }
            />
            <Route
              path="/viewRatings"
              element={
                <Layouts Activekey={"9"} Breadcrumbs={["View Ratings"]}>
                  <ViewBrands />
                </Layouts>
              }
            />
            <Route
              path="/viewRatings/:id"
              element={
                <Layouts Activekey={"10"} Breadcrumbs={["View Ratings"]}>
                  <ViewRatingByBrand />
                </Layouts>
              }
            />
            <Route
              path="/createBlog"
              element={
                <Layouts Activekey={"11"} Breadcrumbs={["Blogs", "Create Blog"]}>
                  <CreateBlog />
                </Layouts>
              }
            />
            <Route
              path="/viewBlog"
              element={
                <Layouts Activekey={"12"} Breadcrumbs={["Blogs", "View Blogs"]}>
                  <ViewBlog />
                </Layouts>
              }
            />
            <Route
              path="/editBlog"
              element={
                <Layouts Activekey={"13"} Breadcrumbs={["Blog", "Edit Blog"]}>
                  <EditBlog />
                </Layouts>
              }
            />
          </Route>

          {/* Catch all not found routes */}
          <Route path="*" element={<h1>404 Page Error</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import UploadImageTag from "../../../Components/ImageUpload";
import RichTextEditor from "../../../Components/RichTextEditor";
import axios from "axios";
import { notification, Spin, Switch } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { MdDelete, MdAdd } from "react-icons/md";

function EditBlog(props) {
  const [data, setData] = useState({});
  const [banner, setBanner] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [moreInfo, setMoreInfo] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const state = useLocation().state;

  useEffect(() => {
    setData(state);
    setBanner([state.banner]);
    setThumbnail([state.thumbnail]);
    setMoreInfo(state.moreInfo);
    setDescription(state.description);
  }, []);

  const SubmitHandler = (e) => {
    e.preventDefault();

    delete data.createdAt;
    delete data.updatedAt;
    data.moreInfo = moreInfo;
    data.description = description;
    const formdata = new FormData();
    formdata.append("data", JSON.stringify(data));

    if (banner[0].path) {
      formdata.append("banner", banner[0]);
      formdata.append("oldBanner", data.banner);
    }

    if (thumbnail[0].path) {
      formdata.append("thumbnail", thumbnail[0]);
      formdata.append("oldThumbnail", data.thumbnail);
    }

    setLoading(true);
    axios
      .put("/put/updateBlog", formdata)
      .then((res) => {
        setLoading(false);
        notification["success"]({
          message: "Blog updated",
        });
        navigate("/viewBlog");
      })
      .catch((error) => {
        setLoading(false);
        notification["error"]({
          message: "Something went wrong! please try again later",
        });
      });
  };

  return (
    <Spin spinning={loading}>
      <div className="white-container">
        <form className="form-container" onSubmit={SubmitHandler}>
          <h1 className="section-title">Blog</h1>
          <div className="make-grid-container-2">
            <section>
              <label>Blog Title*</label>
              <input
                type={"text"}
                value={data.blogTitle ? data.blogTitle : ""}
                onChange={(e) =>
                  setData({ ...data, blogTitle: e.target.value })
                }
              />
            </section>
            <section>
              <label>Short Description*</label>
              <input
                type={"text"}
                value={data.shortDescription ? data.shortDescription : ""}
                onChange={(e) =>
                  setData({ ...data, shortDescription: e.target.value })
                }
              />
            </section>
            <section>
              <label>Thumbnail*</label>
              <UploadImageTag files={thumbnail} setFiles={setThumbnail} />
            </section>
          </div>
          <div className="make-grid-container-1">
            <section>
              <label>banner*</label>
              <UploadImageTag files={banner} setFiles={setBanner} />
            </section>
          </div>
          <div className="make-grid-container-1">
            <section>
              <label>Rich Text Editor</label>
              <RichTextEditor content={moreInfo} setContent={setMoreInfo} />
            </section>
          </div>
          {/* Data transfer to Notepad */}
          <h1 className="section-title">Meta Tags</h1>
          <div className="make-grid-container-3">
            <section>
              <label>Meta Title*</label>
              <input
                type={"text"}
                value={data.metaTitle ? data.metaTitle : ""}
                onChange={(e) =>
                  setData({ ...data, metaTitle: e.target.value })
                }
              />
            </section>

            <section>
              <label>Meta Description </label>
              <input
                type={"text"}
                value={data.metaDescription ? data.metaDescription : ""}
                onChange={(e) =>
                  setData({ ...data, metaDescription: e.target.value.trim() })
                }
              />
            </section>
            <section>
              <label>Meta Keywords*</label>
              <input
                type={"text"}
                value={data.metaKeywords ? data.metaKeywords : ""}
                onChange={(e) =>
                  setData({ ...data, metaKeywords: e.target.value })
                }
              />
            </section>
          </div>
          <button type="submit" className="submit-btn">
            Update Blog
          </button>
        </form>
      </div>
    </Spin>
  );
}

export default EditBlog;

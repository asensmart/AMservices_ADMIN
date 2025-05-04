import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { notification, Spin, Select, Switch } from "antd";
import { MdAdd, MdDelete } from "react-icons/md";
import axios from "axios";
import UploadImageTag from "../../../Components/ImageUpload/index";
import RichTextEditor from "../../../Components/RichTextEditor";

const CreateBlog = () => {
  const [data, setData] = useState({});
  //   {
  //   enableFaq: false,
  //   faqs: [
  //     {
  //       "@type": "Question",
  //       name: "",
  //       acceptedAnswer: {
  //         "@type": "Answer",
  //         text: "",
  //       },
  //     },
  //   ],
  // });

  const [banner, setBanner] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [moreInfo, setMoreInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const { Option } = Select;

  const SubmitHandler = (e) => {
    e.preventDefault();

    if (
      data?.blogTitle &&
      data?.shortDescription &&
      data?.metaKeywords &&
      data?.metaTitle &&
      (banner !== null) & (thumbnail !== null)
    ) {
      const formData = new FormData();
      let temp = {
        ...data,
        moreInfo,
        description,
      };
      formData.append("data", JSON.stringify(temp));
      formData.append("banner", banner[0]);
      formData.append("thumbnail", thumbnail[0]);

      setLoading(true);
      axios
        .post("/post/createBlog", formData)
        .then((res) => {
          setLoading(false);
          notification["success"]({
            message: res.data.message,
            duration: 1,
          });
          navigate("/viewBlog");
        })
        .catch((err) => {
          setLoading(false);
          notification["error"]({
            message: "Something went wrong!",
            duration: 1,
          });
        });
    } else {
      notification["error"]({
        message: "Please fill the mandatory fields",
        duration: 1,
      });
    }
  };

  // const handleChange = (value) => {
  //   let item = JSON.parse(value);
  //   setData({ ...data, brandName: item.brandName });
  // };

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
                  setData({ ...data, metaDescription: e.target.value })
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
            Create Blog
          </button>
        </form>
      </div>
    </Spin>
  );
};

export default CreateBlog;

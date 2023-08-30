import React, { useEffect, useState } from "react";
import UploadImageTag from "../../../Components/ImageUpload";
import RichTextEditor from "../../../Components/RichTextEditor";
import axios from "axios";
import { notification, Spin, Switch } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { MdDelete, MdAdd } from "react-icons/md";

function EditBrand(props) {
  const [data, setData] = useState({});
  const [logo, setLogo] = useState(null);
  const [sideThumbnail, setSideThumbnail] = useState(null);
  const [titleBackgroundImage, setTitleBackgroundImage] = useState(null);
  const [moreInfo, setMoreInfo] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const state = useLocation().state;

  useEffect(() => {
    setData(state);
    setLogo([state.brandLogo]);
    setTitleBackgroundImage([state.titleBackgroundImage]);
    setSideThumbnail([state.sideThumbnail]);
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

    if (logo[0].path) {
      formdata.append("logo", logo[0]);
      formdata.append("oldLogoURL", data.brandLogo);
    }

    if (sideThumbnail[0].path) {
      formdata.append("sideImage", sideThumbnail[0]);
      formdata.append("oldSideThumbnailURL", data.sideThumbnail);
    }

    if (titleBackgroundImage[0].path) {
      formdata.append("titleBackground", titleBackgroundImage[0]);
      formdata.append("oldTitleBackgroundImageURL", data.titleBackgroundImage);
    }
    setLoading(true);
    axios
      .put("/put/brand", formdata)
      .then((res) => {
        setLoading(false);
        notification["success"]({
          message: "Brand updated",
        });
        navigate("/viewBrand");
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
          <h1 className="section-title">General</h1>
          <div className="make-grid-container-3">
            <section>
              <label>Brand Name*</label>
              <input
                type={"text"}
                value={data.brandName ? data.brandName : ""}
                onChange={(e) =>
                  setData({ ...data, brandName: e.target.value })
                }
              />
            </section>

            <section>
              <label>Slug* (eg : /samsung) </label>
              <input
                type={"text"}
                value={data.slug ? data.slug : ""}
                onChange={(e) =>
                  setData({ ...data, slug: e.target.value.trim() })
                }
              />
            </section>
            <section>
              <label>Title*</label>
              <input
                type={"text"}
                value={data.title ? data.title : ""}
                onChange={(e) => setData({ ...data, title: e.target.value })}
              />
            </section>
            <section>
              <label>Logo Image Alt Name*</label>
              <input
                type={"text"}
                value={data.logoAltName ? data.logoAltName : ""}
                onChange={(e) =>
                  setData({ ...data, logoAltName: e.target.value })
                }
              />
            </section>
            <section>
              <label>Brand Logo*</label>
              <UploadImageTag files={logo} setFiles={setLogo} />
            </section>
          </div>
          <h1 className="section-title">Brand Information</h1>
          <div className="make-grid-container-2">
            <section>
              <label>Side Thumbnail*</label>
              <UploadImageTag
                files={sideThumbnail}
                setFiles={setSideThumbnail}
              />
            </section>
            <section>
              <label>Description*</label>
              {/* <textarea
                className="text-area"
                value={data.description ? data.description : ""}
                onChange={(e) =>
                  setData({ ...data, description: e.target.value })
                }
              /> */}
              <RichTextEditor
                content={description}
                setContent={setDescription}
              />
            </section>
            <section>
              <label>Side Image Alt Name*</label>
              <input
                type={"text"}
                value={data.sideImageAltName ? data.sideImageAltName : ""}
                onChange={(e) =>
                  setData({ ...data, sideImageAltName: e.target.value })
                }
              />
            </section>
            <section>
              <label>Description Header*</label>
              <input
                type={"text"}
                value={data.sideImageHeader ? data.sideImageHeader : ""}
                onChange={(e) =>
                  setData({ ...data, sideImageHeader: e.target.value })
                }
              />
            </section>
          </div>
          <h1 className="section-title">Title Background</h1>
          <div className="make-grid-container-1">
            <section>
              <label>Title Background Image*</label>
              <UploadImageTag
                files={titleBackgroundImage}
                setFiles={setTitleBackgroundImage}
              />
            </section>
            <section>
              <label>Title Background Alt Name*</label>
              <input
                type={"text"}
                value={data.titleImageAltName ? data.titleImageAltName : ""}
                onChange={(e) =>
                  setData({ ...data, titleImageAltName: e.target.value })
                }
              />
            </section>
          </div>
          <h1 className="section-title">More Information</h1>
          <div className="make-grid-container-1">
            <section>
              <label>Rich Text Editor Header*</label>
              <input
                type={"text"}
                value={data.richTextHeader ? data.richTextHeader : ""}
                onChange={(e) =>
                  setData({ ...data, richTextHeader: e.target.value })
                }
              />
            </section>
            <section>
              <label>Rich Text Editor</label>
              <RichTextEditor content={moreInfo} setContent={setMoreInfo} />
            </section>
          </div>
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

          <div className="make-grid-container-2">
            <section>
              <label>Contact Number*</label>
              <input
                type={"text"}
                value={data.contactNumber ? data.contactNumber : ""}
                onChange={(e) =>
                  setData({ ...data, contactNumber: e.target.value })
                }
              />
            </section>

            <section>
              <label>Color</label>
              <input
                type={"color"}
                style={{ padding: "0px", width: "100px" }}
                value={data.color ? data.color : ""}
                onChange={(e) => {
                  setData({ ...data, color: e.target.value });
                }}
              />
            </section>
          </div>

          <div className="make-grid-container-1">
            <section>
              <label>Enable Faq</label>
              <Switch
                checked={data?.enableFaq}
                onChange={(e) => {
                  setData({ ...data, enableFaq: e });
                }}
              />
            </section>
          </div>
          {data?.enableFaq
            ? data?.faqs.map((item, i) => (
                <div className="make-grid-container-3">
                  <section>
                    <label>Question*</label>
                    <input
                      type={"text"}
                      value={item.name}
                      onChange={(e) => {
                        let temp = [...data.faqs];
                        temp[i].name = e.target.value;
                        setData({ ...data, faqs: temp });
                      }}
                    />
                  </section>

                  <section>
                    <label>Anwser*</label>
                    <input
                      type={"text"}
                      value={item.acceptedAnswer.text}
                      onChange={(e) => {
                        let temp = [...data.faqs];
                        temp[i].acceptedAnswer.text = e.target.value;
                        setData({ ...data, faqs: temp });
                      }}
                    />
                  </section>
                  <section style={{ alignSelf: "center" }}>
                    {data?.faqs.length !== 1 ? (
                      <button
                        type="button"
                        onClick={() => {
                          let temp = [...data.faqs];
                          let result = temp.filter(
                            (item, index) => index !== i
                          );
                          setData({ ...data, faqs: result });
                        }}
                        style={{
                          padding: "10px",
                          cursor: "pointer",
                          border: "none",
                          backgroundColor: "transparent",
                        }}
                      >
                        <MdDelete fontSize={20} />
                      </button>
                    ) : null}
                    {data?.faqs.length - 1 === i ? (
                      <button
                        type="button"
                        onClick={() => {
                          setData({
                            ...data,
                            faqs: [
                              ...data.faqs,
                              {
                                "@type": "Question",
                                name: "",
                                acceptedAnswer: {
                                  "@type": "Answer",
                                  text: "",
                                },
                              },
                            ],
                          });
                        }}
                        style={{
                          padding: "10px",
                          cursor: "pointer",
                          border: "none",
                          backgroundColor: "transparent",
                        }}
                      >
                        <MdAdd fontSize={20} />
                      </button>
                    ) : null}
                  </section>
                </div>
              ))
            : null}
          <button type="submit" className="submit-btn">
            Update
          </button>
        </form>
      </div>
    </Spin>
  );
}

export default EditBrand;

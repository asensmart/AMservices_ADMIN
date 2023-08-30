import React, { useState } from "react";
import Files from "react-files";
import FileUpload from "react-material-file-upload";

function UploadImage({ files, setFiles, multiple = false }) {
  const onFilesChange = (e) => {
    console.log(e);
    setFiles(e);
  };

  return (
    <div>
      <FileUpload value={files} onChange={onFilesChange} multiple={multiple} />
    </div>
  );
}

export default UploadImage;

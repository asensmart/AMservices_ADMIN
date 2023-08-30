import React, { useState, useRef, useMemo, useEffect } from "react";
import JoditEditor from "jodit-react";

const RichTextEditor = ({ content, setContent }) => {
  const editor = useRef(null);

  return (
    <JoditEditor
      ref={editor}
      value={content}
      tabIndex={1}
      onBlur={(newContent) => setContent(newContent)}
      onChange={(newContent) => {}}
    />
  );
};

export default RichTextEditor;

/** @jsxRuntime classic /
/* @jsx jsx */
import { jsx } from "@emotion/react";

import { useState } from "react";

import { Upload as AntdUpload, message } from "antd";

import Button from "./Button";
import Typography from "./Typography";
import { getBase64 } from "../utils/utils";
import { imageUploadValidation } from "../utils/validations";
import CheckImages from "./CheckImages";
import { mq } from "../styles/styles";

const { Dragger } = AntdUpload;

const props = {
  name: "file",
  multiple: true,
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  }
};

const classes = {
  upload: ({ error }) => (theme) =>
    mq({
      marginTop: 90,
      marginBottom: 228,
      background: error ? theme.colors.errorSecondary : "#E7FDEF",
      border: `2px dashed ${error ? theme.colors.errorPrimary : "#4752D8"}`,
      boxSizing: "border-box",
      borderRadius: 15,
      height: 281,
      width: ["90vw", false, false, false, 1201]
    }),
  dragger: {
    background: "none",
    border: "none"
  },
  uploadInput: mq({
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }),
  content: {
    width: 335
  },
  text: {
    color: "#676C75 !important",
    fontSize: "18px !important",
    fontWeight: 500
  },
  button: {
    marginTop: 26
  }
};

const label =
  "Accédez à votre bibliothèque locale de photo et sélectionnez les photos que vous souhaitez utiliser.";

const Upload = () => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");

  const beforeUpload = (file) => {
    const errorMessage = imageUploadValidation(file);
    setError(errorMessage);
    message.error(errorMessage);
  };

  const onChange = async ({ fileList }) => {
    const { status } = fileList;
    if (status !== "uploading") {
      console.log("uplodading", fileList);
      // console.log(info.file, info.fileList);
    }
    // if (status === "done") {
    const filesArr = [];
    for (const file of fileList) {
      // getBase64(file.originFileObj, (url) =>
      //   setImagesUrl([...imagesUrl, url])
      // );
      const base64 = await getBase64(file.originFileObj);
      filesArr.push({
        file,
        url: base64
      });
      message.success(`${file.name} file uploaded successfully.`);
    }
    // } else if (status === "error") {
    //   for (const file of fileList) {
    //     message.error(`${file.name} file upload failed.`);
    //   }
    // }
    setFiles(filesArr);
  };

  const onCheckImages = (checkedValues) => {
    console.log("checkedValues: ", checkedValues);
  };

  return (
    <div css={classes.upload({ error })} className="flexCenter">
      {files.length <= 0 || error ? (
        <Dragger
          {...props}
          style={classes.dragger}
          onChange={onChange}
          showUploadList={false}
          beforeUpload={beforeUpload}
        >
          <div css={classes.uploadInput} className="flexCenter">
            <div css={classes.content} className="flexCenter">
              <Typography className={classes.text}>{error || label}</Typography>
              <Button text="Accéder à vos photos" className={classes.button} />
            </div>
          </div>
        </Dragger>
      ) : (
        <CheckImages files={files} onCheck={onCheckImages} />
      )}
    </div>
  );
};

export default Upload;

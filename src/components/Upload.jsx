/** @jsxRuntime classic /
/* @jsx jsx */
import { jsx } from "@emotion/react";

import { useState } from "react";

import { Upload as AntdUpload, message } from "antd";

import Button from "./Button";
import Typography from "./Typography";
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
  upload: mq({
    marginTop: 90,
    marginBottom: 228,
    background: "#E7FDEF",
    border: "2px dashed #4752D8",
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

// const fileList = [
//   {
//     uid: '-1',
//     name: 'image.png',
//     status: 'done',
//     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//   },
//   {
//     uid: '-2',
//     name: 'image.png',
//     status: 'done',
//     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//   },
//   {
//     uid: '-3',
//     name: 'image.png',
//     status: 'done',
//     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//   },
//   {
//     uid: '-4',
//     name: 'image.png',
//     status: 'done',
//     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//   },
//   {
//     uid: '-xxx',
//     percent: 50,
//     name: 'image.png',
//     status: 'uploading',
//     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//   },
//   {
//     uid: '-5',
//     name: 'image.png',
//     status: 'error',
//   },
// ];

const label =
  "Accédez à votre bibliothèque locale de photo et sélectionnez les photos que vous souhaitez utiliser.";

const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 30;
  if (!isLt2M) {
    message.error("Image must smaller than 30MB!");
  }
  return isJpgOrPng && isLt2M;
};

const Upload = () => {
  const [files, setFiles] = useState([]);

  const onChange = async ({ fileList }) => {
    const { status } = fileList;
    if (status !== "uploading") {
      console.log("info file list", fileList);
      // console.log(info.file, info.fileList);
    }
    // if (status === "done") {
    setFiles(fileList);
    const filesArr = [];
    for (const [index, file] of fileList.entries()) {
      // getBase64(file.originFileObj, (url) =>
      //   setImagesUrl([...imagesUrl, url])
      // );
      const base64 = await getBase64(file.originFileObj);
      filesArr.push({
        id: index,
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

  console.log("files: ", files);

  return (
    <div css={classes.upload}>
      <Dragger
        {...props}
        style={classes.dragger}
        // listType="picture-card"
        onChange={onChange}
        showUploadList={false}
        // beforeUpload={beforeUpload}
        // fileList={files}
      >
        <div css={classes.uploadInput} className="flexCenter">
          <div css={classes.content} className="flexCenter">
            <Typography className={classes.text}>{label}</Typography>
            <Button text="Accéder à vos photos" className={classes.button} />
          </div>
        </div>
      </Dragger>

      {files.map((file, index) => (
        <img
          key={index}
          src={file.url}
          alt="avatar"
          style={{ width: "100%" }}
        />
      ))}
    </div>
  );
};

export default Upload;

export const imageUploadValidation = (file) => {
  let error;
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    error = "You can only upload JPG/PNG file!";
  }
  const isLt2M = file.size / 1024 / 1024 < 30;
  if (!isLt2M) {
    error = "Image must smaller than 30MB!";
  }
  return error;
};

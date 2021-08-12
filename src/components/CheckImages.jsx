/** @jsxRuntime classic /
/* @jsx jsx */
import { jsx } from "@emotion/react";

import { Checkbox } from "antd";
import PropTypes from "prop-types";

const classes = {
  imageContainer: {
    width: 177,
    height: 120,
    left: 449,
    top: 659,

    background: "#C4C4C4",
    borderRadius: 15,
    overflow: "hidden"
  },
  checkboxes: {
    "& .ant-checkbox-wrapper": {
      position: "relative",
      "& .ant-checkbox": {
        position: "absolute",
        right: 20,
        top: 90,
        display: "none"
      },
      "& .checkmark": {
        position: "absolute",
        top: 90,
        right: 20,
        height: 25,
        width: 25,
        borderRadius: "50%",
        backgroundColor: "#fff",
        visibility: "hidden"
      }
    },
    "& .ant-checkbox-wrapper-checked": {
      "& .checkmark": {
        visibility: "visible"
      }
    }
  },
  img: {
    width: "100%"
  }
};

const CheckImages = ({ files, onCheck }) => {
  const onChange = (checkedValues) => {
    onCheck(checkedValues);
  };

  return (
    <Checkbox.Group onChange={onChange}>
      <div
        className="flexRow alignCenter justifyCenter"
        css={classes.checkboxes}
      >
        {files.map((file, index) => (
          <Checkbox value={file} key={index} className="flexCenter">
            <div css={classes.imageContainer} className="flexCenter">
              {file.url && (
                <img src={file.url} alt="thumbnail" css={classes.img} />
              )}
              <span className="checkmark">
                <img alt="checked-icon" src="/checked.svg" css={classes.img} />
              </span>
            </div>
          </Checkbox>
        ))}
      </div>
    </Checkbox.Group>
  );
};

CheckImages.propTypes = {
  onCheck: PropTypes.func,
  files: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      file: PropTypes.any
    })
  )
};

export default CheckImages;

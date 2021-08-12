/** @jsxRuntime classic /
/* @jsx jsx */
import { jsx } from "@emotion/react";

import { Button as AntdButton } from "antd";
import PropTypes from "prop-types";

const classes = {
  button: (theme) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    padding: "25px 26px",
    cursor: "pointer",
    border: `1px solid ${theme.colors.primary}`,
    "&:hover": {
      border: `1px solid ${theme.colors.primary}`,
      opacity: 0.8
    },
    "&:disabled": {
      backgroundColor: "rgba(46, 46, 46, 0.16)",
      color: "#fff"
    }
  }),
  primary: (theme) => ({
    backgroundColor: theme.colors.primary,
    color: "#fff",
    "&:hover": {
      backgroundColor: theme.colors.primary
    }
  }),
  default: (theme) => ({
    backgroundColor: "#fff",
    "&:hover": {
      backgroundColor: "#fff",
      color: theme.colors.primary
    }
  }),
  text: (theme) => ({
    fontSize: 18,
    color: theme.colors.primary,
    fontStyle: "normal",
    fontWeight: 800
  }),
  fullWidth: {
    flex: 1,
    alignSelf: "stretch"
  }
};

const Button = ({
  text,
  htmlType = "button",
  className,
  disabled = false,
  onClick,
  type = "primary",
  fullWidth,
  ...buttonProps
}) => {
  return (
    <AntdButton
      css={[
        classes.button,
        classes.text,
        className,
        classes[type],
        fullWidth && classes.fullWidth
      ]}
      htmlType={htmlType === "submit" ? "submit" : "button"}
      disabled={disabled}
      onClick={onClick}
      type={type}
      {...buttonProps}
    >
      {text}
    </AntdButton>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  htmlType: PropTypes.oneOf(["submit", "button", "reset"]),
  className: PropTypes.any,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.oneOf([
    "primary",
    "ghost",
    "link",
    "dashed",
    "text",
    "default"
  ]),
  fullWidth: PropTypes.bool,
  buttonProps: PropTypes.any
};

export default Button;

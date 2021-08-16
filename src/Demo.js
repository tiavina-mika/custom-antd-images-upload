/** @jsxRuntime classic /
/* @jsx jsx */
import { cx } from "@emotion/css";
import { jsx } from "@emotion/react";

const classes = {
  box: (theme) => ({
    backgroundColor: theme.colors.primary
  }),
  text: {
    fontSize: 18,
    color: "#fff"
  },
  square: {
    width: 300,
    height: 300
  },
  rectangle: {
    width: 500,
    height: 300
  },
  override: {
    backgroundColor: "red"
  }
};

const Box = ({ children, type = "square", styles, className }) => {
  return (
    <div
      css={[classes.box, classes.text, styles, classes[type]]}
      className={cx("flexCenter", className)}
    >
      {children}
    </div>
  );
};

const Demo = () => {
  return (
    <Box styles={classes.override} className="justifyStart">
      Some text
    </Box>
  );
};

export default Demo;

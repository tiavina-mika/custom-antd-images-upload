/** @jsxRuntime classic /
/* @jsx jsx */
import { jsx } from "@emotion/react";
import { Typography as AntdTypography } from "antd";
import PropTypes from "prop-types";

const {
  Text: AntdText,
  Title: AntdTitle,
  Paragraph: AntdParagraph
} = AntdTypography;

const classes = {
  typography: (theme) => ({
    fontFamily: theme.fonts.primary,
    lineHeight: 1.38
  }),
  noGutter: {
    marginBottom: "0px !important"
  },
  title: {
    fontWeight: "800 !important"
  },
  h1: {
    fontSize: "36px !important"
  },
  h2: {
    fontSize: "30px !important"
  },
  h3: {
    fontSize: "26px !important"
  },
  h4: {
    fontSize: "24px !important"
  },
  text: {
    fontSize: "22px !important",
    fontWeight: "600 !important"
  },
  light: {
    color: "#fff !important"
  },
  dark: (theme) => ({
    color: theme.colors.dark + "!important"
  }),
  lightDark: (theme) => ({
    color: theme.colors.lightDark
  }),
  active: (theme) => ({
    color: theme.colors.primary
  })
};

const Typography = ({
  children,
  theme = "dark",
  gutterBottom = true,
  className,
  variant = "text",
  level,
  ...rest
}) => {
  let Component;
  const otherClasses = [];
  const otherProps = {};

  switch (variant) {
    case "title":
      Component = AntdTitle;
      otherClasses.push(...[classes[`h${level}`], classes.title, className]);
      otherProps.level = level;
      break;
    case "paragraph":
      Component = AntdParagraph;
      otherClasses.push(...[classes.text, className]);
      break;
    default:
      Component = AntdText;
      otherClasses.push(className || classes.text);
  }
  return (
    <Component
      css={[
        classes.typography,
        classes[theme],
        !gutterBottom && classes.noGutter,
        ...otherClasses
      ]}
      {...otherProps}
      {...rest}
    >
      {children}
    </Component>
  );
};

Typography.propTypes = {
  children: PropTypes.node.isRequired,
  level: PropTypes.oneOf([1, 2, 3, 4]),
  theme: PropTypes.oneOf(["dark", "light", "lightDark", "active"]),
  variant: PropTypes.oneOf(["text", "paragraph", "title"]),
  className: PropTypes.any,
  gutterBottom: PropTypes.bool
};

export default Typography;

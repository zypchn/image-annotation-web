import React from "react";

const BackgroundSplash = ({
  width,
  height,
  background,
  position,
  transform,
  zIndex = "0",
  opacity = "0.25",
  filterBlur = "60px",
  mixBlendMode = "multiply",
  borderRadius = "40% 60% 70% 30% / 40% 50% 60% 50%",
}) => {
  const splashStyle = {
    position: "fixed",
    borderRadius,
    opacity,
    filter: `blur(${filterBlur})`,
    zIndex,
    mixBlendMode,
    width,
    height,
    background,
    transform,
    ...position,
  };

  return <div style={splashStyle} />;
};

export default BackgroundSplash;

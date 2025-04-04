import React, { useState, useEffect } from "react";
import { CircularProgress, Box, Typography } from "@mui/material";

export default function TwoColorCircularProgressBar({
  foregroundColor = "#F9D32E",
  backgroundColor = "#2C4047",
  size = 100,
  speed = 1000,
  maxProgress = 75,
}) {
  const [progress, setProgress] = useState(0);
  const [backgroundProgress, setBackgroundProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < maxProgress ? prev + 5 : maxProgress));
      setBackgroundProgress((prev) => (prev < 100 ? prev + 5 : 100));
    }, speed);

    return () => clearInterval(interval);
  }, [speed, maxProgress]);

  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-flex",
        transform: "rotate(90deg)",
      }}
    >
      {/* Background Circular Progress (increases from 0 to 100) */}
      <CircularProgress
        variant="determinate"
        value={backgroundProgress}
        sx={{
          color: backgroundColor,
          width: size,
          height: size,
          position: "absolute",
        }}
      />
      <CircularProgress
        variant="determinate"
        value={progress}
        sx={{
          color: foregroundColor,
          width: size,
          height: size,
        }}
      />

      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%) rotate(-90deg)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          sx={{ color: "text.secondary" }}
        >
          {`${Math.round(progress)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

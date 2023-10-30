import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

const Loader = ({ duration }) => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    console.log("Loader mounted");
    setTimeout(() => {
      console.log("Loader unmounted");
      setVisible(false);
    }, 90000);

 
  }, [duration]);

  return visible ? (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
      }}
    >
      <CircularProgress color="primary" />
    </div>
  ) : null;
};

export default Loader;

import { useSnackbar } from "notistack";
import React from "react";

const useCustomSnackbar = () => {
  const { enqueueSnackbar } = useSnackbar();

  const showSnackbar = (msg, type) => {
    enqueueSnackbar(msg, {
      variant:
        type === "error" ? "error" : type === "success" ? "success" : type,
      anchorOrigin: { vertical: "top", horizontal: "right" },
      autoHideDuration: 2000,
    });
  };
  return showSnackbar;
};

export default useCustomSnackbar;

import PropTypes from "prop-types";
//form
// @mui
import { TextField } from "@mui/material";

export default function INPUT({ name, helperText, error, ...props }) {
  return (
    <TextField
      fullWidth
      error={!!error}
      helperText={error ? error.message : helperText}
      {...props}
    />
  );
}

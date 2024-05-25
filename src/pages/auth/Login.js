import { Link, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import AuthSocial from "../../sections/auth/AuthSocial";
import LoginForm from "../../sections/auth/LoginForm";

const Login = () => {
  const [loading, setloading] = useState(false);

  return (
    <>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant="h4">Login to WeChat</Typography>
        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2">New User?</Typography>
          <Link to="/auth/register" component={RouterLink} variant="subtitle2">
            Create an account
          </Link>
        </Stack>
        {/* Login form */}
        <LoginForm loading={loading} setloading={setloading} />
        {/* Auth Social */}
        <AuthSocial loading={loading} setloading={setloading} />
      </Stack>
    </>
  );
};

export default Login;

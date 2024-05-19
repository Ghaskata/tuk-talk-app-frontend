import { Divider, IconButton, Stack } from "@mui/material";
import { GithubLogo, GoogleLogo, TwitterLogo } from "phosphor-react";
import React from "react";
import useAxiosPrivate from "../../security/useAxiosPrivate";
import { useMutation } from "react-query";
import { AUTH_API_URL } from "../../security/axios";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { authentication } from "../../security/firebaseConfig";
import { useSnackbar } from "notistack";
import { authStore } from "../../contexts/authStore";
import { useNavigate } from "react-router-dom";
import { DEFAULT_PATH } from "../../config";

const AuthSocial = () => {
  const axiosPrivate = useAxiosPrivate();
  const { isAuthenticated, userData, setUserData } = authStore();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { mutateAsync: socialLogin } = useMutation(
    async (data) => {
      return await axiosPrivate.post(
        AUTH_API_URL.socialLogin,
        JSON.stringify(data)
      );
    },
    {
      onSuccess: (res) => {
        enqueueSnackbar("You are succesfully logged in.", {
          variant: "success",
          anchorOrigin: { vertical: "top", horizontal: "right" },
          autoHideDuration: 2000,
        });
        setUserData(res.data);
        navigate(DEFAULT_PATH);
      },
      onError: (error) => {
        enqueueSnackbar("error while socila login", {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "right" },
          autoHideDuration: 2000,
        });
      },
    }
  );

  //google login
  const googleProvider = new GoogleAuthProvider();
  googleProvider.getCustomParameters({ prompt: "select_account" });
  const handleGoogleLogin = async () => {
    try {
      console.log("social login");
      const res = await signInWithPopup(authentication, googleProvider);
      // console.log("google res user>>> ", res.user);

      const req = {
        email: res.user.email,
        userName: res.user.displayName,
        mobile: res.user.phoneNumber,
        image: res.user.photoURL,
        googleId: res.user.uid,
      };

      console.log("google res user.googleId>>> ", req);
      await socialLogin({ ...req });
    } catch (error) {
      console.log("error while google sign up");
    }
  };
  return (
    <div>
      <Divider
        sx={{
          my: 2.5,
          typography: "overline",
          color: "text.disabled",
          "&::before, ::after": {
            borderTopStyle: "dashed",
          },
        }}
      >
        OR
      </Divider>
      <Stack direction={"row"} justifyContent="center" spacing={2}>
        <IconButton onClick={handleGoogleLogin}>
          <GoogleLogo color="#DF3E30" />
        </IconButton>
        <IconButton color="inherit">
          <GithubLogo />
        </IconButton>
        <IconButton>
          <TwitterLogo color="#1C9CEA" />
        </IconButton>
      </Stack>
    </div>
  );
};

export default AuthSocial;

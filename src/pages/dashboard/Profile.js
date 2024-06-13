import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Avatar, Box, IconButton, Stack, Typography } from "@mui/material";
import { CaretLeft, Trash } from "phosphor-react";
import ProfileForm from "../../sections/settings/ProfileForm";
import Conversation from "../../components/Conversation";
import useAxiosPrivate from "../../security/useAxiosPrivate";
import { MY_PROFILE_API_URL, UPLOAD_IMAGE } from "../../security/axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Logo from "../../assets/Images/logo.ico";
import { deepPurple } from "@mui/material/colors";
import { useDropzone } from "react-dropzone";
import useCustomSnackbar from "../../components/Snackbar";

const Profile = () => {
  const [previewImg, setpreviewImg] = useState(null);
  const [img, setImg] = useState(null);

  const showSnackbar = useCustomSnackbar();

  const queryKey = useMemo(() => ["myProfile"], []);
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const { data, isFetching, error } = useQuery(
    queryKey,
    async () => {
      const response = await axiosPrivate.get(MY_PROFILE_API_URL.profile);
      return response.data;
    },
    {
      enabled: true,
      refetchOnWindowFocus: false,
    }
  );

  const handleUploadImg = async (file) => {
    setImg(file);
    // try {
    //   const formData = new FormData();
    //   formData.append("image", file);

    //   if (data?.user?.image && !data?.user?.image?.startsWith("http")) {
    //     formData.append("oldImage", data.user.image);
    //   }
    //   const response = await axiosPrivate.post(
    //     UPLOAD_IMAGE.replace(":type", "userProfile"),
    //     formData,
    //     {
    //       headers: {
    //         "Content-type": "multipart/form-data",
    //       },
    //     }
    //   );
    //   console.log("reponse >>> ", response);

    //   const uploadedImageUrl = await response.data.image_url[0];
    //   console.log("uploadedImageUrl>>>>>>>>>", uploadedImageUrl);
    //   setImageName(uploadedImageUrl);
    //   showSnackbar("Image uploaded successfully.", "success");
    //   queryClient.invalidateQueries(["myProfile"]);
    //   setImg(null);
    // } catch (error) {
    //   setImg(null);
    //   console.log("errro >>>", error);
    //   if (error?.message) {
    //     showSnackbar(error?.message, "error");
    //   } else {
    //     showSnackbar(
    //       "Failed to upload profile image. Please try again.",
    //       "error"
    //     );
    //   }
    // }
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    try {
      const file = acceptedFiles[0];
      if (file) {
        const imgUrl = URL.createObjectURL(file);
        setpreviewImg(imgUrl);
        setImg(file);
        await handleUploadImg(file);
      }
    } catch (error) {
      showSnackbar("Somthing gets wrong", "error");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    maxFiles: 1,
    onDrop,
  });

  const handleRemoveImg = async () => {
    try {
      if (previewImg) {
        setpreviewImg(null);
        setImg(null);
      }
    } catch (error) {
      showSnackbar(
        "Failed to delete profile image. Please try again.",
        "error"
      );
    }
  };

  const imagePath = data?.user?.image?.startsWith("http")
    ? data.user.image
    : data?.user?.image
    ? `${process.env.REACT_APP_USER_IMAGE_PATH}${data?.user?.image}`
    : Logo;

  console.log("imgepath ???", imagePath);

  if (isFetching) {
    return (
      <Stack
        sx={{
          width: "100%",
          backgroundColor: "rgba(0,0,0,0.50)",
        }}
        direction="row"
        alignItems={"center"}
      >
        <Stack sx={{ width: "100%" }} direction="column" alignItems={"center"}>
          <img style={{ height: 120, width: 120 }} src={Logo} alt="profile" />
        </Stack>
      </Stack>
    );
  }

  return (
    <>
      <Stack direction={"row"} sx={{ width: "100%" }}>
        <Box
          sx={{
            height: "100vh",
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? "#F8FAFF"
                : theme.palette.background,
            width: "100%",
            boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
          }}
        >
          <Stack p={4} spacing={5}>
            {/* Header */}
            <Stack direction={"row"} alignItems="center" spacing={3}>
              <IconButton>
                <CaretLeft size={24} color={"#4B4B4B"} />
              </IconButton>
              <Typography variant="h5">Profile</Typography>
            </Stack>

            {/* Profile Form */}
            <Stack
              sx={{
                position: "relative",
                marginTop: "0px",
                display: "flex",
                justifyContent: "end",
                alignItems: "end",
              }}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <Avatar
                alt={data.user.userName}
                // src={data?.user?.image ? imagePath : Logo}
                src={previewImg ?? imagePath}
                sx={{
                  width: 120,
                  height: 120,
                  bgcolor: deepPurple[400],
                  border: isDragActive ? "2px dashed orange" : "",
                }}
              />
              {/* {previewImg && ( */}
              <button
                style={{
                  position: "absolute",
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  backgroundColor: "white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 1,
                  top: 0,
                  right: 0,
                }}
                onClick={handleRemoveImg}
              >
                <Trash
                  color="#DF3E30"
                  style={{ width: "20px", height: "20px" }}
                />
              </button>
              {/* )} */}
            </Stack>
            <ProfileForm
              userData={data.user}
              img={img}
              setImg={setImg}
              setpreviewImg={setpreviewImg}
            />
          </Stack>
        </Box>
      </Stack>
    </>
  );
};

export default Profile;

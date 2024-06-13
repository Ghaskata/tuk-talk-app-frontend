import React, { useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import FormProvider from "../../components/hook-form/FormProvider";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Button, Stack } from "@mui/material";
import { RHFTextField } from "../../components/hook-form";
import { Form, FormikProvider, useFormik } from "formik";
import { Input } from "../../components/hook-form/Input";
import { useMutation, useQueryClient } from "react-query";
import useAxiosPrivate from "../../security/useAxiosPrivate";
import { MY_PROFILE_API_URL, UPLOAD_IMAGE } from "../../security/axios";
import { authStore } from "../../contexts/authStore";
import { useSnackbar } from "notistack";
import useCustomSnackbar from "../../components/Snackbar";

const ProfileForm = ({ userData, img, setImg, setpreviewImg }) => {
  const {} = authStore();
  const queryClient = useQueryClient();

  const { enqueueSnackbar } = useSnackbar();
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState(false);

  const showSnackbar = useCustomSnackbar();

  //upadte profile api
  const { mutateAsync: updateProfileApi } = useMutation(
    async (data) => {
      return await axiosPrivate.patch(
        MY_PROFILE_API_URL.updateProfile,
        JSON.stringify(data)
      );
    },
    {
      onSuccess: (res) => {
        setLoading(false);
        console.log("res>>>>", res);
        setpreviewImg(null);
        queryClient.invalidateQueries("myProfile");
        showSnackbar(res?.data?.message, "success");
      },
      onError: (err) => {
        setLoading(false);
        console.log("err>>>>", err);
        if (err?.response?.message) {
          showSnackbar(err?.response?.message, "error");
        }
      },
    }
  );

  //validation rules
  const profileSchema = Yup.object().shape({
    userName: Yup.string()
      .trim()
      .min(3)
      .required("This userName is visible to your contacts"),
    about: Yup.string().trim().min(1).required("About is required"),
    image: Yup.string(),
    // avatarUrl: Yup.string().required("Avatar is required").nullable(true),
  });

  const defaultValues = {
    userName: userData.userName,
    about: userData.about ?? "Hey There I'am Using Tuk Chat App ...",
    image: userData.image,
  };

  const formik = useFormik({
    initialValues: defaultValues,
    validationSchema: profileSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        setLoading(true);

        if (img) {
          const formData = new FormData();
          formData.append("image", img);
          if (userData.image && !userData.image?.startsWith("http")) {
            formData.append("oldImage", userData);
          }
          const response = await axiosPrivate.post(
            UPLOAD_IMAGE.replace(":type", "userProfile"),
            formData,
            {
              headers: {
                "Content-type": "multipart/form-data",
              },
            }
          );

          const uploadedImageUrl = await response?.data?.file_name[0];
          // showSnackbar("Image uploaded successfully.", "success");
          setImg(null);
          values.image = uploadedImageUrl;
        }

        await updateProfileApi(values);
      } catch (error) {
        setImg(null);
        console.log("errro >>>", error);
        if (error?.message) {
          showSnackbar(error?.message, "error");
        } else {
          showSnackbar("Somthing get's wrong. Please try again.", "error");
        }
      }
    },
  });

  const {
    handleSubmit,
    handleChange,
    setFieldError,
    getFieldProps,
    touched,
    errors,
    values,
    resetForm,
  } = formik;
  return (
    <FormikProvider value={formik}>
      <Form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack spacing={3}>
            {/* {!!errors.afterSubmit && <Alert severity='error'>{errors.afterSubmit.message}</Alert>} */}
            {errors.userName && (
              <Alert severity="error">{errors.userName}</Alert>
            )}
            {errors.about && <Alert severity="error">{errors.about}</Alert>}
            {/*         
        <RHFTextField name='name' label='Name' helperText={'This name is visible to your contacts'}/>
        <RHFTextField multiline rows={3} maxRow={5} name='about' label='About'/> */}
            <Input
              name="userName"
              label="User Name"
              {...getFieldProps("userName")}
              helpertext={touched.userName && errors.userName}
              error={touched.userName && errors.userName}
            />
            <Input
              multiline
              rows={3}
              maxRow={5}
              {...getFieldProps("about")}
              error={touched.about && errors.about}
              helpertext={touched.about && errors.about}
              name="about"
              label="about"
            />
          </Stack>
          <Stack direction={"row"} justifyContent="end">
            <Button
              color="primary"
              size="large"
              type="submit"
              variant="outlined"
            >
              {loading ? "loading..." : "Save"}
            </Button>
          </Stack>
        </Stack>
      </Form>
    </FormikProvider>
  );
};

export default ProfileForm;

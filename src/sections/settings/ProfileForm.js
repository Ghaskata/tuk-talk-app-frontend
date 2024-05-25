import React from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import FormProvider from "../../components/hook-form/FormProvider";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Button, Stack } from "@mui/material";
import { RHFTextField } from "../../components/hook-form";
import { Form, FormikProvider, useFormik } from "formik";
import { Input } from "../../components/hook-form/Input";

const ProfileForm = ({ userData }) => {
  //validation rules
  const profileSchema = Yup.object().shape({
    userName: Yup.string()
      .trim()
      .min(3)
      .required("This userName is visible to your contacts"),
    about: Yup.string().trim().min(1).required("About is required"),
    // avatarUrl: Yup.string().required("Avatar is required").nullable(true),
  });

  const defaultValues = {
    userName: userData.userName,
    about: userData.about ?? "Hey There I'am Using Tuk Chat App ..." ,
  };

  const formik = useFormik({
    initialValues: defaultValues,
    validationSchema: profileSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log("values >>>>>>>>> ", values);
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
              Save
            </Button>
          </Stack>
        </Stack>
      </Form>
    </FormikProvider>
  );
};

export default ProfileForm;

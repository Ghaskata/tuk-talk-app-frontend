import React, { useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import FormProvider from "../../components/hook-form/FormProvider";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Alert,
  Button,
  IconButton,
  InputAdornment,
  Link,
  Stack,
} from "@mui/material";
import { RHFTextField } from "../../components/hook-form";
import { Eye, EyeSlash } from "phosphor-react";
import { Link as RouterLink } from "react-router-dom";
import { Form, FormikProvider, useFormik } from "formik";
import INPUT from "../../components/hook-form/INPUT";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  //validation rules
  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
    password: Yup.string().required("Password is required"),
  });

  const defaultValues = {
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues: defaultValues,
    validationSchema: loginSchema,
    onSubmit: (values, { resetForm }) => {
      console.log("values >>>>>>>>> ", values);
    },
  });

  const {
    handleSubmit,
    getFieldProps,
    setFieldError,
    touched,
    errors,
    values,
    resetForm,
  } = formik;
  return (
    <FormikProvider value={formik}>
      <Form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {/* {!!errors.afterSubmit && (
          <Alert severity="error">{errors.afterSubmit.message}</Alert>
        )} */}

          <INPUT
            name="email"
            label="Email address"
            {...getFieldProps("email")}
            value={values.email}
            onChange={han}
            helpertext={touched.email && errors.email}
            error={!!(touched.email && errors.email)}
          />
          <INPUT
            {...getFieldProps("password")}
            error={touched.password && errors.password}
            helpertext={touched.password && errors.password}
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            // InputProps={{
            //   endAdornment: (
            //     <InputAdornment>
            //       <IconButton
            //         onClick={() => {
            //           setShowPassword(!showPassword);
            //         }}
            //       >
            //         {showPassword ? <Eye /> : <EyeSlash />}
            //       </IconButton>
            //     </InputAdornment>
            //   ),
            // }}
          />
        </Stack>
        <Stack alignItems={"flex-end"} sx={{ my: 2 }}>
          <Link
            component={RouterLink}
            to="/auth/reset-password"
            variant="body2"
            color="inherit"
            underline="always"
          >
            Forgot Password?
          </Link>
        </Stack>
        <Button
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          sx={{
            bgcolor: "text.primary",
            color: (theme) =>
              theme.palette.mode === "light" ? "common.white" : "grey.800",
            "&:hover": {
              bgcolor: "text.primary",
              color: (theme) =>
                theme.palette.mode === "light" ? "common.white" : "grey.800",
            },
          }}
        >
          Login
        </Button>
      </Form>
    </FormikProvider>
  );

  // const methods = useForm({
  //   resolver: yupResolver(loginSchema),
  //   defaultValues
  // });

  // const {reset, setError, handleSubmit, formState:{errors, isSubmitting, isSubmitSuccessful}}
  //  = methods;

  //  const onSubmit = async (data) =>{
  //       try {
  //           //submit data to backend
  //       } catch (error) {
  //           console.log(error);
  //           reset();
  //           setError('afterSubmit',{
  //               ...error,
  //               message: error.message
  //           })
  //       }
  //  }

  // return (
  //   <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
  //       <Stack spacing={3}>
  //           {!!errors.afterSubmit && <Alert severity='error'>{errors.afterSubmit.message}</Alert>}

  //       <RHFTextField name='email' label='Email address'/>
  //       <RHFTextField name='password' label='Password' type={showPassword ? 'text' : 'password'}
  //       InputProps={{endAdornment:(
  //           <InputAdornment>
  //           <IconButton onClick={()=>{
  //               setShowPassword(!showPassword);
  //           }}>
  //               {showPassword ? <Eye/>: <EyeSlash/>}
  //           </IconButton>
  //           </InputAdornment>
  //       )}}/>
  //       </Stack>
  //       <Stack alignItems={'flex-end'} sx={{my:2}}>
  //           <Link component={RouterLink} to='/auth/reset-password'
  //            variant='body2' color='inherit' underline='always'>Forgot Password?</Link>
  //       </Stack>
  //       <Button fullWidth color='inherit' size='large' type='submit' variant='contained'
  //       sx={{bgcolor:'text.primary', color:(theme)=> theme.palette.mode === 'light' ?
  //        'common.white':'grey.800',
  //        '&:hover':{
  //           bgcolor:'text.primary',
  //           color:(theme)=> theme.palette.mode === 'light' ? 'common.white':'grey.800',
  //        }}}>Login</Button>
  //   </FormProvider>
  // )
};

export default LoginForm;
